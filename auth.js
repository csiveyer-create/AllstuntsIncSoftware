(() => {
  const root = document.getElementById('app');
  const cfg = window.ALLSTUNTS_FIREBASE_CONFIG || {};
  const configured = cfg.apiKey && !cfg.apiKey.startsWith('PASTE_');
  let mode = 'login';

  function escapeHtml(value='') {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderAuth(message='', bad=false) {
    root.innerHTML = `<main class="auth-page">
      <section class="auth-card">
        <img class="auth-logo" src="logo.svg" alt="AllStunts Inc">
        <div class="auth-kicker">Secure rigging inventory</div>
        <h1>${mode === 'login' ? 'Sign in' : 'Create account'}</h1>
        <p class="auth-intro">Authorised crew accounts access the same shared inventory register.</p>
        ${!configured ? `<div class="auth-message bad"><strong>Firebase setup required.</strong><br>Follow SETUP-GITHUB.md, then edit <code>firebase-config.js</code>.</div>` : ''}
        ${message ? `<div class="auth-message ${bad ? 'bad' : ''}">${escapeHtml(message)}</div>` : ''}
        <form id="authForm" class="auth-form">
          <label>Email address<input id="authEmail" type="email" autocomplete="email" required></label>
          <label>Password<input id="authPassword" type="password" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}" minlength="6" required></label>
          ${mode === 'register' ? `<label>Confirm password<input id="authConfirm" type="password" autocomplete="new-password" minlength="6" required></label>` : ''}
          <button class="btn primary auth-submit" type="submit" ${!configured ? 'disabled' : ''}>${mode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
        <button class="auth-switch" id="authSwitch">${mode === 'login' ? 'Create a new crew account' : 'Already have an account? Sign in'}</button>
        ${mode === 'login' ? `<button class="auth-switch subtle" id="forgotPassword">Forgot password?</button>` : ''}
      </section>
    </main>`;

    document.getElementById('authSwitch').onclick = () => { mode = mode === 'login' ? 'register' : 'login'; renderAuth(); };
    document.getElementById('authForm').onsubmit = handleSubmit;
    const forgot = document.getElementById('forgotPassword');
    if (forgot) forgot.onclick = resetPassword;
  }

  function friendlyError(error) {
    const map = {
      'auth/invalid-credential':'Incorrect email address or password.',
      'auth/email-already-in-use':'An account already exists for that email address.',
      'auth/weak-password':'Use a password with at least six characters.',
      'auth/invalid-email':'Enter a valid email address.',
      'auth/too-many-requests':'Too many attempts. Wait a moment and try again.'
    };
    return map[error.code] || error.message || 'Unable to complete that request.';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    try {
      if (mode === 'register') {
        const confirm = document.getElementById('authConfirm').value;
        if (password !== confirm) return renderAuth('The passwords do not match.', true);
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await result.user.sendEmailVerification();
        await firebase.auth().signOut();
        mode = 'login';
        renderAuth('Account created. Check your email, verify the account, then sign in.');
      } else {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (!result.user.emailVerified) {
          await result.user.sendEmailVerification();
          await firebase.auth().signOut();
          renderAuth('Verify your email first. A new verification email has been sent.', true);
        }
      }
    } catch (error) {
      renderAuth(friendlyError(error), true);
    }
  }

  async function resetPassword() {
    const email = document.getElementById('authEmail').value.trim();
    if (!email) return renderAuth('Enter your email address first.', true);
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      renderAuth('Password reset email sent.');
    } catch (error) {
      renderAuth(friendlyError(error), true);
    }
  }

  window.logoutUser = async () => {
    if (configured) await firebase.auth().signOut();
  };

  if (!configured) {
    renderAuth();
    return;
  }

  try {
    firebase.initializeApp(cfg);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged(async user => {
      if (user && user.emailVerified) {
        window.currentUserEmail = user.email || '';
        window.startInventoryApp();
      } else {
        renderAuth();
      }
    });
  } catch (error) {
    renderAuth('Firebase could not start: ' + friendlyError(error), true);
  }
})();

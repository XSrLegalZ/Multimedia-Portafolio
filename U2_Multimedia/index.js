var tabLoginBtn = document.getElementById('tabLoginBtn');
var tabRegisterBtn = document.getElementById('tabRegisterBtn');
var panelLogin = document.getElementById('panelLogin');
var panelRegister = document.getElementById('panelRegister');
var indicator = document.getElementById('tabIndicator');

function showLogin() {
  tabLoginBtn.setAttribute('aria-selected', 'true');
  tabRegisterBtn.setAttribute('aria-selected', 'false');
  indicator.style.transform = 'translateX(0%)';
  panelRegister.hidden = true;
  panelLogin.hidden = false;
  document.getElementById('loginUser').focus({ preventScroll: true });
}

function showRegister() {
  tabRegisterBtn.setAttribute('aria-selected', 'true');
  tabLoginBtn.setAttribute('aria-selected', 'false');
  indicator.style.transform = 'translateX(100%)';
  panelLogin.hidden = true;
  panelRegister.hidden = false;
  document.getElementById('regUser').focus({ preventScroll: true });
}

tabLoginBtn.addEventListener('click', showLogin);
tabRegisterBtn.addEventListener('click', showRegister);
document.querySelectorAll('[data-switch="register"]').forEach(function (el) { el.addEventListener('click', showRegister); });
document.querySelectorAll('[data-switch="login"]').forEach(function (el) { el.addEventListener('click', showLogin); });

/* Mostrar / ocultar contraseña */
document.querySelectorAll('.pw-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var input = document.getElementById(btn.dataset.toggleFor);
    var isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(isHidden));
    btn.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
    btn.querySelector('.eye-open').style.display = isHidden ? 'none' : '';
    btn.querySelector('.eye-closed').style.display = isHidden ? '' : 'none';
  });
});

/* ===== Validación de coincidencia: contraseña / confirmar contraseña,
   correo / confirmar correo, en el formulario de registro. ===== */
function wireMatchValidation(fieldId, matchId, confirmFieldWrapperSelector, errorId) {
  var original = document.getElementById(fieldId);
  var confirm = document.getElementById(matchId);
  var wrapper = confirm.closest(confirmFieldWrapperSelector);
  var error = document.getElementById(errorId);

  function check() {
    if (!confirm.value) {
      wrapper.classList.remove('field--invalid');
      error.hidden = true;
      return true;
    }
    var matches = original.value === confirm.value;
    wrapper.classList.toggle('field--invalid', !matches);
    error.hidden = matches;
    return matches;
  }

  confirm.addEventListener('input', check);
  original.addEventListener('input', function () { if (confirm.value) check(); });
  return check;
}

var checkPassMatch = wireMatchValidation('regPass', 'regPassConfirm', '.field', 'errPassConfirm');
var checkEmailMatch = wireMatchValidation('regEmail', 'regEmailConfirm', '.field', 'errEmailConfirm');

document.getElementById('formRegister').addEventListener('submit', function (e) {
  var passOk = checkPassMatch();
  var emailOk = checkEmailMatch();
  if (!passOk || !emailOk) {
    e.preventDefault();
    return false;
  }
  // Aquí iría el envío real del formulario de registro.
});

document.getElementById('formLogin').addEventListener('submit', function (e) {
  // Aquí iría el envío real del formulario de inicio de sesión.
});
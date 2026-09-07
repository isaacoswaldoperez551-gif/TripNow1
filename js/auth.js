/* ---------- Sesión de cliente (demo sin backend) ----------
   Reutiliza el mismo "perfil" que ya guardaba el formulario de inicio
   (tripnow_profile) como sesión de cliente, y usa registerClient() de
   data.js para que también aparezca en admin.html → Clientes.
   No hay contraseña real: es una demo de identificación por correo,
   igual de simulada que el login de administración. */

const AUTH_PROFILE_KEY = "tripnow_profile";

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_PROFILE_KEY) || "null");
  } catch {
    return null;
  }
}

function buildAuthModal() {
  if (document.getElementById("authModalOverlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "authModalOverlay";
  overlay.style.display = "none";
  overlay.innerHTML = `
    <div class="admin-login-card" id="authModalCard">
      <button type="button" class="modal-close" id="authCloseBtn" aria-label="Cerrar">&times;</button>
      <h1 id="authModalTitle" data-i18n="auth_title">Iniciar sesión</h1>
      <p id="authModalSubtitle" data-i18n="auth_subtitle">Ingresa tus datos para identificarte en Trip Now.</p>
      <form id="authForm">
        <input required id="authNombre" data-i18n-placeholder="ph_name" placeholder="Nombre completo" />
        <input required type="email" id="authEmail" data-i18n-placeholder="ph_email" placeholder="Correo electrónico" />
        <input id="authTelefono" data-i18n-placeholder="ph_phone" placeholder="Teléfono" />
        <button type="submit" class="btn btn-primary" data-i18n="auth_submit">Ingresar</button>
      </form>
      <p class="admin-hint" data-i18n="auth_hint">
        Demo: no se requiere contraseña, solo tu correo para identificarte como cliente.
      </p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLoginModal();
  });
  document.getElementById("authCloseBtn").addEventListener("click", closeLoginModal);
  document.getElementById("authForm").addEventListener("submit", handleAuthSubmit);
  document.getElementById("authEmail").addEventListener("blur", fillFromSavedClient);

  if (typeof applyTranslations === "function") applyTranslations();
}

/* Al escribir un correo que ya existe (cliente registrado previamente,
   por ejemplo antes de cerrar sesión), se recuperan sus datos guardados
   -nombre y teléfono- en vez de pedírselos de nuevo. */
function fillFromSavedClient() {
  const emailInput = document.getElementById("authEmail");
  const email = emailInput.value.trim().toLowerCase();
  if (!email || typeof getClients !== "function") return;

  const existing = getClients().find((c) => c.email.trim().toLowerCase() === email);
  if (!existing) return;

  const nombreInput = document.getElementById("authNombre");
  const telefonoInput = document.getElementById("authTelefono");
  if (!nombreInput.value.trim()) nombreInput.value = existing.nombre || "";
  if (!telefonoInput.value.trim()) telefonoInput.value = existing.telefono || "";
}

function openLoginModal(e) {
  if (e) e.preventDefault();
  buildAuthModal();

  const session = getSession();
  if (session) {
    document.getElementById("authNombre").value = session.nombre || "";
    document.getElementById("authEmail").value = session.email || "";
    document.getElementById("authTelefono").value = session.telefono || "";
  }

  document.getElementById("authModalOverlay").style.display = "flex";
}

function closeLoginModal() {
  const overlay = document.getElementById("authModalOverlay");
  if (overlay) overlay.style.display = "none";
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const profile = {
    nombre: document.getElementById("authNombre").value.trim(),
    email: document.getElementById("authEmail").value.trim(),
    telefono: document.getElementById("authTelefono").value.trim(),
  };
  localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));

  // Registra al cliente de verdad: aparece en admin.html → Clientes
  if (typeof registerClient === "function") registerClient(profile);

  closeLoginModal();
  renderAuthNav();
  if (typeof window.onSessionChange === "function") window.onSessionChange(profile);
}

function logout() {
  localStorage.removeItem(AUTH_PROFILE_KEY);
  renderAuthNav();
  if (typeof window.onSessionChange === "function") window.onSessionChange(null);
}

function renderAuthNav() {
  const nav = document.getElementById("navAccount");
  if (!nav) return;

  const session = getSession();
  const lang = typeof getLang === "function" ? getLang() : "es";
  const loginLabel = typeof t === "function" ? t("login_btn") : "Iniciar sesión";
  const logoutLabel = typeof t === "function" ? t("logout_btn") : "Salir";

  if (session && session.nombre) {
    const firstName = session.nombre.split(" ")[0];
    nav.innerHTML = `
      <a href="#" class="btn btn-outline btn-small" id="loginNavBtn">${firstName}</a>
      <button type="button" class="logout-link" onclick="logout()">${logoutLabel}</button>
    `;
    document.getElementById("loginNavBtn").addEventListener("click", openLoginModal);
  } else {
    nav.innerHTML = `<a href="#" class="btn btn-primary btn-small" id="loginNavBtn">${loginLabel}</a>`;
    document.getElementById("loginNavBtn").addEventListener("click", openLoginModal);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildAuthModal();
  renderAuthNav();
});

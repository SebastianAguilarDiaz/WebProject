import { setToken, clearToken, getToken } from "./token-store.js";

const loginForm = document.getElementById("jwt-login-form");
const registerForm = document.getElementById("jwt-register-form");
const loginMsg = document.getElementById("jwt-login-msg");
const regMsg = document.getElementById("jwt-register-msg");

// If already logged in with JWT, just go home
if (getToken()) {
  // keep it simple
}

// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (loginMsg) loginMsg.textContent = "";

    const formData = new FormData(loginForm);
    const body = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const res = await fetch("/api/auth-jwt/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (loginMsg) loginMsg.textContent = data.error || "Login failed";
        return;
      }

      if (data.token) {
        setToken(data.token);
        window.location.href = "/";
      }
    } catch (err) {
      if (loginMsg) loginMsg.textContent = "Something went wrong";
    }
  });
}

// Register
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (regMsg) regMsg.textContent = "";

    const formData = new FormData(registerForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      if (regMsg) regMsg.textContent = "Passwords do not match";
      return;
    }

    const body = { name, email, password };

    try {
      const res = await fetch("/api/auth-jwt/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (regMsg) regMsg.textContent = data.error || "Register failed";
        return;
      }

      if (data.token) {
        setToken(data.token);
        window.location.href = "/";
      }
    } catch (err) {
      if (regMsg) regMsg.textContent = "Something went wrong";
    }
  });
}

// Logout helper if needed
window.jwtLogout = () => {
  clearToken();
  window.location.href = "/";
};

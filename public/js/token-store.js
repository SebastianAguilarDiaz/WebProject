// Simple token storage for JWT + localStorage
const TOKEN_KEY = "scholarfind_jwt_token";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (err) {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (!token) return;
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    // ignore storage errors
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    // ignore
  }
};

export const getAuthHeader = () => {
  const token = getToken();
  if (!token) return {};
  return { Authorization: "Bearer " + token };
};

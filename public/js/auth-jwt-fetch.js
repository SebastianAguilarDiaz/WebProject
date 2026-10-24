import { getToken, clearToken } from "./token-store.js";

// Wrapper for fetch with JWT
export const authJwtFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = Object.assign({}, options.headers || {});

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const res = await fetch(url, Object.assign({}, options, { headers }));

  // If token is invalid/expired just clear it
  if (res.status === 401) {
    clearToken();
  }

  return res;
};

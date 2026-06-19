const DEFAULT_BACKEND_URL = "https://qfs-backend-ghuv.onrender.com";

export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL
).replace(/\/+$/, "");

export const backendUrl = (path = "") => {
  if (!path) return BACKEND_URL;

  return `${BACKEND_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const apiUrl = (path) => backendUrl(path);

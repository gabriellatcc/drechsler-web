import axios, { type AxiosRequestConfig } from "axios";

export const AUTH_TOKEN_STORAGE_KEY = "drechsler-auth-token";
export const AUTH_EVENT_NAME = "drechsler-auth";

export class ApiEmptyResponseError extends Error {
  constructor(message = "Resposta vazia da API") {
    super(message);
    this.name = "ApiEmptyResponseError";
  }
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function getAuthAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ??
    localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  );
}

export function setAuthAccessToken(token: string, rememberMe = false): void {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function clearAuthAccessToken(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function apiClient<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.request<T>({
    ...config,
    ...options,
  });

  if (response.data === undefined || response.data === null) {
    throw new ApiEmptyResponseError();
  }

  return response.data;
}

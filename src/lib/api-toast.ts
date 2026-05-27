import axios from "axios";
import { toast } from "sonner";

type ApiFieldErrors = Record<string, string[] | string>;

type ApiErrorBody = {
  message?: string;
  error?: string;
  errors?: ApiFieldErrors;
};

function firstFieldError(errors: ApiFieldErrors): string | undefined {
  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value[0]) return value[0];
    if (typeof value === "string" && value) return value;
  }
  return undefined;
}

export function getApiErrorMessage(error: unknown, fallback = "Ocorreu um erro inesperado."): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as ApiErrorBody | undefined;

    if (data?.message) return data.message;
    if (data?.error) return data.error;

    if (data?.errors) {
      const fieldError = firstFieldError(data.errors);
      if (fieldError) return fieldError;
    }

    if (status === 401) return "Sessão expirada. Faça login novamente.";
    if (status === 403 || status === 404) return "Recurso não encontrado.";
    if (status === 422) return "Verifique os dados enviados.";
    if (status === 500) return "Erro interno do servidor. Tente novamente mais tarde.";

    if (error.message) return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function toastApiError(error: unknown, title = "Erro"): void {
  toast.error(title, {
    description: getApiErrorMessage(error),
  });
}

export function toastApiSuccess(
  data: { message?: string } | undefined,
  fallback = "Operação realizada com sucesso.",
): void {
  toast.success(data?.message ?? fallback);
}

/** @deprecated Use toastApiSuccess */
export const toastApiSuccessFromBody = toastApiSuccess;

export { toast };

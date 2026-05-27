import axios from "axios";
import { toast } from "sonner";

type ApiFieldErrors = Record<string, string[] | string>;

const DEFAULT_API_SUCCESS_MESSAGE = "Formulário enviado com sucesso";

type ApiErrorBody = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: ApiFieldErrors;
  data?: {
    message?: string;
    statusCode?: number;
  } | null;
};

function firstFieldError(errors: ApiFieldErrors): string | undefined {
  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value[0]) return value[0];
    if (typeof value === "string" && value) return value;
  }
  return undefined;
}

function nestedApiMessage(data: ApiErrorBody): string | undefined {
  if (typeof data.data === "object" && data.data !== null && data.data.message) {
    return data.data.message;
  }

  return undefined;
}

export function getApiErrorMessage(error: unknown, fallback = "Ocorreu um erro inesperado."): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as ApiErrorBody | undefined;

    if (data?.errors) {
      const fieldError = firstFieldError(data.errors);
      if (fieldError) return fieldError;
    }

    if (
      data?.message &&
      data.message !== DEFAULT_API_SUCCESS_MESSAGE &&
      data.success !== true
    ) {
      return data.message;
    }

    const wrappedMessage = data ? nestedApiMessage(data) : undefined;
    if (wrappedMessage) return wrappedMessage;

    if (data?.error) return data.error;

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

export function toastApiError(
  error: unknown,
  title = "Erro",
  fallback?: string,
): void {
  toast.error(title, {
    description: getApiErrorMessage(error, fallback),
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

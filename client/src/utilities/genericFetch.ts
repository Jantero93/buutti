const Headers = {
  "Content-Type": "Content-Type",
} as const;

export const get = <T>(url: string): Promise<T> => apiCall(url, "GET");

export const post = <T>(url: string, payload?: unknown): Promise<T> =>
  apiCall(url, "POST", payload);

export const put = <T>(url: string, payload: unknown): Promise<T> =>
  apiCall(url, "PUT", payload);

export const del = <T>(url: string): Promise<T> => apiCall(url, "DELETE");

export type ErrorApiResponse = { message: string };

/**
 * Generic api call. Expects payload and answer to be application/json
 */
const apiCall = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  const config: RequestInit = {
    method,
    headers: {
      [Headers["Content-Type"]]: "application/json",
    },
    signal: controller.signal,
  };

  if (["POST", "PUT"].includes(method) && data !== undefined) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errResMsg = (await response.json()) as unknown as ErrorApiResponse;
      console.error("API call failed, error:", errResMsg);
    }

    const contentType = response.headers.get(Headers["Content-Type"]);

    if (contentType?.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    if (response.status === 204 || response.status === 205) {
      return {} as T;
    }

    return {} as T;
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      console.warn("API call failed, reason:", e);
    }

    if ((e as Error).name === "AbortError") {
      console.warn("API call aborted due to timeout");
    }

    console.error("Exception in apiCall method", (e as Error).message);

    throw e;
  }
};

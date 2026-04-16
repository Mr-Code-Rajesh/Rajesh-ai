/**
 * Simple Fetch wrapper for API calls.
 * Handles JSON parsing and error management.
 */
export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T; error: string | null }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return { data: null as T, error: json.error || "Something went wrong" };
    }

    return { data: json.data, error: null };
  } catch (err) {
    return { data: null as T, error: (err as Error).message };
  }
}

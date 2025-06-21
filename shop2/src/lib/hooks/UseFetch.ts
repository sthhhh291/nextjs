import { useState, useEffect } from "react";

// Generic useFetch hook
function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setData(null);
    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.statusText);
        const json = (await res.json()) as T;
        setData(json);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

export default useFetch;

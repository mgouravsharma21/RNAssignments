import React from "react";
import UseFetchResult from "../type/UseFetchResult.type";

function useFetch<T = unknown>(url: string): UseFetchResult<T> {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (isMounted) {
          setData(json);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { loading, data, error };
}

export default useFetch;
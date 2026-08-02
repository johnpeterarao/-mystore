import { useEffect, useState } from "react";


export default function useFetch( fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let cancelled = false;

    async function execute() {
      try {
        setLoading(true);
        const result = await fetchFunction();

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }

    }

    execute();

    return () => {
      cancelled = true;
    };

  }, dependencies);


  return {
    data,
    loading,
    error
  };
}
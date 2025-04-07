// app/hooks/useFetch.ts
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface FetchOptions extends RequestInit {
  skip?: boolean;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => Promise<void>;
  setData: (data: T) => void;
}

export default function useFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): UseFetchReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);
  const optionsRef = useRef(options);

  // Update the ref when options change
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchData = useCallback(async () => {
    if (optionsRef.current.skip) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch(url, {
        ...optionsRef.current,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = (await response.json()) as T;
      setState({ data: json, loading: false, error: null });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error('An unknown error occurred'),
        });
      }
    }
  }, [url]); // Only url in dependencies

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  return { 
    ...state, 
    refetch: fetchData, 
    setData 
  };
}
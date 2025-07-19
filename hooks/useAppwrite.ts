"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface UseAppwriteOptions<T, P extends Record<string, string | number | boolean | undefined>> {
    fn: (params: P) => Promise<T>;
    params?: P;
    skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: (newParams?: P) => Promise<void>;
}

export const useAppwrite = <T, P extends Record<string, string | number | boolean | undefined>>({
    fn,
    params = {} as P,
    skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    const lastParamsRef = useRef<P>(params);

    const fetchData = useCallback(
        async (fetchParams?: P) => {
            setLoading(true);
            setError(null);

            try {
                const usedParams = fetchParams ?? lastParamsRef.current;
                lastParamsRef.current = usedParams;

                const result = await fn(usedParams);
                setData(result);
            } catch (err: unknown) {
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
                console.error(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    useEffect(() => {
        if (!skip) {
            fetchData(params);
        }
    }, []);

    const refetch = async (newParams?: P) => {
        await fetchData(newParams);
    };

    return { data, loading, error, refetch };
};

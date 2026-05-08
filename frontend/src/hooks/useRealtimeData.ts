/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SOCKET_EVENTS, useSocket } from "@/hooks/useSocket";

interface UseRealtimeDataOptions<T> {
  fetchFn: () => Promise<T>;
  initialData?: T;
  refetchOnEvents?: string[];
  pollingInterval?: number;
}

export function useRealtimeData<T>({
  fetchFn,
  initialData,
  refetchOnEvents = [],
  pollingInterval = 0,
}: UseRealtimeDataOptions<T>) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { on } = useSocket(null);
  const isMounted = useRef(true);

  // ✅ fetchFn  ref — stale closure 
  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  // ✅ refetch এর dependency  — ref  latest fetchFn 
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFnRef.current();
      if (isMounted.current) {
        setData(result);
        setError(null);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err?.message ?? "Something went wrong");
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  // ✅ fetchFn (searchParams/filter/page change) → refetch
  useEffect(() => {
    isMounted.current = true;
    refetch();
    return () => {
      isMounted.current = false;
    };
  }, [fetchFn, refetch]); // fetchFn reference change trigger

  // ✅ Socket events → refetch
  useEffect(() => {
    if (refetchOnEvents.length === 0) return;
    const cleanups = refetchOnEvents.map((event) => on(event, () => refetch()));
    return () => cleanups.forEach((c) => c());
  }, [refetchOnEvents, on, refetch]);

  // Optional polling fallback
  useEffect(() => {
    if (!pollingInterval || pollingInterval <= 0) return;
    const interval = setInterval(refetch, pollingInterval);
    return () => clearInterval(interval);
  }, [pollingInterval, refetch]);

  return { data, loading, error, refetch };
}

// ─── Wrapper hooks ─────────────────────────────────────────────

export function useRealtimeTransactions<T>(options: {
  fetchFn: () => Promise<T>;
  initialData?: T;
}) {
  return useRealtimeData({
    fetchFn: options.fetchFn,
    initialData: options.initialData,
    refetchOnEvents: [
      SOCKET_EVENTS.NEW_TRANSACTION,
      SOCKET_EVENTS.TRANSACTION_SUCCESS,
    ],
  });
}

export function useRealtimeWallet<T>(options: {
  fetchFn: () => Promise<T>;
  initialData?: T;
}) {
  return useRealtimeData({
    fetchFn: options.fetchFn,
    initialData: options.initialData,
    refetchOnEvents: [
      SOCKET_EVENTS.BALANCE_UPDATED,
      SOCKET_EVENTS.BALANCE_REQUEST_STATUS,
      SOCKET_EVENTS.NEW_TRANSACTION,
      SOCKET_EVENTS.TRANSACTION_SUCCESS,
    ],
  });
}

export function useRealtimeApplications<T>(options: {
  fetchFn: () => Promise<T>;
  initialData?: T;
}) {
  return useRealtimeData({
    fetchFn: options.fetchFn,
    initialData: options.initialData,
    refetchOnEvents: [SOCKET_EVENTS.NEW_AGENT_APPLICATION],
  });
}

export function useRealtimeBalanceRequests<T>(options: {
  fetchFn: () => Promise<T>;
  initialData?: T;
}) {
  return useRealtimeData({
    fetchFn: options.fetchFn,
    initialData: options.initialData,
    refetchOnEvents: [SOCKET_EVENTS.NEW_BALANCE_REQUEST],
  });
}

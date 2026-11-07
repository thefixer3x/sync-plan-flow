/**
 * useIDBQuery – lightweight reactive hook for IndexedDB via idb.
 * Subscribes to the db change notifier and re-queries on changes.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { subscribe } from "@/store/db";

export function useIDBQuery<T>(queryFn: () => Promise<T>, fallback: T): T {
  const [data, setData] = useState<T>(fallback);
  const queryRef = useRef(queryFn);
  queryRef.current = queryFn;

  const run = useCallback(async () => {
    try {
      const result = await queryRef.current();
      setData(result);
    } catch (e) {
      console.error("useIDBQuery error:", e);
    }
  }, []);

  useEffect(() => {
    run();
    const unsub = subscribe(run);
    return unsub;
  }, [run]);

  return data;
}

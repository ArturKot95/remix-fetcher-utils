import type { ReactNode } from "react";

import { useCallback, useMemo, useRef, useState } from "react";

import type { UseQueryParams } from "../useQuery/useQuery.types";
import type { CacheContextType, CacheValueType } from "./cacheContext.types";

import { LRUCache } from "./LRUCache";
import { cacheContext } from "./cacheContext";

export const AppCacheProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const appCache = useRef<LRUCache<string, CacheValueType>>(
    new LRUCache(1000)
  ).current;
  const [globalVars, setGlobalVars] = useState<{ [variable: string]: any }>({});
  const lastParamsMap = useRef(new Map<string, UseQueryParams>()).current;
  const [revalidate, setRevalidate] = useState(false);

  const runRevalidate = useCallback(() => {
    setRevalidate((prev) => !prev);
  }, []);

  const get = useCallback((key: string) => {
    return appCache.get(key);
  }, []);

  /** Save params for last query with particular route. */
  const getLastParams = useCallback(
    (route: string): UseQueryParams | undefined => {
      return lastParamsMap.get(route);
    },
    []
  );

  const set = useCallback((key: string, value: CacheValueType) => {
    appCache.set(key, value);
    runRevalidate();
  }, []);

  const setLastParams = useCallback(
    (route: string, params: UseQueryParams): void => {
      lastParamsMap.set(route, params);
    },
    []
  );

  const remove = useCallback((key: string) => {
    appCache.remove(key);
    runRevalidate();
  }, []);

  const has = useCallback((key: string) => appCache.has(key), []);

  const clear = useCallback(() => {
    appCache.clear();
    runRevalidate();
  }, []);

  const size = useMemo(() => appCache.size, [appCache.size]);

  const setGlobalVar = (key: string, value: any) =>
    setGlobalVars((actual) => ({ ...actual, [key]: value }));

  const getGlobalVar = (key: string) => globalVars[key] || null;

  const removeGlobalVar = (key: string) =>
    setGlobalVars((actual) => {
      const { [key]: _, ...rest } = actual;
      return rest;
    })

  const contextValue = useMemo<CacheContextType>(
    () => ({
      clear,
      get,
      getGlobalVar,
      getLastParams,
      has,
      remove,
      removeGlobalVar,
      set,
      setGlobalVar,
      setLastParams,
      size,
    }),
    [
      get,
      set,
      remove,
      has,
      clear,
      size,
      getLastParams,
      setLastParams,
      revalidate,
      setGlobalVar,
      getGlobalVar,
      removeGlobalVar,
    ]
  );

  return (
    <cacheContext.Provider value={contextValue}>
      {children}
    </cacheContext.Provider>
  );
};

import { useEffect } from "react";

import type { UseGlobalVarArgs } from "./useGlobalVar.types";

import { useAppCache } from "../cache/useAppCache";

const currentOrDefault = (current: any, def: any) => {
  if (current === null && current === undefined && def !== undefined) {
    return def;
  }
  return current;
};

export const useGlobalVar = <ValueType = any>(
  ...[key, options]: UseGlobalVarArgs
) => {
  const appCache = useAppCache();
  const value = appCache.getGlobalVar(key);

  useEffect(() => {
    if (
      !value &&
      options?.defaultValue !== null &&
      options?.defaultValue !== undefined
    ) {
      appCache.setGlobalVar(key, options.defaultValue);
    }
  }, []);

  const change = (value: ValueType) => {
    appCache.setGlobalVar(key, value);
  };

  return [currentOrDefault(value, options?.defaultValue), change];
};

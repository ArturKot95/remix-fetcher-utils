import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo } from "react";

import type { UseMutationHook, UseMutationReturn } from "./useMutation.types";

import { useAppCache } from "../cache/useAppCache";
import { interpolateHref } from "../util";

export const useMutation: UseMutationHook = (options = {}) => {
  const cache = useAppCache();
  const fetcher = useFetcher();

  const returnTuple = useMemo(
    (): UseMutationReturn => [fetcher.submit, fetcher],
    [fetcher]
  );

  useEffect(() => {
    if (fetcher.type === "done") {
      const queriesToRefetch = options.refetchQueries || [];
      for (const query of queriesToRefetch) {
        const lastParams = cache.getLastParams(query) || {};
        const interpolatedHref = interpolateHref(query, lastParams);
        cache.remove(interpolatedHref);
      }
    }
  }, [fetcher.type]);

  return returnTuple;
};

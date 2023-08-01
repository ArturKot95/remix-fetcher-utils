import { SubmitFunction, useFetcher } from "@remix-run/react";
import { useEffect, useMemo } from "react";

import type { UseMutationHook, UseMutationReturn } from "./useMutation.types";

import { useAppCache } from "../cache/useAppCache";
import { interpolateHref } from "../util";

export const useMutation: UseMutationHook = (options = {}) => {
  const cache = useAppCache();
  const fetcher = useFetcher();

  const returnTuple = useMemo(
    (): UseMutationReturn => [
      (target, submitOptions) =>
        fetcher.submit(
          typeof target === "string"
            ? target
            : { ...target as object, subaction: options.subaction },
          { method: "POST", action: options.action, ...submitOptions }
        ),
      fetcher,
    ],
    [fetcher, options]
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

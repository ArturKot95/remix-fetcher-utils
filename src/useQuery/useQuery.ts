import type { FetcherWithComponents } from "@remix-run/react";

import { useFetcher } from "@remix-run/react";
import { shallowEqual } from "fast-equals";
import { useCallback, useEffect, useMemo } from "react";

import { useAppCache } from "../cache/useAppCache";
import { interpolateHref, usePrevious } from "../util";

export const useQuery = <ReturnType = any>(
  href: string,
  options = { params: {} }
) => {
  const cache = useAppCache();
  const fetcher = useFetcher();
  const interpolatedHref = useMemo(
    () => interpolateHref(href, options.params),
    [options.params, href]
  );
  const prevParams = usePrevious(options.params, options.params);

  const loadData = useCallback(() => {
    const cacheHit = cache.get(interpolatedHref);
    if (cacheHit) {
      cache.setLastParams(href, options.params);
    } else {
      fetcher.load(interpolatedHref);
    }
  }, [
    shallowEqual(prevParams, options?.params) ? {} : false,
    interpolatedHref,
    href,
  ]);

  useEffect(() => {
    loadData();
  }, [cache.has(interpolatedHref), loadData]);

  useEffect(() => {
    if (fetcher.type === "done") {
      cache.set(interpolatedHref, fetcher.data);
    }
  }, [fetcher.type, interpolatedHref, cache.get]);

  return {
    ...fetcher,
    data: cache.get(
      interpolatedHref
    ) as FetcherWithComponents<ReturnType>["data"],
    load: loadData,
  };
};

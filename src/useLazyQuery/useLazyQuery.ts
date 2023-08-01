import type { FetcherWithComponents } from "@remix-run/react";

import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";

import type { UseQueryParams } from "../useQuery/useQuery.types";

import { useAppCache } from "../cache/useAppCache";
import { interpolateHref } from "../util";

export const useLazyQuery = <T = any>(
  route: string
): Omit<FetcherWithComponents<T>, "data" | "load"> & {
  data: T | null;
  load: (params: UseQueryParams) => void;
} => {
  const cache = useAppCache();
  const fetcher = useFetcher<T>();
  const [interpolatedRoute, setInterpolatedRoute] = useState<null | string>(
    null
  );
  const [queryParams, setQueryParams] = useState<UseQueryParams>({});

  const loadData = useCallback(
    (params: UseQueryParams) => {
      const interpolated = interpolateHref(route, params);
      fetcher.load(interpolated);
      setInterpolatedRoute(interpolated);
      setQueryParams(params);
    },
    [route]
  );

  useEffect(() => {
    if (fetcher.type === "done" && interpolatedRoute) {
      cache.setLastParams(route, queryParams);
      cache.set(interpolatedRoute, fetcher.data as any);
    }
  }, [fetcher.type, interpolatedRoute, queryParams]);

  return {
    ...fetcher,
    data: (cache.get(route) as T) || null,
    load: loadData,
  };
};

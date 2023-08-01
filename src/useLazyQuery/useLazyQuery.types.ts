import type { FetcherWithComponents } from "@remix-run/react";

import type { UseQueryParams } from "../useQuery/useQuery.types";

export type UseLazyQueryHook = (route: string) => Omit<
  FetcherWithComponents<any>,
  "data" | "load"
> & {
  data: any;
  load: (params: UseQueryParams) => void;
};

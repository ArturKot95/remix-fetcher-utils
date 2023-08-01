import type { FetcherWithComponents } from "@remix-run/react";
import type { UseQueryParams } from "../useQuery/useQuery.types";
export declare const useLazyQuery: <T = any>(route: string) => Omit<FetcherWithComponents<T>, "data" | "load"> & {
    data: T;
    load: (params: UseQueryParams) => void;
};

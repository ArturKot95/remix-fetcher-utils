import type { FetcherWithComponents } from "@remix-run/react";
export type UseQueryParams = {
    [param: string]: string;
};
export type UseQueryReturn<ReturnType = any> = FetcherWithComponents<ReturnType>;
export type UseQueryHook = <ReturnType = any>(href: string, options?: {
    params: UseQueryParams;
}) => UseQueryReturn<ReturnType>;

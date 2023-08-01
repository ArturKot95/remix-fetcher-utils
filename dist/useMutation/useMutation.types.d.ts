import type { FetcherWithComponents, SubmitFunction } from "@remix-run/react";
export type UseMutationOptions = Parameters<FetcherWithComponents<any>["submit"]>[1] & {
    refetchQueries?: string[];
    subaction?: string;
};
export type UseMutationReturn = [SubmitFunction, FetcherWithComponents<any>];
export type UseMutationHook = (options?: UseMutationOptions) => UseMutationReturn;

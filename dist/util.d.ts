import type { MutableRefObject } from "react";
export declare const interpolateHref: (rawHref: string, params?: {
    [param: string]: string;
}) => string;
export declare function usePrevious<T>(value: T, initialValue?: T | null): MutableRefObject<T>;

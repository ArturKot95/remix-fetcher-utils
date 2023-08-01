import type { MutableRefObject } from "react";

import { useEffect, useRef } from "react";

export const interpolateHref = (
  rawHref: string,
  params: { [param: string]: string } = {}
) => {
  let finalHref = rawHref;
  const entries = Object.entries(params);
  for (const [key, value] of entries) {
    finalHref = finalHref.replace(`:${key}`, value);
  }

  return finalHref;
};

export function usePrevious<T>(
  value: T,
  initialValue: T | null = null
): MutableRefObject<T> {
  const ref: any = useRef<T>(initialValue);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

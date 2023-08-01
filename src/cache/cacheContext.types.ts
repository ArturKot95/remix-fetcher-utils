import type { UseQueryParams } from "../useQuery/useQuery.types";

export type CacheValueType = { [prop: string]: any };

export type CacheContextType = {
  clear: () => void;
  get: (key: string) => CacheValueType | undefined;
  getGlobalVar: (key: string) => any;
  getLastParams: (route: string) => UseQueryParams | undefined;
  has: (key: string) => boolean;
  remove: (key: string) => void;
  removeGlobalVar: (key: string) => void;
  set: (key: string, value: CacheValueType) => void;
  setGlobalVar: (key: string, value: any) => void;
  setLastParams: (route: string, params: UseQueryParams) => void;
  size: number;
};

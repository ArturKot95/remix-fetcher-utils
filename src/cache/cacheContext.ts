import { createContext } from "react";

import type { CacheContextType } from "./cacheContext.types";

export const cacheContext = createContext<CacheContextType>({
  clear: () => { },
  get: () => undefined,
  getLastParams: () => undefined,
  has: () => false,
  remove: () => { },
  set: () => { },
  setLastParams: () => { },
  getGlobalVar: () => null,
  setGlobalVar: () => null,
  removeGlobalVar: () => null,
  size: 0,
});

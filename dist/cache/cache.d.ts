import type { CacheValueType } from "./cacheContext.types";
import { LRUCache } from "./LRUCache";
declare const cache: LRUCache<string, CacheValueType>;
export { cache };

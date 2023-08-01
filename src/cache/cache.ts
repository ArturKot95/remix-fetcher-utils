import type { CacheValueType } from "./cacheContext.types";

import { LRUCache } from "./LRUCache";

const cache = new LRUCache<string, CacheValueType>(1000);

export { cache };

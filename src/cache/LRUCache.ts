export class LRUCache<TKey, TValue> {
  private cache: Map<TKey, TValue>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.cache = new Map<TKey, TValue>();
  }

  clear(): void {
    this.cache.clear();
  }

  get(key: TKey): TValue | undefined {
    const value = this.cache.get(key);

    if (value) {
      // Move the accessed item to the end of the Map to mark it as recently used
      this.cache.delete(key);
      this.cache.set(key, value);
    }

    return value;
  }

  has(key: TKey): boolean {
    return this.cache.has(key);
  }

  remove(key: TKey): void {
    this.cache.delete(key);
  }

  set(key: TKey, value: TValue): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // Add the new item to the end of the Map
    this.cache.set(key, value);
  }

  get size(): number {
    return this.cache.size;
  }
}

export declare class LRUCache<TKey, TValue> {
    private cache;
    private maxSize;
    constructor(maxSize: number);
    clear(): void;
    get(key: TKey): TValue | undefined;
    has(key: TKey): boolean;
    remove(key: TKey): void;
    set(key: TKey, value: TValue): void;
    get size(): number;
}

System.register([], function (exports_1, context_1) {
    "use strict";
    var LRUCache;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            LRUCache = /** @class */ (function () {
                function LRUCache(maxSize) {
                    this.maxSize = maxSize;
                    this.cache = new Map();
                }
                LRUCache.prototype.clear = function () {
                    this.cache.clear();
                };
                LRUCache.prototype.get = function (key) {
                    var value = this.cache.get(key);
                    if (value) {
                        // Move the accessed item to the end of the Map to mark it as recently used
                        this.cache.delete(key);
                        this.cache.set(key, value);
                    }
                    return value;
                };
                LRUCache.prototype.has = function (key) {
                    return this.cache.has(key);
                };
                LRUCache.prototype.remove = function (key) {
                    this.cache.delete(key);
                };
                LRUCache.prototype.set = function (key, value) {
                    if (this.cache.size >= this.maxSize) {
                        var firstKey = this.cache.keys().next().value;
                        this.cache.delete(firstKey);
                    }
                    // Add the new item to the end of the Map
                    this.cache.set(key, value);
                };
                Object.defineProperty(LRUCache.prototype, "size", {
                    get: function () {
                        return this.cache.size;
                    },
                    enumerable: false,
                    configurable: true
                });
                return LRUCache;
            }());
            exports_1("LRUCache", LRUCache);
        }
    };
});

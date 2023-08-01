System.register(["./LRUCache"], function (exports_1, context_1) {
    "use strict";
    var LRUCache_1, cache;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (LRUCache_1_1) {
                LRUCache_1 = LRUCache_1_1;
            }
        ],
        execute: function () {
            cache = new LRUCache_1.LRUCache(1000);
            exports_1("cache", cache);
        }
    };
});

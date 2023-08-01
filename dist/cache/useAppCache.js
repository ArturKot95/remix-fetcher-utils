System.register(["react", "./cacheContext"], function (exports_1, context_1) {
    "use strict";
    var react_1, cacheContext_1, useAppCache;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (cacheContext_1_1) {
                cacheContext_1 = cacheContext_1_1;
            }
        ],
        execute: function () {
            exports_1("useAppCache", useAppCache = function () {
                var cache = react_1.useContext(cacheContext_1.cacheContext);
                return cache;
            });
        }
    };
});

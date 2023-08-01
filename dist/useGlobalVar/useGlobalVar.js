System.register(["react", "../cache/useAppCache"], function (exports_1, context_1) {
    "use strict";
    var react_1, useAppCache_1, currentOrDefault, useGlobalVar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (useAppCache_1_1) {
                useAppCache_1 = useAppCache_1_1;
            }
        ],
        execute: function () {
            currentOrDefault = function (current, def) {
                if (current === null && current === undefined && def !== undefined) {
                    return def;
                }
                return current;
            };
            exports_1("useGlobalVar", useGlobalVar = function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var key = _a[0], options = _a[1];
                var appCache = useAppCache_1.useAppCache();
                var value = appCache.getGlobalVar(key);
                react_1.useEffect(function () {
                    if (!value &&
                        (options === null || options === void 0 ? void 0 : options.defaultValue) !== null &&
                        (options === null || options === void 0 ? void 0 : options.defaultValue) !== undefined) {
                        appCache.setGlobalVar(key, options.defaultValue);
                    }
                }, []);
                var change = function (value) {
                    appCache.setGlobalVar(key, value);
                };
                return [currentOrDefault(value, options === null || options === void 0 ? void 0 : options.defaultValue), change];
            });
        }
    };
});

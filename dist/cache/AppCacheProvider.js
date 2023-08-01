System.register(["react/jsx-runtime", "react", "./LRUCache", "./cacheContext"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __rest = (this && this.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var jsx_runtime_1, react_1, LRUCache_1, cacheContext_1, AppCacheProvider;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (LRUCache_1_1) {
                LRUCache_1 = LRUCache_1_1;
            },
            function (cacheContext_1_1) {
                cacheContext_1 = cacheContext_1_1;
            }
        ],
        execute: function () {
            exports_1("AppCacheProvider", AppCacheProvider = function (_a) {
                var children = _a.children;
                var appCache = react_1.useRef(new LRUCache_1.LRUCache(1000)).current;
                var _b = react_1.useState({}), globalVars = _b[0], setGlobalVars = _b[1];
                var lastParamsMap = react_1.useRef(new Map()).current;
                var _c = react_1.useState(false), revalidate = _c[0], setRevalidate = _c[1];
                var runRevalidate = react_1.useCallback(function () {
                    setRevalidate(function (prev) { return !prev; });
                }, []);
                var get = react_1.useCallback(function (key) {
                    return appCache.get(key);
                }, []);
                /** Save params for last query with particular route. */
                var getLastParams = react_1.useCallback(function (route) {
                    return lastParamsMap.get(route);
                }, []);
                var set = react_1.useCallback(function (key, value) {
                    appCache.set(key, value);
                    runRevalidate();
                }, []);
                var setLastParams = react_1.useCallback(function (route, params) {
                    lastParamsMap.set(route, params);
                }, []);
                var remove = react_1.useCallback(function (key) {
                    appCache.remove(key);
                    runRevalidate();
                }, []);
                var has = react_1.useCallback(function (key) { return appCache.has(key); }, []);
                var clear = react_1.useCallback(function () {
                    appCache.clear();
                    runRevalidate();
                }, []);
                var size = react_1.useMemo(function () { return appCache.size; }, [appCache.size]);
                var setGlobalVar = function (key, value) {
                    return setGlobalVars(function (actual) {
                        var _a;
                        return (__assign(__assign({}, actual), (_a = {}, _a[key] = value, _a)));
                    });
                };
                var getGlobalVar = function (key) { return globalVars[key] || null; };
                var removeGlobalVar = function (key) {
                    return setGlobalVars(function (actual) {
                        var _a = actual, _b = key, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                        return rest;
                    });
                };
                var contextValue = react_1.useMemo(function () { return ({
                    clear: clear,
                    get: get,
                    getGlobalVar: getGlobalVar,
                    getLastParams: getLastParams,
                    has: has,
                    remove: remove,
                    removeGlobalVar: removeGlobalVar,
                    set: set,
                    setGlobalVar: setGlobalVar,
                    setLastParams: setLastParams,
                    size: size,
                }); }, [
                    get,
                    set,
                    remove,
                    has,
                    clear,
                    size,
                    getLastParams,
                    setLastParams,
                    revalidate,
                    setGlobalVar,
                    getGlobalVar,
                    removeGlobalVar,
                ]);
                return (_jsx(cacheContext_1.cacheContext.Provider, { value: contextValue, children: children }));
            });
        }
    };
});

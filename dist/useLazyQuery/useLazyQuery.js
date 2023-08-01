System.register(["@remix-run/react", "react", "../cache/useAppCache", "../util"], function (exports_1, context_1) {
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
    var react_1, react_2, useAppCache_1, util_1, useLazyQuery;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_2_1) {
                react_2 = react_2_1;
            },
            function (useAppCache_1_1) {
                useAppCache_1 = useAppCache_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            exports_1("useLazyQuery", useLazyQuery = function (route) {
                var cache = useAppCache_1.useAppCache();
                var fetcher = react_1.useFetcher();
                var _a = react_2.useState(null), interpolatedRoute = _a[0], setInterpolatedRoute = _a[1];
                var _b = react_2.useState({}), queryParams = _b[0], setQueryParams = _b[1];
                var loadData = react_2.useCallback(function (params) {
                    var interpolated = util_1.interpolateHref(route, params);
                    fetcher.load(interpolated);
                    setInterpolatedRoute(interpolated);
                    setQueryParams(params);
                }, [route]);
                react_2.useEffect(function () {
                    if (fetcher.type === "done" && interpolatedRoute) {
                        cache.setLastParams(route, queryParams);
                        cache.set(interpolatedRoute, fetcher.data);
                    }
                }, [fetcher.type, interpolatedRoute, queryParams]);
                return __assign(__assign({}, fetcher), { data: cache.get(route) || null, load: loadData });
            });
        }
    };
});

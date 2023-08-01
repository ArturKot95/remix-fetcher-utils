System.register(["@remix-run/react", "fast-equals", "react", "../cache/useAppCache", "../util"], function (exports_1, context_1) {
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
    var react_1, fast_equals_1, react_2, useAppCache_1, util_1, useQuery;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (fast_equals_1_1) {
                fast_equals_1 = fast_equals_1_1;
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
            exports_1("useQuery", useQuery = function (href, options) {
                if (options === void 0) { options = { params: {} }; }
                var cache = useAppCache_1.useAppCache();
                var fetcher = react_1.useFetcher();
                var interpolatedHref = react_2.useMemo(function () { return util_1.interpolateHref(href, options.params); }, [options.params, href]);
                var prevParams = util_1.usePrevious(options.params, options.params);
                var loadData = react_2.useCallback(function () {
                    var cacheHit = cache.get(interpolatedHref);
                    if (cacheHit) {
                        cache.setLastParams(href, options.params);
                    }
                    else {
                        fetcher.load(interpolatedHref);
                    }
                }, [
                    fast_equals_1.shallowEqual(prevParams, options === null || options === void 0 ? void 0 : options.params) ? {} : false,
                    interpolatedHref,
                    href,
                ]);
                react_2.useEffect(function () {
                    loadData();
                }, [cache.has(interpolatedHref), loadData]);
                react_2.useEffect(function () {
                    if (fetcher.type === "done") {
                        cache.set(interpolatedHref, fetcher.data);
                    }
                }, [fetcher.type, interpolatedHref, cache.get]);
                return __assign(__assign({}, fetcher), { data: cache.get(interpolatedHref), load: loadData });
            });
        }
    };
});

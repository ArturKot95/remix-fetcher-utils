System.register(["@remix-run/react", "react", "../cache/useAppCache", "../util"], function (exports_1, context_1) {
    "use strict";
    var react_1, react_2, useAppCache_1, util_1, useMutation;
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
            exports_1("useMutation", useMutation = function (options) {
                if (options === void 0) { options = {}; }
                var cache = useAppCache_1.useAppCache();
                var fetcher = react_1.useFetcher();
                var returnTuple = react_2.useMemo(function () { return [fetcher.submit, fetcher]; }, [fetcher]);
                react_2.useEffect(function () {
                    if (fetcher.type === "done") {
                        var queriesToRefetch = options.refetchQueries || [];
                        for (var _i = 0, queriesToRefetch_1 = queriesToRefetch; _i < queriesToRefetch_1.length; _i++) {
                            var query = queriesToRefetch_1[_i];
                            var lastParams = cache.getLastParams(query) || {};
                            var interpolatedHref = util_1.interpolateHref(query, lastParams);
                            cache.remove(interpolatedHref);
                        }
                    }
                }, [fetcher.type]);
                return returnTuple;
            });
        }
    };
});

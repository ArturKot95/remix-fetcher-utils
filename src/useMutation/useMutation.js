"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutation = void 0;
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var useAppCache_1 = require("../cache/useAppCache");
var util_1 = require("../util");
var useMutation = function (options) {
    if (options === void 0) { options = {}; }
    var cache = (0, useAppCache_1.useAppCache)();
    var fetcher = (0, react_1.useFetcher)();
    var returnTuple = (0, react_2.useMemo)(function () { return [fetcher.submit, fetcher]; }, [fetcher]);
    (0, react_2.useEffect)(function () {
        if (fetcher.type === "done") {
            var queriesToRefetch = options.refetchQueries || [];
            for (var _i = 0, queriesToRefetch_1 = queriesToRefetch; _i < queriesToRefetch_1.length; _i++) {
                var query = queriesToRefetch_1[_i];
                var lastParams = cache.getLastParams(query) || {};
                var interpolatedHref = (0, util_1.interpolateHref)(query, lastParams);
                cache.remove(interpolatedHref);
            }
        }
    }, [fetcher.type]);
    return returnTuple;
};
exports.useMutation = useMutation;

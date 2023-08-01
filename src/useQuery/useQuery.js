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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
var react_1 = require("@remix-run/react");
var fast_equals_1 = require("fast-equals");
var react_2 = require("react");
var useAppCache_1 = require("../cache/useAppCache");
var util_1 = require("../util");
var useQuery = function (href, options) {
    if (options === void 0) { options = { params: {} }; }
    var cache = (0, useAppCache_1.useAppCache)();
    var fetcher = (0, react_1.useFetcher)();
    var interpolatedHref = (0, react_2.useMemo)(function () { return (0, util_1.interpolateHref)(href, options.params); }, [options.params, href]);
    var prevParams = (0, util_1.usePrevious)(options.params, options.params);
    var loadData = (0, react_2.useCallback)(function () {
        var cacheHit = cache.get(interpolatedHref);
        if (cacheHit) {
            cache.setLastParams(href, options.params);
        }
        else {
            fetcher.load(interpolatedHref);
        }
    }, [
        (0, fast_equals_1.shallowEqual)(prevParams, options === null || options === void 0 ? void 0 : options.params) ? {} : false,
        interpolatedHref,
        href,
    ]);
    (0, react_2.useEffect)(function () {
        loadData();
    }, [cache.has(interpolatedHref), loadData]);
    (0, react_2.useEffect)(function () {
        if (fetcher.type === "done") {
            cache.set(interpolatedHref, fetcher.data);
        }
    }, [fetcher.type, interpolatedHref, cache.get]);
    return __assign(__assign({}, fetcher), { data: cache.get(interpolatedHref), load: loadData });
};
exports.useQuery = useQuery;

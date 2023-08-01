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
exports.useLazyQuery = void 0;
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var useAppCache_1 = require("../cache/useAppCache");
var util_1 = require("../util");
var useLazyQuery = function (route) {
    var cache = (0, useAppCache_1.useAppCache)();
    var fetcher = (0, react_1.useFetcher)();
    var _a = (0, react_2.useState)(null), interpolatedRoute = _a[0], setInterpolatedRoute = _a[1];
    var _b = (0, react_2.useState)({}), queryParams = _b[0], setQueryParams = _b[1];
    var loadData = (0, react_2.useCallback)(function (params) {
        var interpolated = (0, util_1.interpolateHref)(route, params);
        fetcher.load(interpolated);
        setInterpolatedRoute(interpolated);
        setQueryParams(params);
    }, [route]);
    (0, react_2.useEffect)(function () {
        if (fetcher.type === "done" && interpolatedRoute) {
            cache.setLastParams(route, queryParams);
            cache.set(interpolatedRoute, fetcher.data);
        }
    }, [fetcher.type, interpolatedRoute, queryParams]);
    return __assign(__assign({}, fetcher), { data: cache.get(route) || null, load: loadData });
};
exports.useLazyQuery = useLazyQuery;

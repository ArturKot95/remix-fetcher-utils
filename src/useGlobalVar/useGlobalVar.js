"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalVar = void 0;
var react_1 = require("react");
var useAppCache_1 = require("../cache/useAppCache");
var currentOrDefault = function (current, def) {
    if (current === null && current === undefined && def !== undefined) {
        return def;
    }
    return current;
};
var useGlobalVar = function () {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var key = _a[0], options = _a[1];
    var appCache = (0, useAppCache_1.useAppCache)();
    var value = appCache.getGlobalVar(key);
    (0, react_1.useEffect)(function () {
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
};
exports.useGlobalVar = useGlobalVar;

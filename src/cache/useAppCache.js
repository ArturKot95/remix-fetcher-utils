"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppCache = void 0;
var react_1 = require("react");
var cacheContext_1 = require("./cacheContext");
var useAppCache = function () {
    var cache = (0, react_1.useContext)(cacheContext_1.cacheContext);
    return cache;
};
exports.useAppCache = useAppCache;

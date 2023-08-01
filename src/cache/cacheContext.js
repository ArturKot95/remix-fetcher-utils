"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheContext = void 0;
var react_1 = require("react");
exports.cacheContext = (0, react_1.createContext)({
    clear: function () { },
    get: function () { return undefined; },
    getLastParams: function () { return undefined; },
    has: function () { return false; },
    remove: function () { },
    set: function () { },
    setLastParams: function () { },
    getGlobalVar: function () { return null; },
    setGlobalVar: function () { return null; },
    removeGlobalVar: function () { return null; },
    size: 0,
});

System.register(["react"], function (exports_1, context_1) {
    "use strict";
    var react_1, cacheContext;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            }
        ],
        execute: function () {
            exports_1("cacheContext", cacheContext = react_1.createContext({
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
            }));
        }
    };
});

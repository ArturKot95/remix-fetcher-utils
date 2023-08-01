System.register(["react"], function (exports_1, context_1) {
    "use strict";
    var react_1, interpolateHref;
    var __moduleName = context_1 && context_1.id;
    function usePrevious(value, initialValue) {
        if (initialValue === void 0) { initialValue = null; }
        var ref = react_1.useRef(initialValue);
        react_1.useEffect(function () {
            ref.current = value;
        }, [value]);
        return ref;
    }
    exports_1("usePrevious", usePrevious);
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            }
        ],
        execute: function () {
            exports_1("interpolateHref", interpolateHref = function (rawHref, params) {
                if (params === void 0) { params = {}; }
                var finalHref = rawHref;
                var entries = Object.entries(params);
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var _a = entries_1[_i], key = _a[0], value = _a[1];
                    finalHref = finalHref.replace(":".concat(key), value);
                }
                return finalHref;
            });
        }
    };
});

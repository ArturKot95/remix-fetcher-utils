"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = exports.interpolateHref = void 0;
var react_1 = require("react");
var interpolateHref = function (rawHref, params) {
    if (params === void 0) { params = {}; }
    var finalHref = rawHref;
    var entries = Object.entries(params);
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], key = _a[0], value = _a[1];
        finalHref = finalHref.replace(":".concat(key), value);
    }
    return finalHref;
};
exports.interpolateHref = interpolateHref;
function usePrevious(value, initialValue) {
    if (initialValue === void 0) { initialValue = null; }
    var ref = (0, react_1.useRef)(initialValue);
    (0, react_1.useEffect)(function () {
        ref.current = value;
    }, [value]);
    return ref;
}
exports.usePrevious = usePrevious;

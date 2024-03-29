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
import { createContext } from "react";
import { defaultGlobalConfiguration, } from "../model";
export var defaultQcmConfiguration = __assign(__assign({}, defaultGlobalConfiguration), { multiple: false, coefficient: 1 });
var QcmContext = createContext(undefined);
export default QcmContext;

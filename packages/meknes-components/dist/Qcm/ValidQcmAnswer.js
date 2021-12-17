import React from "react";
import QcmContext from "./QcmContext";
var ValidQcmAnswer = function (_a) {
    var children = _a.children;
    var _b = React.useContext(QcmContext), submitAnswer = _b.submitAnswer, isSubmittingQcm = _b.isSubmittingQcm, _c = _b.config, validOnSelect = _c.validOnSelect, multiple = _c.multiple;
    var isDisabled = (validOnSelect && !multiple) || isSubmittingQcm;
    return (React.createElement("button", { onClick: submitAnswer, disabled: isDisabled }, children));
};
export default ValidQcmAnswer;

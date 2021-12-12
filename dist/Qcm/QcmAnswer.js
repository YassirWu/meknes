import React from "react";
import clsx from "clsx";
import QcmContext from "./QcmContext";
import { QuestionnairePageContext } from "../QuestionnairePage";
var useQcmAnswerClassNames = function (_a) {
    var idResponse = _a.idResponse, _b = _a.isValid, isValid = _b === void 0 ? false : _b;
    var _c = React.useContext(QcmContext), answer = _c.answer, config = _c.config, isSubmittingQcm = _c.isSubmittingQcm;
    var showResultAfterResponse = config.showResultAfterResponse;
    var isAnswered = answer.userResponse.length > 0;
    var isUserAnswer = isAnswered && answer.userResponse.includes(idResponse);
    var classes = {
        "meknes-answer": true,
        "meknes-answer--disabled": isSubmittingQcm,
        "meknes-answer--user": isUserAnswer,
    };
    if (showResultAfterResponse) {
        classes["meknes-answer--wrong"] =
            isSubmittingQcm && isUserAnswer && !isValid;
        classes["meknes-answer--good"] = isSubmittingQcm && isAnswered && isValid;
    }
    return clsx(classes);
};
var QcmAnswer = function (_a) {
    var idResponse = _a.idResponse, _b = _a.isValid, isValid = _b === void 0 ? false : _b, children = _a.children;
    var _c = React.useContext(QcmContext), onAnswer = _c.onAnswer, isSubmittingQcm = _c.isSubmittingQcm, declareAnswer = _c.declareAnswer;
    var current = React.useContext(QuestionnairePageContext).current;
    var classNames = useQcmAnswerClassNames({ idResponse: idResponse, isValid: isValid });
    React.useEffect(function () {
        if (isValid) {
            declareAnswer(idResponse, isValid);
        }
    }, [idResponse, isValid]);
    if (!current) {
        return null;
    }
    return (React.createElement("button", { disabled: isSubmittingQcm, onClick: function () { return onAnswer(idResponse); }, className: classNames }, children));
};
export default QcmAnswer;

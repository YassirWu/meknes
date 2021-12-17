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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from "react";
import { QuestionnairePageContext } from "../QuestionnairePage";
import { getUniqId } from "../utils";
import { QuestionnaireContext } from "../Questionnaire";
import QcmContext, { defaultQcmConfiguration, } from "./QcmContext";
var useQcmInit = function (config) {
    var idQuestion = React.useState(getUniqId())[0];
    var _a = React.useContext(QuestionnaireContext), globalConfiguration = _a.globalConfiguration, addQuestion = _a.addQuestion;
    var idPage = React.useContext(QuestionnairePageContext).idPage;
    var mergedQcmConfiguration = __assign(__assign(__assign({}, defaultQcmConfiguration), globalConfiguration), config);
    React.useEffect(function () {
        addQuestion(idPage, idQuestion, mergedQcmConfiguration.coefficient);
    }, []);
    return { idQuestion: idQuestion, mergedQcmConfiguration: mergedQcmConfiguration };
};
var Qcm = function (_a) {
    var children = _a.children, _b = _a.config, config = _b === void 0 ? {} : _b;
    var _c = useQcmInit(config), idQuestion = _c.idQuestion, mergedQcmConfiguration = _c.mergedQcmConfiguration;
    var _d = React.useState({
        userResponse: [],
    }), answer = _d[0], setAnswer = _d[1];
    var _e = React.useState([]), goodAnswers = _e[0], setGoodAnswers = _e[1];
    var _f = React.useState(false), isSubmittingQcm = _f[0], setIsSubmittingQcm = _f[1];
    var response = React.useContext(QuestionnaireContext).response;
    var submitQcm = React.useCallback(function (answer) {
        var _a;
        var isValid = config.multiple
            ? goodAnswers.length === answer.userResponse.length &&
                goodAnswers.every(function (g) { return answer.userResponse.includes(g); })
            : goodAnswers.includes((_a = answer.userResponse) === null || _a === void 0 ? void 0 : _a[0]);
        setIsSubmittingQcm(true);
        response(idQuestion, answer, isValid);
    }, [config, goodAnswers, idQuestion, response]);
    var onAnswer = function (value) {
        // remove response
        if (answer.userResponse.includes(value)) {
            setAnswer(function (prevState) { return (__assign(__assign({}, prevState), { userResponse: answer.userResponse.filter(function (u) { return u !== value; }) })); });
            return;
        }
        var updatedAnswer = {
            userResponse: config.multiple ? __spreadArrays(answer.userResponse, [value]) : [value],
        };
        setAnswer(updatedAnswer);
        if (mergedQcmConfiguration.validOnSelect &&
            !mergedQcmConfiguration.multiple) {
            submitQcm(updatedAnswer);
        }
    };
    var submitAnswer = function () {
        if (answer) {
            submitQcm(answer);
        }
    };
    var declareAnswer = function (newAnswer, isValid) {
        if (isValid) {
            setGoodAnswers(function (prevState) { return __spreadArrays(prevState, [newAnswer]); });
        }
    };
    return (React.createElement(QcmContext.Provider, { value: {
            onAnswer: onAnswer,
            submitAnswer: submitAnswer,
            answer: answer,
            config: mergedQcmConfiguration,
            isSubmittingQcm: isSubmittingQcm,
            declareAnswer: declareAnswer,
        } }, children));
};
export default Qcm;

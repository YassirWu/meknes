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
import { defaultGlobalConfiguration, } from "./model";
export var QuestionnaireContext = React.createContext(undefined);
export var useQuestionnaire = function () {
    var _a = React.useState(0), currentPage = _a[0], setCurrentPage = _a[1];
    var _b = React.useState([]), pages = _b[0], setPages = _b[1];
    var _c = React.useState([]), questions = _c[0], setQuestions = _c[1];
    var addPageToQuestionnaire = React.useCallback(function (indexPage, idPage) {
        setPages(function (prevState) { return __spreadArrays(prevState, [
            {
                indexPage: indexPage,
                idPage: idPage,
            },
        ]); });
    }, []);
    var addQuestion = React.useCallback(function (idPage, idQuestion, coefficient) {
        setQuestions(function (prevState) { return __spreadArrays(prevState, [
            {
                idPage: idPage,
                idQuestion: idQuestion,
                isAnswered: false,
                coefficient: coefficient,
            },
        ]); });
    }, []);
    var response = React.useCallback(function (idQuestion, answer, isValid) {
        setQuestions(function (prevState) {
            var newState = prevState.map(function (p) {
                if (p.idQuestion === idQuestion) {
                    return __assign(__assign({}, p), { answer: answer, isAnswered: true, isValid: isValid });
                }
                return p;
            });
            return newState;
        });
    }, []);
    return {
        pages: pages,
        setPages: setPages,
        addPageToQuestionnaire: addPageToQuestionnaire,
        questions: questions,
        setQuestions: setQuestions,
        addQuestion: addQuestion,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        response: response,
    };
};
export var Questionnaire = function (_a) {
    var children = _a.children, _b = _a.config, config = _b === void 0 ? {} : _b;
    var _c = useQuestionnaire(), pages = _c.pages, setPages = _c.setPages, currentPage = _c.currentPage, setCurrentPage = _c.setCurrentPage, addPageToQuestionnaire = _c.addPageToQuestionnaire, questions = _c.questions, addQuestion = _c.addQuestion, response = _c.response;
    var mergedGlobalConfiguration = __assign(__assign({}, defaultGlobalConfiguration), config);
    var score = React.useMemo(function () {
        return questions.reduce(function (result, question) {
            return question.isValid ? result + question.coefficient : result;
        }, 0);
    }, [questions]);
    var total = React.useMemo(function () {
        return questions.reduce(function (result, question) { return result + question.coefficient; }, 0);
    }, [questions]);
    var isFinished = React.useMemo(function () { return questions.every(function (q) { return q.isAnswered; }); }, [
        questions,
    ]);
    var nextQuestion = React.useCallback(function () {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, pages, setCurrentPage]);
    var previousQuestion = React.useCallback(function () {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, setCurrentPage]);
    var onAnswer = React.useCallback(function (idPage, results) {
        var newPages = pages.map(function (page, i) {
            if (page.idPage === idPage) {
                return __assign(__assign({}, page), { results: results });
            }
            return page;
        });
        setPages(newPages);
    }, [pages, setPages]);
    var ctx = {
        pages: pages,
        currentPage: currentPage,
        nextQuestion: nextQuestion,
        previousQuestion: previousQuestion,
        onAnswer: onAnswer,
        addPageToQuestionnaire: addPageToQuestionnaire,
        questions: questions,
        addQuestion: addQuestion,
        response: response,
        globalConfiguration: mergedGlobalConfiguration,
        score: score,
        total: total,
        isFinished: isFinished,
    };
    return (React.createElement(QuestionnaireContext.Provider, { value: ctx }, typeof children === "function" ? children(ctx) : children));
};

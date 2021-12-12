import React from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { getUniqId, useQuestionsOfByIdPage } from "./utils";
export var QuestionnairePage = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null, children);
};
export var QuestionnairePageContext = React.createContext(undefined);
export var QuestionnairePageContainer = function (_a) {
    var current = _a.current, indexPage = _a.indexPage, children = _a.children;
    var idPage = React.useState(getUniqId())[0];
    var _b = React.useContext(QuestionnaireContext), onAnswer = _b.onAnswer, addPageToQuestionnaire = _b.addPageToQuestionnaire;
    var questions = useQuestionsOfByIdPage(idPage);
    React.useEffect(function () {
        addPageToQuestionnaire(indexPage, idPage);
    }, [indexPage, idPage, addPageToQuestionnaire]);
    React.useEffect(function () {
        if (questions.length > 0 && questions.every(function (q) { return q.isAnswered; })) {
            onAnswer(idPage, questions);
        }
    }, [questions, idPage]);
    return (React.createElement(QuestionnairePageContext.Provider, { value: { idPage: idPage, current: current } },
        React.createElement("div", { style: { display: !current ? "none" : "block" } }, children)));
};
export var QuestionnairePages = function (_a) {
    var children = _a.children;
    var currentPage = React.useContext(QuestionnaireContext).currentPage;
    return (React.createElement(React.Fragment, null, React.Children.map(children, function (child, i) {
        var indexPage = i;
        return (React.createElement(QuestionnairePageContainer, { key: indexPage, current: currentPage === indexPage, indexPage: indexPage }, child));
    })));
};

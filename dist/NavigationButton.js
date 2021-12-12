import React from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { useQuestionsOfCurrentPage } from "./utils";
function getIsAnswered(questions) {
    return !questions.every(function (q) { return q.isAnswered; });
}
export var PreviousQuestion = function (_a) {
    var children = _a.children;
    var previousQuestion = React.useContext(QuestionnaireContext).previousQuestion;
    var questions = useQuestionsOfCurrentPage();
    return (React.createElement("button", { disabled: getIsAnswered(questions), onClick: previousQuestion }, children));
};
export var NextQuestion = function (_a) {
    var children = _a.children;
    var nextQuestion = React.useContext(QuestionnaireContext).nextQuestion;
    var questions = useQuestionsOfCurrentPage();
    return (React.createElement("button", { disabled: getIsAnswered(questions), onClick: nextQuestion }, children));
};

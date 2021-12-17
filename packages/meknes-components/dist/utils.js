import { useContext, useMemo } from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { QuestionnairePageContext } from "./QuestionnairePage";
export function getUniqId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}
export function useQuestionsOfCurrentPage() {
    var questions = useContext(QuestionnaireContext).questions;
    var idPage = useContext(QuestionnairePageContext).idPage;
    var result = useMemo(function () { return questions.filter(function (q) { return q.idPage === idPage; }); }, [
        questions,
        idPage,
    ]);
    return result;
}
export function useQuestionsOfByIdPage(idPage) {
    var questions = useContext(QuestionnaireContext).questions;
    var result = useMemo(function () { return questions.filter(function (q) { return q.idPage === idPage; }); }, [
        questions,
        idPage,
    ]);
    return result;
}

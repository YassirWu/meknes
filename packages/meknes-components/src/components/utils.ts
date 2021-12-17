import { useContext, useMemo } from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { QuestionnairePageContext } from "./QuestionnairePage";

export function getUniqId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export function useQuestionsOfCurrentPage() {
  const { questions } = useContext(QuestionnaireContext);
  const { idPage } = useContext(QuestionnairePageContext);

  const result = useMemo(() => questions.filter((q) => q.idPage === idPage), [
    questions,
    idPage,
  ]);

  return result;
}

export function useQuestionsOfByIdPage(idPage: string) {
  const { questions } = useContext(QuestionnaireContext);

  const result = useMemo(() => questions.filter((q) => q.idPage === idPage), [
    questions,
    idPage,
  ]);

  return result;
}

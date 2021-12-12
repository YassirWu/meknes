import React from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { QuestionInformation } from "./model";
import { useQuestionsOfCurrentPage } from "./utils";

function getIsAnswered(questions: QuestionInformation[]) {
  return !questions.every((q) => q.isAnswered);
}

export const PreviousQuestion: React.FunctionComponent = ({ children }) => {
  const { previousQuestion } = React.useContext(QuestionnaireContext);
  const questions = useQuestionsOfCurrentPage();

  return (
    <button disabled={getIsAnswered(questions)} onClick={previousQuestion}>
      {children}
    </button>
  );
};

export const NextQuestion: React.FunctionComponent = ({ children }) => {
  const { nextQuestion } = React.useContext(QuestionnaireContext);
  const questions = useQuestionsOfCurrentPage();

  return (
    <button disabled={getIsAnswered(questions)} onClick={nextQuestion}>
      {children}
    </button>
  );
};

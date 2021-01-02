import React from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { QuestionnairePageContext } from "./QuestionnairePage";
import { ResultInformation } from "./model";

function getIsAnswered(results: ResultInformation[]) {
  return !results.every(q => q.isAnswered)
}

export const PreviousQuestion: React.FunctionComponent = ({ children }) => {
  const { previousQuestion } = React.useContext(
    QuestionnaireContext
  );
  const { results } = React.useContext(QuestionnairePageContext);

  return (
    <button disabled={getIsAnswered(results)} onClick={previousQuestion}>
      {children}
    </button>
  );
};

export const NextQuestion: React.FunctionComponent = ({ children }) => {
  const { nextQuestion } = React.useContext(
    QuestionnaireContext
  );
  const { results } = React.useContext(QuestionnairePageContext);

  return (
    <button disabled={getIsAnswered(results)} onClick={nextQuestion}>
      {children}
    </button>
  );
};

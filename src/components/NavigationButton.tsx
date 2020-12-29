import React from "react";
import { QuestionnaireContext } from "./Questionnaire";
import { QuestionnaireInformation } from "./model";

function getIsAnswered(questionnaire: QuestionnaireInformation) {
  const result = questionnaire.results.find(
    (result) => result.idQuestion === questionnaire.currentPage
  );

  return !result || !result.isAnswered;
}

export const PreviousQuestion: React.FunctionComponent = ({ children }) => {
  const { previousQuestion, questionnaire } = React.useContext(
    QuestionnaireContext
  );

  return (
    <button disabled={getIsAnswered(questionnaire)} onClick={previousQuestion}>
      {children}
    </button>
  );
};

export const NextQuestion: React.FunctionComponent = ({ children }) => {
  const { nextQuestion, questionnaire } = React.useContext(
    QuestionnaireContext
  );

  return (
    <button disabled={getIsAnswered(questionnaire)} onClick={nextQuestion}>
      {children}
    </button>
  );
};

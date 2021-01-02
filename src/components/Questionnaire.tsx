import React from "react";
import {
  QuestionnaireInformation,
  newQuestionnaire,
  ResultInformation,
  PageInformation,
} from "./model";

type QuestionnaireContextProps = {
  questionnaire: QuestionnaireInformation;
  nextQuestion: () => void;
  previousQuestion: () => void;
  onAnswer: (idPage: number, results: ResultInformation[]) => void;
  updateQuestionnaire: (questionnaire: QuestionnaireInformation) => void;
};
export const QuestionnaireContext = React.createContext<
  QuestionnaireContextProps
>(undefined!);

export const useQuestionnaire = () => {
  const [questionnaire, updateQuestionnaire] = React.useState<
    QuestionnaireInformation
  >(newQuestionnaire());

  return {
    questionnaire,
    updateQuestionnaire,
  };
};

type QuestionnaireProps = {};

export const Questionnaire: React.FunctionComponent<QuestionnaireProps> = ({
  children,
}) => {
  const { questionnaire, updateQuestionnaire } = useQuestionnaire();

  const nextQuestion = () => {
    if (questionnaire.currentPage < questionnaire.numberOfPage - 1) {
      updateQuestionnaire({
        ...questionnaire,
        currentPage: questionnaire.currentPage + 1,
      });
    }
  };
  const previousQuestion = () => {
    if (questionnaire.currentPage > 0) {
      updateQuestionnaire({
        ...questionnaire,
        currentPage: questionnaire.currentPage - 1,
      });
    }
  };

  const ctx: QuestionnaireContextProps = {
    questionnaire,
    nextQuestion,
    previousQuestion,
    onAnswer: (idPage, results) => {
      const newPages = questionnaire.pages.map((page, i) => {
        if (page.idPage === idPage) {
          return {
            ...page,
            results,
          } as PageInformation;
        }

        return page;
      });
      const newQuestionnaire: QuestionnaireInformation = {
        ...questionnaire,
        pages: newPages,
      };

      updateQuestionnaire(newQuestionnaire);
    },
    updateQuestionnaire,
  };

  return (
    <QuestionnaireContext.Provider value={ctx}>
      {children(ctx)}
    </QuestionnaireContext.Provider>
  );
};

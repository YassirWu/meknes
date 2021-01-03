import React, { ReactElement } from "react";
import {
  QuestionnaireInformation,
  newQuestionnaire,
  ResultInformation,
  PageInformation,
  GlobalConfiguration,
  defaultGlobalConfiguration,
} from "./model";

type QuestionnaireContextProps = {
  questionnaire: QuestionnaireInformation;
  nextQuestion: () => void;
  previousQuestion: () => void;
  onAnswer: (idPage: number, results: ResultInformation[]) => void;
  updateQuestionnaire: (questionnaire: QuestionnaireInformation) => void;
  globalConfiguration: GlobalConfiguration;
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

type QuestionnaireProps = {
  config?: Partial<GlobalConfiguration>;
  children:
    | ((context: QuestionnaireContextProps) => ReactElement)
    | ReactElement;
};

export const Questionnaire: React.FunctionComponent<QuestionnaireProps> = ({
  children,
  config = {},
}) => {
  const { questionnaire, updateQuestionnaire } = useQuestionnaire();
  const mergedGlobalConfiguration = {
    ...defaultGlobalConfiguration,
    ...config,
  };

  const nextQuestion = () => {
    if (questionnaire.currentPage < questionnaire.pages.length - 1) {
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
    globalConfiguration: mergedGlobalConfiguration,
  };

  return (
    <QuestionnaireContext.Provider value={ctx}>
      {typeof children === "function" ? children(ctx) : children}
    </QuestionnaireContext.Provider>
  );
};

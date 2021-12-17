import React, { ReactElement } from "react";
import {
  QuestionInformation,
  PageInformation,
  GlobalConfiguration,
  defaultGlobalConfiguration,
  AnswerInformation,
} from "./model";

type QuestionnaireContextProps = {
  pages: PageInformation[];
  currentPage: number;
  nextQuestion: () => void;
  previousQuestion: () => void;
  onAnswer: (idPage: string, results: QuestionInformation[]) => void;
  addPageToQuestionnaire: (indexPage: number, idPage: string) => void;
  globalConfiguration: GlobalConfiguration;
  score: number;
  total: number;
  questions: QuestionInformation[];
  addQuestion: (
    idPage: string,
    idQuestion: string,
    coefficient: number
  ) => void;
  response: (
    idQuestion: string,
    answer: AnswerInformation<any>,
    isValid: boolean
  ) => void;
  isFinished: boolean;
};
export const QuestionnaireContext = React.createContext<
  QuestionnaireContextProps
>(undefined!);

export const useQuestionnaire = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pages, setPages] = React.useState<PageInformation[]>([]);
  const [questions, setQuestions] = React.useState<QuestionInformation[]>([]);

  const addPageToQuestionnaire = React.useCallback(
    (indexPage: number, idPage: string) => {
      setPages((prevState) => [
        ...prevState,
        {
          indexPage,
          idPage,
        },
      ]);
    },
    []
  );

  const addQuestion = React.useCallback(
    (idPage: string, idQuestion: string, coefficient: number) => {
      setQuestions((prevState) => [
        ...prevState,
        {
          idPage,
          idQuestion,
          isAnswered: false,
          coefficient,
        },
      ]);
    },
    []
  );

  const response = React.useCallback(
    (idQuestion: string, answer: AnswerInformation<any>, isValid: boolean) => {
      setQuestions((prevState) => {
        const newState = prevState.map((p) => {
          if (p.idQuestion === idQuestion) {
            return {
              ...p,
              answer,
              isAnswered: true,
              isValid,
            };
          }
          return p;
        });
        return newState;
      });
    },
    []
  );

  return {
    pages,
    setPages,
    addPageToQuestionnaire,
    questions,
    setQuestions,
    addQuestion,
    currentPage,
    setCurrentPage,
    response,
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
  const {
    pages,
    setPages,
    currentPage,
    setCurrentPage,
    addPageToQuestionnaire,
    questions,
    addQuestion,
    response,
  } = useQuestionnaire();

  const mergedGlobalConfiguration = {
    ...defaultGlobalConfiguration,
    ...config,
  };

  const score = React.useMemo(() => {
    return questions.reduce(
      (result, question) =>
        question.isValid ? result + question.coefficient : result,
      0
    );
  }, [questions]);

  const total = React.useMemo(() => {
    return questions.reduce(
      (result, question) => result + question.coefficient,
      0
    );
  }, [questions]);

  const isFinished = React.useMemo(() => questions.every((q) => q.isAnswered), [
    questions,
  ]);

  const nextQuestion = React.useCallback(() => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pages, setCurrentPage]);

  const previousQuestion = React.useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const onAnswer = React.useCallback(
    (idPage: string, results: QuestionInformation[]) => {
      const newPages = pages.map((page, i) => {
        if (page.idPage === idPage) {
          return {
            ...page,
            results,
          } as PageInformation;
        }

        return page;
      });
      setPages(newPages);
    },
    [pages, setPages]
  );

  const ctx: QuestionnaireContextProps = {
    pages,
    currentPage,
    nextQuestion,
    previousQuestion,
    onAnswer,
    addPageToQuestionnaire,
    questions,
    addQuestion,
    response,
    globalConfiguration: mergedGlobalConfiguration,
    score,
    total,
    isFinished,
  };

  return (
    <QuestionnaireContext.Provider value={ctx}>
      {typeof children === "function" ? children(ctx) : children}
    </QuestionnaireContext.Provider>
  );
};

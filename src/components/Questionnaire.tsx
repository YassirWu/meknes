import React from "react";
import clsx from "clsx";

export const QuestionHead: React.FunctionComponent = ({ children }) => {
  return <>{children}</>;
};

export const PreviousQuestion: React.FunctionComponent = ({ children }) => {
  const { userResponse } = React.useContext(QcmContext);
  const { previousQuestion } = React.useContext(QuestionnaireContext);

  return (
    <button disabled={userResponse === undefined} onClick={previousQuestion}>
      {children}
    </button>
  );
};

export const NextQuestion: React.FunctionComponent = ({ children }) => {
  const { userResponse } = React.useContext(QcmContext);
  const { nextQuestion } = React.useContext(QuestionnaireContext);

  return (
    <button disabled={userResponse === undefined} onClick={nextQuestion}>
      {children}
    </button>
  );
};

type AnswerProps = {
  idResponse: number;
  isValid?: boolean;
};

export const Answer: React.FunctionComponent<AnswerProps> = ({
  idResponse,
  isValid = false,
  children,
}) => {
  const { userResponse, validateAnswer } = React.useContext(QcmContext);

  const className = clsx({
    answer: true,
    "answer--disabled": userResponse !== undefined,
    "answer--wrong":
      userResponse !== undefined &&
      idResponse === userResponse &&
      isValid === false,
    "answer--good": userResponse !== undefined && isValid === true,
  });

  return (
    <button
      disabled={userResponse !== undefined}
      onClick={() => {
        validateAnswer(idResponse, isValid);
      }}
      className={className}
    >
      {children}
    </button>
  );
};

type QcmContextProps = {
  userResponse?: number;
  validateAnswer: (idResponse: number, isValid: boolean) => void;
};
const QcmContext = React.createContext<QcmContextProps>({
  validateAnswer: () => {},
});

type QcmProps = {};

export const Qcm: React.FunctionComponent<QcmProps> = ({ children }) => {
  const [userResponse, setUserResponse] = React.useState<any>(undefined);

  const { onAnswer } = React.useContext(QuestionnaireContext);

  return (
    <QcmContext.Provider
      value={{
        validateAnswer: (userResponse, isValid) => {
          setUserResponse(userResponse);
          onAnswer(userResponse, isValid);
        },
        userResponse,
      }}
    >
      {children}
    </QcmContext.Provider>
  );
};

export const QuestionnairePage: React.FunctionComponent = ({ children }) => {
  return <>{children}</>;
};

type BlocQuestionProps = {
  current: boolean;
};
export const BlocQuestion: React.FunctionComponent<BlocQuestionProps> = ({
  current,
  children,
}) => {
  return <div style={{ display: !current ? "none" : "block" }}>{children}</div>;
};

type QuestionnaireContextProps = {
  questionnaire: QuestionnaireInformation;
  nextQuestion: () => void;
  previousQuestion: () => void;
  onAnswer: (idResponse: number, isValid: boolean) => void;
};
const QuestionnaireContext = React.createContext<QuestionnaireContextProps>({
  questionnaire: {
    results: [],
    numberOfQuestion: 0,
    score: 0,
    currentQuestion: 0,
    currentPage: 0,
  },
  nextQuestion: () => {},
  previousQuestion: () => {},
  onAnswer: () => {},
});

function initQuestionnaire(
  children: React.ReactNode
): QuestionnaireInformation {
  const results: any[] =
    React.Children.map(children, (child, i) => {
      return {
        idQuestion: i,
        userAnswer: undefined,
        isValid: undefined,
      };
    }) || [];

  const questionnaire: QuestionnaireInformation = {
    results,
    numberOfQuestion: results.length,
    score: 0,
    currentQuestion: 0,
    currentPage: 0,
  };

  return questionnaire;
}

export type QuestionnaireInformation = {
  results: any[];
  numberOfQuestion: number;
  score: number;
  currentQuestion: number;
  currentPage: number;
};

type AnswerInformation = {
  userResponse: number;
  isValid: boolean;
};

export const useQuestionnaire = () => {
  const initialQuestionnaire = {
    results: [],
    score: 0,
    numberOfQuestion: 0,
    currentQuestion: 0,
    currentPage: 0,
  };
  const [questionnaire, setQuestionnaire] = React.useState<
    QuestionnaireInformation
  >(initialQuestionnaire);

  return {
    questionnaire,
    updateQuestionnaire: setQuestionnaire,
  };
};

type QuestionnaireProps = {
  questionnaire: QuestionnaireInformation;
  onUpdateQuestionnaire: (questionnaire: QuestionnaireInformation) => void;
  onAnswer?: (
    answer: AnswerInformation,
    questionnaire: QuestionnaireInformation,
    nextQuestion: () => void
  ) => void;
};

export const Questionnaire: React.FunctionComponent<QuestionnaireProps> = ({
  questionnaire,
  onUpdateQuestionnaire,
  onAnswer,
  children,
}) => {
  React.useEffect(() => {
    onUpdateQuestionnaire(initQuestionnaire(children));
  }, []);

  const nextQuestion = () => {
    if (questionnaire.currentPage < questionnaire.numberOfQuestion - 1) {
      onUpdateQuestionnaire({
        ...questionnaire,
        currentPage: questionnaire.currentPage + 1,
      });
    }
  };
  const previousQuestion = () => {
    if (questionnaire.currentPage > 0) {
      onUpdateQuestionnaire({
        ...questionnaire,
        currentPage: questionnaire.currentPage - 1,
      });
    }
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        questionnaire,
        nextQuestion,
        previousQuestion,
        onAnswer: (userResponse, isValid) => {
          const results = questionnaire.results.map((result, i) => {
            if (i === questionnaire.currentPage) {
              return {
                ...result,
                userAnswer: userResponse,
                isValid,
              };
            }

            return result;
          });
          const newQuestionnaire: QuestionnaireInformation = {
            ...questionnaire,
            results,
            score: results
              .filter((r) => r.userAnswer !== undefined)
              .reduce(
                (score, result) => (result.isValid ? score + 1 : score),
                0
              ),
          };

          onUpdateQuestionnaire(newQuestionnaire);

          onAnswer &&
            onAnswer({ userResponse, isValid }, newQuestionnaire, nextQuestion);
        },
      }}
    >
      {React.Children.map(children, (child, i) => {
        return (
          <BlocQuestion current={questionnaire.currentPage === i}>
            {child}
          </BlocQuestion>
        );
      })}
    </QuestionnaireContext.Provider>
  );
};

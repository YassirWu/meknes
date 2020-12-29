import React from "react";
import {
  QuestionnaireInformation,
  newQuestionnaire,
  AnswerInformation,
  ResultInformation,
} from "./model";

export const QuestionnairePage: React.FunctionComponent = ({ children }) => {
  return <>{children}</>;
};

type QuestionnairePageContainerProps = {
  current: boolean;
};
export const QuestionnairePageContainer: React.FunctionComponent<QuestionnairePageContainerProps> = ({
  current,
  children,
}) => {
  return <div style={{ display: !current ? "none" : "block" }}>{children}</div>;
};

type QuestionnaireContextProps = {
  questionnaire: QuestionnaireInformation;
  nextQuestion: () => void;
  previousQuestion: () => void;
  onAnswer: (answer: AnswerInformation) => void;
  updateQuestionnaire: (questionnaire: QuestionnaireInformation) => void;
};
export const QuestionnaireContext = React.createContext<
  QuestionnaireContextProps
>({
  questionnaire: newQuestionnaire(),
  nextQuestion: () => {},
  previousQuestion: () => {},
  onAnswer: () => {},
  updateQuestionnaire: () => {},
});

function initQuestionnaire(
  questionnaire: QuestionnaireInformation,
  children: React.ReactNode
): QuestionnaireInformation {
  const results: ResultInformation[] =
    React.Children.map(children, (child, i) => {
      return {
        idQuestion: i,
        answer: undefined,
        isAnswered: false,
      };
    }) || [];

  return {
    ...questionnaire,
    results,
    numberOfQuestion: results.length,
  }
}

export const useQuestionnaire = () => {
  const [questionnaire, setQuestionnaire] = React.useState<
    QuestionnaireInformation
  >(newQuestionnaire());

  return {
    questionnaire,
    updateQuestionnaire: setQuestionnaire,
  };
};

export const QuestionnairePages: React.FunctionComponent = ({ children }) => {
  const { questionnaire, updateQuestionnaire } = React.useContext(QuestionnaireContext);

  React.useEffect(() => {
    updateQuestionnaire(initQuestionnaire(questionnaire, children));
  }, []);

  return (
    <>
      {React.Children.map(children, (child, i) => {
        return (
          <QuestionnairePageContainer current={questionnaire.currentPage === i}>
            {child}
          </QuestionnairePageContainer>
        );
      })}
    </>
  )
}

type QuestionnaireProps = {
  onAnswer?: (
    answer: AnswerInformation,
    questionnaire: QuestionnaireInformation,
    nextQuestion: () => void
  ) => void;
};

export const Questionnaire: React.FunctionComponent<QuestionnaireProps> = ({
  onAnswer,
  children,
}) => {
  const { questionnaire, updateQuestionnaire } = useQuestionnaire();

  const nextQuestion = () => {
    if (questionnaire.currentPage < questionnaire.numberOfQuestion - 1) {
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
    onAnswer: (answer) => {
      const results = questionnaire.results.map((result, i) => {
        if (i === questionnaire.currentPage) {
          return {
            ...result,
            answer,
            isAnswered: true,
          };
        }

        return result;
      });
      const newQuestionnaire: QuestionnaireInformation = {
        ...questionnaire,
        results,
        score: results
          .filter((r) => r.isAnswered)
          .reduce(
            (score, result) => (result.answer?.isValid ? score + 1 : score),
            0
          ),
      };

      updateQuestionnaire(newQuestionnaire);

      onAnswer && onAnswer(answer, newQuestionnaire, nextQuestion);
    },
    updateQuestionnaire,
  };

  return (
    <QuestionnaireContext.Provider value={ctx}>
      {children(ctx)}
    </QuestionnaireContext.Provider>
  );
};

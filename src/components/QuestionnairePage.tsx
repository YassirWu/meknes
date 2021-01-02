import React from 'react';

import {
  QuestionnaireInformation,
  PageInformation,
  ResultInformation,
  AnswerInformation,
} from "./model";
import { QuestionnaireContext } from './Questionnaire';

export const QuestionnairePage: React.FunctionComponent = ({ children }) => {
  return <>{children}</>;
};

type QuestionnairePageContextProps = {
  results: ResultInformation[],
  setResults: (results: ResultInformation[]) => void,
  addQuestion: (idQuestion: string) => void,
  response: (idQuestion: string, answer: AnswerInformation) => void;
}

export const QuestionnairePageContext = React.createContext<QuestionnairePageContextProps>(undefined!);

type QuestionnairePageContainerProps = {
  current: boolean;
  idPage: number;
};
export const QuestionnairePageContainer: React.FunctionComponent<QuestionnairePageContainerProps> = ({
  current,
  idPage,
  children,
}) => {
  const [results, setResults] = React.useState<ResultInformation[]>([]);
  const { onAnswer } = React.useContext(QuestionnaireContext);

  React.useEffect(() => {
    if (results.every(q => q.isAnswered)) {
      onAnswer(idPage, results);
    }
  }, [results])

  return (
    <QuestionnairePageContext.Provider
      value={{
        results,
        setResults,
        addQuestion: (idQuestion) => {
          setResults(prevState => [...prevState, {
            idQuestion,
            isAnswered: false,
          }]);
        },
        response: (idQuestion, answer) => {
          setResults(prevState => {
            const newState = prevState.map(p => {
              if (p.idQuestion === idQuestion) {
                return {
                  ...p,
                  answer,
                  isAnswered: true,
                }
              }
              return p;
            });
            return newState;
          });
        }
      }}
    >
      <div style={{ display: !current ? "none" : "block" }}>
        {children}
      </div>
    </QuestionnairePageContext.Provider>
  );
};

function initQuestionnaire(
  questionnaire: QuestionnaireInformation,
  children: React.ReactNode
): QuestionnaireInformation {
  const pages: PageInformation[] = React.Children.map(children, (child, i) => {
    return {
      idPage: i,
      results: [],
    };
  }) || [];

  return {
    ...questionnaire,
    pages,
    numberOfPage: pages.length,
  }
}

export const QuestionnairePages: React.FunctionComponent = ({ children }) => {
  const { questionnaire, updateQuestionnaire } = React.useContext(QuestionnaireContext);

  React.useEffect(() => {
    updateQuestionnaire(initQuestionnaire(questionnaire, children));
  }, []);

  return (
    <>
      {React.Children.map(children, (child, i) => {
        const idPage = i;
        return (
          <QuestionnairePageContainer current={questionnaire.currentPage === i} idPage={idPage}>
            {child}
          </QuestionnairePageContainer>
        );
      })}
    </>
  )
}

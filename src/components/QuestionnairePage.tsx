import React from "react";

import { QuestionnaireContext } from "./Questionnaire";
import { getUniqId, useQuestionsOfByIdPage } from "./utils";

export const QuestionnairePage: React.FunctionComponent = ({ children }) => {
  return <>{children}</>;
};

type QuestionnairePageContextProps = {
  idPage: string;
  current: boolean;
};

export const QuestionnairePageContext = React.createContext<
  QuestionnairePageContextProps
>(undefined!);

type QuestionnairePageContainerProps = {
  current: boolean;
  indexPage: number;
};
export const QuestionnairePageContainer: React.FunctionComponent<QuestionnairePageContainerProps> = ({
  current,
  indexPage,
  children,
}) => {
  const [idPage] = React.useState(getUniqId());
  const { onAnswer, addPageToQuestionnaire } = React.useContext(
    QuestionnaireContext
  );
  const questions = useQuestionsOfByIdPage(idPage);

  React.useEffect(() => {
    addPageToQuestionnaire(indexPage, idPage);
  }, [indexPage, idPage, addPageToQuestionnaire]);

  React.useEffect(() => {
    if (questions.length > 0 && questions.every((q) => q.isAnswered)) {
      onAnswer(idPage, questions);
    }
  }, [questions, idPage]);

  return (
    <QuestionnairePageContext.Provider value={{ idPage, current }}>
      <div style={{ display: !current ? "none" : "block" }}>{children}</div>
    </QuestionnairePageContext.Provider>
  );
};

export const QuestionnairePages: React.FunctionComponent = ({ children }) => {
  const { currentPage } = React.useContext(QuestionnaireContext);

  return (
    <>
      {React.Children.map(children, (child, i) => {
        const indexPage = i;
        return (
          <QuestionnairePageContainer
            key={indexPage}
            current={currentPage === indexPage}
            indexPage={indexPage}
          >
            {child}
          </QuestionnairePageContainer>
        );
      })}
    </>
  );
};

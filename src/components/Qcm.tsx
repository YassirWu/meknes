import React from "react";
import clsx from "clsx";
import { QuestionnairePageContext } from "./QuestionnairePage";
import { AnswerInformation } from "./model";
import { getUniqId } from "./utils";

type QcmContextProps = {
  answer?: AnswerInformation;
  validateAnswer: (userAnswer: any, isValid: boolean) => void;
};
const QcmContext = React.createContext<QcmContextProps>(undefined!);

type QcmAnswerProps = {
  idResponse: number;
  isValid?: boolean;
};

export const QcmAnswer: React.FunctionComponent<QcmAnswerProps> = ({
  idResponse,
  isValid = false,
  children,
}) => {
  const { answer, validateAnswer } = React.useContext(QcmContext);

  const isAnswered = answer?.userResponse !== undefined;
  const isUserAnswer = isAnswered && idResponse === answer?.userResponse;

  const className = clsx({
    answer: true,
    "answer--disabled": isAnswered,
    "answer--wrong": isUserAnswer && !isValid,
    "answer--good": isAnswered && isValid,
  });

  return (
    <button
      disabled={isAnswered}
      onClick={() => validateAnswer(idResponse, isValid)}
      className={className}
    >
      {children}
    </button>
  );
};

export const Qcm: React.FunctionComponent = ({ children }) => {
  const [idQuestion] = React.useState(getUniqId());
  const [answer, setAnswer] = React.useState<AnswerInformation>();

  const { addQuestion, response } = React.useContext(QuestionnairePageContext);

  React.useEffect(() => {
    addQuestion(idQuestion)
  }, []);

  return (
    <QcmContext.Provider
      value={{
        validateAnswer: (userResponse, isValid) => {
          const updatedAnswer = { userResponse, isValid };
          setAnswer(updatedAnswer);
          response(idQuestion, updatedAnswer)
        },
        answer,
      }}
    >
      {children}
    </QcmContext.Provider>
  );
};

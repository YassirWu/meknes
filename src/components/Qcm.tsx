import React from "react";
import clsx from "clsx";
import { QuestionnaireContext } from "./Questionnaire";
import { AnswerInformation } from "./model";

type QcmAnswerInformation = AnswerInformation & {
  userResponse: number;
};

type QcmAnswerProps = {
  idResponse: number;
  isValid?: boolean;
};

export const QcmAnswer: React.FunctionComponent<QcmAnswerProps> = ({
  idResponse,
  isValid = false,
  children,
}) => {
  const { userResponse, validateAnswer } = React.useContext(QcmContext);

  const isAnswered = userResponse !== undefined;
  const isUserAnswer = isAnswered && idResponse === userResponse;

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

type QcmContextProps = {
  userResponse?: number;
  validateAnswer: (idResponse: number, isValid: boolean) => void;
};
const QcmContext = React.createContext<QcmContextProps>({
  validateAnswer: () => {},
});

export const Qcm: React.FunctionComponent = ({ children }) => {
  const [userResponse, setUserResponse] = React.useState<any>(undefined);

  const { onAnswer } = React.useContext(QuestionnaireContext);

  return (
    <QcmContext.Provider
      value={{
        validateAnswer: (userResponse, isValid) => {
          setUserResponse(userResponse);
          onAnswer({ userResponse, isValid } as QcmAnswerInformation);
        },
        userResponse,
      }}
    >
      {children}
    </QcmContext.Provider>
  );
};

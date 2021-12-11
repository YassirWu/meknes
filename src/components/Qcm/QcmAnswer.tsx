import React from "react";
import clsx from "clsx";
import QcmContext from "./QcmContext";
import { QuestionnairePageContext } from "../QuestionnairePage";

const useQcmAnswerClassNames = ({
  idResponse,
  isValid = false,
}: QcmAnswerProps) => {
  const { answer, config, isSubmittingQcm } = React.useContext(QcmContext);

  const { showResultAfterResponse } = config;

  const isAnswered = answer.userResponse.length > 0;
  const isUserAnswer = isAnswered && answer.userResponse.includes(idResponse);

  const classes: { [key: string]: boolean } = {
    "meknes-answer": true,
    "meknes-answer--disabled": isSubmittingQcm,
    "meknes-answer--user": isUserAnswer,
  };

  if (showResultAfterResponse) {
    classes["meknes-answer--wrong"] =
      isSubmittingQcm && isUserAnswer && !isValid;
    classes["meknes-answer--good"] = isSubmittingQcm && isAnswered && isValid;
  }

  return clsx(classes);
};

type QcmAnswerProps = {
  idResponse: number;
  isValid?: boolean;
};

const QcmAnswer: React.FunctionComponent<QcmAnswerProps> = ({
  idResponse,
  isValid = false,
  children,
}) => {
  const { onAnswer, isSubmittingQcm, declareAnswer } = React.useContext(
    QcmContext
  );
  const { current } = React.useContext(QuestionnairePageContext);

  const classNames = useQcmAnswerClassNames({ idResponse, isValid });

  React.useEffect(() => {
    if (isValid) {
      declareAnswer(idResponse, isValid);
    }
  }, [idResponse, isValid]);

  if (!current) {
    return null;
  }

  return (
    <button
      disabled={isSubmittingQcm}
      onClick={() => onAnswer(idResponse)}
      className={classNames}
    >
      {children}
    </button>
  );
};

export default QcmAnswer;

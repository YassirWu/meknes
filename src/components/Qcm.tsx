import React from "react";
import clsx from "clsx";
import { QuestionnairePageContext } from "./QuestionnairePage";
import { AnswerInformation, GlobalConfiguration } from "./model";
import { getUniqId } from "./utils";
import { QuestionnaireContext } from "./Questionnaire";

type QcmConfiguration = GlobalConfiguration;

type QcmContextProps = {
  answer?: AnswerInformation;
  isSubmittingQcm: boolean;
  submitAnswer: () => void;
  onAnswer: (userAnswer: any, isValid: boolean) => void;
  config: QcmConfiguration;
};
const QcmContext = React.createContext<QcmContextProps>(undefined!);

export const ValidAnswer: React.FunctionComponent = ({ children }) => {
  const {
    submitAnswer,
    isSubmittingQcm,
    config: { validOnSelect },
  } = React.useContext(QcmContext);

  const isDisabled = validOnSelect || isSubmittingQcm;

  return (
    <button onClick={() => submitAnswer()} disabled={isDisabled}>
      {children}
    </button>
  );
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
  const { answer, onAnswer, config, isSubmittingQcm } = React.useContext(
    QcmContext
  );

  const { showResultAfterResponse } = config;

  const isAnswered = answer?.userResponse !== undefined;
  const isUserAnswer = isAnswered && idResponse === answer?.userResponse;

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

  return (
    <button
      disabled={isSubmittingQcm}
      onClick={() => onAnswer(idResponse, isValid)}
      className={clsx(classes)}
    >
      {children}
    </button>
  );
};

type QcmProps = {
  config?: Partial<QcmConfiguration>;
};

export const Qcm: React.FunctionComponent<QcmProps> = ({
  children,
  config = {},
}) => {
  const [idQuestion] = React.useState(getUniqId());
  const [answer, setAnswer] = React.useState<AnswerInformation>();
  const [isSubmittingQcm, setIsSubmittingQcm] = React.useState(false);

  const { addQuestion, response } = React.useContext(QuestionnairePageContext);
  const { globalConfiguration } = React.useContext(QuestionnaireContext);

  React.useEffect(() => {
    addQuestion(idQuestion);
  }, []);

  const mergedQcmConfiguration = {
    ...globalConfiguration,
    ...config,
  };

  const submitQcm = (answer: AnswerInformation) => {
    setIsSubmittingQcm(true);
    response(idQuestion, answer);
  };

  const onAnswer = (userResponse: AnswerInformation, isValid: boolean) => {
    const updatedAnswer = { userResponse, isValid };
    setAnswer(updatedAnswer);
    if (mergedQcmConfiguration.validOnSelect) {
      submitQcm(updatedAnswer);
    }
  };

  const submitAnswer = () => {
    if (answer) {
      submitQcm(answer);
    }
  };

  return (
    <QcmContext.Provider
      value={{
        onAnswer,
        submitAnswer,
        answer,
        config: mergedQcmConfiguration,
        isSubmittingQcm,
      }}
    >
      {children}
    </QcmContext.Provider>
  );
};

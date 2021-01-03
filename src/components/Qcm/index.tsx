import React from "react";
import { QuestionnairePageContext } from "../QuestionnairePage";
import { AnswerInformation } from "../model";
import { getUniqId } from "../utils";
import { QuestionnaireContext } from "../Questionnaire";
import QcmContext, {
  defaultQcmConfiguration,
  QcmConfiguration,
} from "./QcmContext";

type QcmProps = {
  config?: Partial<QcmConfiguration>;
};

const useQcmInit = (config: Partial<QcmConfiguration>) => {
  const [idQuestion] = React.useState(getUniqId());
  const { globalConfiguration } = React.useContext(QuestionnaireContext);
  const { addQuestion } = React.useContext(QuestionnairePageContext);

  const mergedQcmConfiguration = {
    ...defaultQcmConfiguration,
    ...globalConfiguration,
    ...config,
  };

  React.useEffect(() => {
    addQuestion(idQuestion, mergedQcmConfiguration.coefficient);
  }, []);

  return { idQuestion, mergedQcmConfiguration };
};

export const Qcm: React.FunctionComponent<QcmProps> = ({
  children,
  config = {},
}) => {
  const { idQuestion, mergedQcmConfiguration } = useQcmInit(config);
  const [answer, setAnswer] = React.useState<AnswerInformation<number[]>>({
    userResponse: [],
  });
  const [goodAnswers, setGoodAnswers] = React.useState<number[]>([]);
  const [isSubmittingQcm, setIsSubmittingQcm] = React.useState(false);

  const { response } = React.useContext(QuestionnairePageContext);

  const submitQcm = (answer: AnswerInformation<number[]>) => {
    const isValid = config.multiple
      ? goodAnswers.length === answer.userResponse.length &&
        goodAnswers.every((g) => answer.userResponse.includes(g))
      : goodAnswers.includes(answer.userResponse?.[0]);

    setIsSubmittingQcm(true);
    response(idQuestion, answer, isValid);
  };

  const onAnswer = (value: number) => {
    // remove response
    if (answer.userResponse.includes(value)) {
      setAnswer((prevState) => ({
        ...prevState,
        userResponse: answer.userResponse.filter((u) => u !== value),
      }));
      return;
    }

    const updatedAnswer = {
      userResponse: config.multiple ? [...answer.userResponse, value] : [value],
    };

    setAnswer(updatedAnswer);
    if (
      mergedQcmConfiguration.validOnSelect &&
      !mergedQcmConfiguration.multiple
    ) {
      submitQcm(updatedAnswer);
    }
  };

  const submitAnswer = () => {
    if (answer) {
      submitQcm(answer);
    }
  };

  const declareAnswer = (newAnswer: number, isValid: boolean) => {
    if (isValid) {
      setGoodAnswers((prevState) => [...prevState, newAnswer]);
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
        declareAnswer,
      }}
    >
      {children}
    </QcmContext.Provider>
  );
};

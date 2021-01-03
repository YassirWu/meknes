import { createContext } from "react";
import {
  AnswerInformation,
  defaultGlobalConfiguration,
  GlobalConfiguration,
} from "../model";

export type QcmConfiguration = GlobalConfiguration & {
  multiple: boolean;
};

export const defaultQcmConfiguration = {
  ...defaultGlobalConfiguration,
  multiple: false,
};

type QcmContextProps = {
  answer: AnswerInformation<number[]>;
  isSubmittingQcm: boolean;
  submitAnswer: () => void;
  onAnswer: (userAnswer: number) => void;
  config: QcmConfiguration;
  declareAnswer: (newAnswer: number, isValid: boolean) => void;
};
const QcmContext = createContext<QcmContextProps>(undefined!);

export default QcmContext;

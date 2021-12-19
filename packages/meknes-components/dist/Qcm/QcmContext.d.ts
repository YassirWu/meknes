/// <reference types="react" />
import { AnswerInformation, GlobalConfiguration } from "../model";
export declare type QcmConfiguration = GlobalConfiguration & {
    multiple: boolean;
    coefficient: number;
};
export declare const defaultQcmConfiguration: QcmConfiguration;
declare type QcmContextProps = {
    answer: AnswerInformation<number[]>;
    isSubmittingQcm: boolean;
    submitAnswer: () => void;
    onAnswer: (userAnswer: number) => void;
    config: QcmConfiguration;
    declareAnswer: (newAnswer: number, isValid: boolean) => void;
};
declare const QcmContext: import("react").Context<QcmContextProps>;
export default QcmContext;

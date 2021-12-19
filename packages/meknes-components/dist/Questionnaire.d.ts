import React, { ReactElement } from "react";
import { QuestionInformation, PageInformation, GlobalConfiguration, AnswerInformation } from "./model";
declare type QuestionnaireContextProps = {
    pages: PageInformation[];
    currentPage: number;
    nextQuestion: () => void;
    previousQuestion: () => void;
    onAnswer: (idPage: string, results: QuestionInformation[]) => void;
    addPageToQuestionnaire: (indexPage: number, idPage: string) => void;
    globalConfiguration: GlobalConfiguration;
    score: number;
    total: number;
    questions: QuestionInformation[];
    addQuestion: (idPage: string, idQuestion: string, coefficient: number) => void;
    response: (idQuestion: string, answer: AnswerInformation<any>, isValid: boolean) => void;
    isFinished: boolean;
};
export declare const QuestionnaireContext: React.Context<QuestionnaireContextProps>;
export declare const useQuestionnaire: () => {
    pages: PageInformation[];
    setPages: React.Dispatch<React.SetStateAction<PageInformation[]>>;
    addPageToQuestionnaire: (indexPage: number, idPage: string) => void;
    questions: QuestionInformation[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionInformation[]>>;
    addQuestion: (idPage: string, idQuestion: string, coefficient: number) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    response: (idQuestion: string, answer: AnswerInformation<any>, isValid: boolean) => void;
};
declare type QuestionnaireProps = {
    config?: Partial<GlobalConfiguration>;
    children: ((context: QuestionnaireContextProps) => ReactElement) | ReactElement;
};
export declare const Questionnaire: React.FunctionComponent<QuestionnaireProps>;
export {};

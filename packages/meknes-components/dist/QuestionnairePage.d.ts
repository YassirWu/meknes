import React from "react";
export declare const QuestionnairePage: React.FunctionComponent;
declare type QuestionnairePageContextProps = {
    idPage: string;
    current: boolean;
};
export declare const QuestionnairePageContext: React.Context<QuestionnairePageContextProps>;
declare type QuestionnairePageContainerProps = {
    current: boolean;
    indexPage: number;
};
export declare const QuestionnairePageContainer: React.FunctionComponent<QuestionnairePageContainerProps>;
export declare const QuestionnairePages: React.FunctionComponent;
export {};

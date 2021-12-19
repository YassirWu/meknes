export declare type QuestionInformation = {
    idPage: string;
    idQuestion: string;
    answer?: AnswerInformation<any>;
    isAnswered: boolean;
    isValid?: boolean;
    coefficient: number;
};
export declare type PageInformation = {
    idPage: string;
    indexPage: number;
};
export declare type AnswerInformation<T> = {
    userResponse: T;
};
export declare type GlobalConfiguration = {
    validOnSelect: boolean;
    showResultAfterResponse: boolean;
};
export declare const defaultGlobalConfiguration: GlobalConfiguration;

export type QuestionInformation = {
  idPage: string;
  idQuestion: string;
  answer?: AnswerInformation<any>;
  isAnswered: boolean;
  isValid?: boolean;
  coefficient: number;
};

export type PageInformation = {
  idPage: string;
  indexPage: number;
};

export type AnswerInformation<T> = {
  userResponse: T;
};

export type GlobalConfiguration = {
  validOnSelect: boolean;
  showResultAfterResponse: boolean;
};

export const defaultGlobalConfiguration: GlobalConfiguration = {
  validOnSelect: true,
  showResultAfterResponse: true,
};

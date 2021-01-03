export type ResultInformation = {
  idQuestion: string;
  answer?: AnswerInformation<any>;
  isAnswered: boolean;
  isValid?: boolean;
};

export type PageInformation = {
  idPage: number;
  results: ResultInformation[];
};

export type QuestionnaireInformation = {
  pages: PageInformation[];
  score: number;
  currentPage: number;
};

export function newQuestionnaire(): QuestionnaireInformation {
  return {
    pages: [],
    score: 0,
    currentPage: 0,
  };
}

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

export type ResultInformation = {
  idQuestion: string;
  answer?: AnswerInformation;
  isAnswered: boolean;
};

export type PageInformation = {
  idPage: number;
  results: ResultInformation[];
}

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

export type AnswerInformation = {
  isValid: boolean;
  userResponse: any;
  // goodResponse?: any;
};

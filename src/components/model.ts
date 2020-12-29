export type ResultInformation = {
  idQuestion: number;
  answer?: AnswerInformation;
  isAnswered: boolean;
};

export type QuestionnaireInformation = {
  results: ResultInformation[];
  numberOfQuestion: number;
  score: number;
  currentPage: number;
};

export function newQuestionnaire(): QuestionnaireInformation {
  return {
    results: [],
    score: 0,
    numberOfQuestion: 0,
    currentPage: 0,
  };
}

export type AnswerInformation = {
  isValid: boolean;
};

import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  Questionnaire,
  QuestionnairePage,
  QuestionHead,
  Answer,
  Qcm,
  NextQuestion,
  PreviousQuestion,
  useQuestionnaire,
} from "./Questionnaire";

export default {
  title: "Questionnaire",
  component: Questionnaire,
} as Meta;

const Template: Story = (args) => {
  const { questionnaire, updateQuestionnaire } = useQuestionnaire();

  return (
    <>
      <p>
        Your score : {questionnaire.score}/{questionnaire.numberOfQuestion}
      </p>
      <Questionnaire
        questionnaire={questionnaire}
        onUpdateQuestionnaire={updateQuestionnaire}
      >
        <QuestionnairePage>
          <Qcm>
            <QuestionHead>Ceci est ma 1ère question</QuestionHead>
            <Answer idResponse={1}>Réponse 1</Answer>
            <Answer idResponse={2}>Réponse 2</Answer>
            <Answer idResponse={3} isValid>
              Réponse 3
            </Answer>
            <Answer idResponse={4}>Réponse 4</Answer>
            <NextQuestion>Next</NextQuestion>
          </Qcm>
        </QuestionnairePage>
        <QuestionnairePage>
          <Qcm>
            <QuestionHead>Ceci est ma deuxième question</QuestionHead>
            <p>Préçision</p>
            <PreviousQuestion>Previous</PreviousQuestion>
            <Answer idResponse={1}>Réponse 1</Answer>
            <Answer idResponse={2} isValid>
              Réponse 2
            </Answer>
            <Answer idResponse={3}>Réponse 3</Answer>
            <Answer idResponse={4}>Réponse 4</Answer>
            <NextQuestion>Next</NextQuestion>
          </Qcm>
        </QuestionnairePage>
        <QuestionnairePage>
          <Qcm>
            <QuestionHead>Ceci est ma troisième question</QuestionHead>
            <PreviousQuestion>Previous</PreviousQuestion>
            <Answer idResponse={1}>Réponse 1</Answer>
            <Answer idResponse={2}>Réponse 2</Answer>
            <Answer idResponse={3}>Réponse 3</Answer>
            <Answer idResponse={4} isValid>
              Réponse 4
            </Answer>
          </Qcm>
        </QuestionnairePage>
      </Questionnaire>
    </>
  );
};

export const Test = Template.bind({});

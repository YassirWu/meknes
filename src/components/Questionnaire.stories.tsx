import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Questionnaire } from "./Questionnaire";
import { QuestionnairePages, QuestionnairePage } from './QuestionnairePage';
import { QcmAnswer, Qcm } from "./Qcm";
import { NextQuestion, PreviousQuestion } from "./NavigationButton";

export default { title: "Questionnaire" } as Meta;

const Template: Story = (args) => {

  return (
    <>
      <Questionnaire>
        {({ questionnaire }) => {

          return (
            <>
              <p>
                Your score : {questionnaire.score}/{questionnaire.numberOfQuestion}
              </p>
              <QuestionnairePages>
                <QuestionnairePage>
                  <Qcm>
                    <p>Ceci est ma 1ère question</p>
                    <QcmAnswer idResponse={1}>Réponse 1</QcmAnswer>
                    <QcmAnswer idResponse={2}>Réponse 2</QcmAnswer>
                    <QcmAnswer idResponse={3} isValid>
                      Réponse 3
                    </QcmAnswer>
                    <QcmAnswer idResponse={4}>Réponse 4</QcmAnswer>
                    <NextQuestion>Next</NextQuestion>
                  </Qcm>
                </QuestionnairePage>
                <QuestionnairePage>
                  <PreviousQuestion>Previous</PreviousQuestion>
                  <Qcm>
                    <p>Ceci est ma deuxième question</p>
                    <QcmAnswer idResponse={1}>Réponse 1</QcmAnswer>
                    <QcmAnswer idResponse={2} isValid>
                      Réponse 2
                    </QcmAnswer>
                    <QcmAnswer idResponse={3}>Réponse 3</QcmAnswer>
                    <QcmAnswer idResponse={4}>Réponse 4</QcmAnswer>
                  </Qcm>
                  <Qcm>
                    <p>Ceci est ma deuxième question et demi</p>
                    <QcmAnswer idResponse={1}>Réponse 1</QcmAnswer>
                    <QcmAnswer idResponse={2} isValid>
                      Réponse 2
                    </QcmAnswer>
                    <QcmAnswer idResponse={3}>Réponse 3</QcmAnswer>
                    <QcmAnswer idResponse={4}>Réponse 4</QcmAnswer>
                  </Qcm>
                  <NextQuestion>Next</NextQuestion>
                </QuestionnairePage>
                <QuestionnairePage>
                  <Qcm>
                    <p>Ceci est ma troisième question</p>
                    <PreviousQuestion>Previous</PreviousQuestion>
                    <QcmAnswer idResponse={1}>Réponse 1</QcmAnswer>
                    <QcmAnswer idResponse={2}>Réponse 2</QcmAnswer>
                    <QcmAnswer idResponse={3}>Réponse 3</QcmAnswer>
                    <QcmAnswer idResponse={4} isValid>
                      Réponse 4
                    </QcmAnswer>
                  </Qcm>
                </QuestionnairePage>
              </QuestionnairePages>
            </>
          )
        }}
      </Questionnaire>
    </>
  );
};

export const Test = Template.bind({});

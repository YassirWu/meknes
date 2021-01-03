import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Questionnaire } from "../components/Questionnaire";
import {
  QuestionnairePages,
  QuestionnairePage,
} from "../components/QuestionnairePage";
import { QcmAnswer, Qcm, ValidAnswer } from "../components/Qcm";
import { NextQuestion, PreviousQuestion } from "../components/NavigationButton";
import { CustomPage, CustomQcm } from "./utils";

const customPages: CustomPage[] = [
  {
    customQcm: [
      {
        text: "Ceci est ma 1ère question",
        responses: [
          { id: 1, text: "Réponse 1" },
          { id: 2, text: "Réponse 2" },
          { id: 3, text: "Réponse 3", isValid: true },
          { id: 4, text: "Réponse 4" },
        ],
      },
    ],
  },
  {
    customQcm: [
      {
        text: "Ceci est ma deuxième question",
        responses: [
          { id: 1, text: "Réponse 1" },
          { id: 2, text: "Réponse 2", isValid: true },
          { id: 3, text: "Réponse 3" },
          { id: 4, text: "Réponse 4" },
        ],
      },
      {
        text: "Ceci est ma troisième question",
        responses: [
          { id: 1, text: "Réponse 1" },
          { id: 2, text: "Réponse 2" },
          { id: 3, text: "Réponse 3" },
          { id: 4, text: "Réponse 4", isValid: true },
        ],
      },
    ],
  },
  {
    customQcm: [
      {
        text: "Ceci est ma quatrième question",
        responses: [
          { id: 1, text: "Réponse 1", isValid: true },
          { id: 2, text: "Réponse 2" },
          { id: 3, text: "Réponse 3" },
          { id: 4, text: "Réponse 4" },
        ],
      },
    ],
  },
];

type CustomQcmProps = {
  customQcm: CustomQcm;
};

function CustomQcmComponent({ customQcm }: CustomQcmProps) {
  return (
    <Qcm config={{}}>
      <p>{customQcm.text}</p>
      <div className="story-meknes-qcm-questions">
        {customQcm.responses.map((r) => (
          <QcmAnswer key={r.id} idResponse={r.id} isValid={r.isValid}>
            {r.text}
          </QcmAnswer>
        ))}
      </div>
      <ValidAnswer>Valider</ValidAnswer>
    </Qcm>
  );
}

const Template: Story = (args) => {
  return (
    <>
      <Questionnaire
        config={{ validOnSelect: true, showResultAfterResponse: true }}
      >
        {({ questionnaire }) => {
          return (
            <>
              <p>
                {questionnaire.currentPage + 1}/{questionnaire.pages.length}
              </p>
              <QuestionnairePages>
                {customPages.map((page, i) => (
                  <QuestionnairePage>
                    <div className="story-meknes-page">
                      {page.customQcm.map((qcm) => (
                        <CustomQcmComponent customQcm={qcm} />
                      ))}
                      <div className="story-meknes-qcm-actions">
                        {i > 0 && <PreviousQuestion>Previous</PreviousQuestion>}
                        {i < customPages.length - 1 && (
                          <NextQuestion>Next</NextQuestion>
                        )}
                      </div>
                    </div>
                  </QuestionnairePage>
                ))}
              </QuestionnairePages>
            </>
          );
        }}
      </Questionnaire>
    </>
  );
};

export default { title: "Questionnaire/Simple QCM with single choice" } as Meta;

export const Test = Template.bind({});

import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Questionnaire } from "../components/Questionnaire";
import { QuestionnairePages } from "../components/QuestionnairePage";
import { QcmAnswer, Qcm, ValidAnswer } from "../components/Qcm";
import {
  defaultGlobalConfiguration,
  GlobalConfiguration,
} from "../components/model";

type TemplateArgs = {
  config?: Partial<GlobalConfiguration>;
};

const Template: Story<TemplateArgs> = ({ config }) => {
  return (
    <Questionnaire config={config && { ...config }}>
      <QuestionnairePages>
        <Qcm>
          <p>This is my question</p>
          <QcmAnswer idResponse={1}>First answer</QcmAnswer>
          <QcmAnswer idResponse={2}>Second answer</QcmAnswer>
          <QcmAnswer idResponse={3} isValid>
            Third answer
          </QcmAnswer>
          <QcmAnswer idResponse={4}>Fourth answer</QcmAnswer>

          <ValidAnswer>Validate answer</ValidAnswer>
        </Qcm>
      </QuestionnairePages>
    </Questionnaire>
  );
};

export default {
  title: "Qcm/Use Cases",
  argTypes: { config: { control: { type: "object" } } },
} as Meta;

export const DefaultValues = Template.bind({});
DefaultValues.storyName = "Qcm with default values";
DefaultValues.args = { config: defaultGlobalConfiguration };

export const ValidOnSelectAndShowResult = Template.bind({});
ValidOnSelectAndShowResult.storyName = "Valid on select and show result";
ValidOnSelectAndShowResult.args = {
  config: {
    validOnSelect: true,
    showResultAfterResponse: true,
  },
};

export const ValidOnSelectAndDoesntShowResult = Template.bind({});
ValidOnSelectAndDoesntShowResult.storyName =
  "Valid on select and doesn't show result";
ValidOnSelectAndDoesntShowResult.args = {
  config: {
    validOnSelect: true,
    showResultAfterResponse: false,
  },
};

export const DoesntValidOnSelectAndShowResult = Template.bind({});
DoesntValidOnSelectAndShowResult.storyName =
  "Doesn't valid on select and show result";
DoesntValidOnSelectAndShowResult.args = {
  config: {
    validOnSelect: false,
    showResultAfterResponse: true,
  },
};

export const DoesntValidOnSelectAndDoesntShowResult = Template.bind({});
DoesntValidOnSelectAndDoesntShowResult.storyName =
  "Doesn't valid on select and doesn't show result";
DoesntValidOnSelectAndDoesntShowResult.args = {
  config: {
    validOnSelect: false,
    showResultAfterResponse: false,
  },
};

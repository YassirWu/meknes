import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Questionnaire } from "../components/Questionnaire";
import { QuestionnairePages } from "../components/QuestionnairePage";
import Qcm from "../components/Qcm";
import {
  defaultGlobalConfiguration,
  GlobalConfiguration,
} from "../components/model";
import QcmAnswer from "../components/Qcm/QcmAnswer";
import ValidQcmAnswer from "../components/Qcm/ValidQcmAnswer";
import {
  defaultQcmConfiguration,
  QcmConfiguration,
} from "../components/Qcm/QcmContext";

type TemplateArgs = {
  globalConfig?: Partial<GlobalConfiguration>;
  qcmConfig?: Partial<QcmConfiguration>;
};

const Template: Story<TemplateArgs> = ({ globalConfig, qcmConfig }) => {
  return (
    <Questionnaire config={globalConfig}>
      <QuestionnairePages>
        <Qcm config={qcmConfig}>
          <p>This is my question</p>
          <QcmAnswer idResponse={1}>First answer</QcmAnswer>
          <QcmAnswer idResponse={2}>Second answer</QcmAnswer>
          <QcmAnswer idResponse={3} isValid>
            Third answer
          </QcmAnswer>
          <QcmAnswer idResponse={4}>Fourth answer</QcmAnswer>

          <ValidQcmAnswer>Validate answer</ValidQcmAnswer>
        </Qcm>
      </QuestionnairePages>
    </Questionnaire>
  );
};

export default {
  title: "Qcm/Use Cases",
  argTypes: { globalConfig: { control: { type: "object" } } },
} as Meta;

export const DefaultValues = Template.bind({});
DefaultValues.storyName = "Qcm with default values";
DefaultValues.args = {
  globalConfig: defaultGlobalConfiguration,
  qcmConfig: defaultQcmConfiguration,
};

export const ValidOnSelectAndShowResult = Template.bind({});
ValidOnSelectAndShowResult.storyName = "Valid on select and show result";
ValidOnSelectAndShowResult.args = {
  globalConfig: {
    validOnSelect: true,
    showResultAfterResponse: true,
  },
};

export const ValidOnSelectAndDoesntShowResult = Template.bind({});
ValidOnSelectAndDoesntShowResult.storyName =
  "Valid on select and doesn't show result";
ValidOnSelectAndDoesntShowResult.args = {
  globalConfig: {
    validOnSelect: true,
    showResultAfterResponse: false,
  },
};

export const DoesntValidOnSelectAndShowResult = Template.bind({});
DoesntValidOnSelectAndShowResult.storyName =
  "Doesn't valid on select and show result";
DoesntValidOnSelectAndShowResult.args = {
  globalConfig: {
    validOnSelect: false,
    showResultAfterResponse: true,
  },
};

export const DoesntValidOnSelectAndDoesntShowResult = Template.bind({});
DoesntValidOnSelectAndDoesntShowResult.storyName =
  "Doesn't valid on select and doesn't show result";
DoesntValidOnSelectAndDoesntShowResult.args = {
  globalConfig: {
    validOnSelect: false,
    showResultAfterResponse: false,
  },
};

export const MultipleChoice = Template.bind({});
MultipleChoice.storyName = "Multiple choices";
MultipleChoice.args = {
  globalConfig: {
    validOnSelect: false,
    showResultAfterResponse: true,
  },
  qcmConfig: {
    multiple: true,
  },
};

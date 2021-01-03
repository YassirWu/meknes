import { QcmConfiguration } from "../components/Qcm/QcmContext";

export type CustomQcm = {
  text: string;
  responses: {
    id: any;
    text: string;
    isValid?: boolean;
  }[];
  config?: Partial<QcmConfiguration>;
};

export type CustomPage = {
  customQcm: CustomQcm[];
};

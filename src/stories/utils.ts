export type CustomQcm = {
  text: string;
  responses: {
    id: any;
    text: string;
    isValid?: boolean;
  }[];
  multiple?: boolean;
};

export type CustomPage = {
  customQcm: CustomQcm[];
};

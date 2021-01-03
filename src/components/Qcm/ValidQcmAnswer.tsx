import React from "react";
import QcmContext from "./QcmContext";

const ValidQcmAnswer: React.FunctionComponent = ({ children }) => {
  const {
    submitAnswer,
    isSubmittingQcm,
    config: { validOnSelect },
  } = React.useContext(QcmContext);

  const isDisabled = validOnSelect || isSubmittingQcm;

  return (
    <button onClick={submitAnswer} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default ValidQcmAnswer;

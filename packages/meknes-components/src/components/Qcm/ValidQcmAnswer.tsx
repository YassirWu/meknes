import React from "react";
import QcmContext from "./QcmContext";

const ValidQcmAnswer: React.FunctionComponent = ({ children }) => {
  const {
    submitAnswer,
    isSubmittingQcm,
    config: { validOnSelect, multiple },
  } = React.useContext(QcmContext);

  const isDisabled = (validOnSelect && !multiple) || isSubmittingQcm;

  return (
    <button onClick={submitAnswer} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default ValidQcmAnswer;

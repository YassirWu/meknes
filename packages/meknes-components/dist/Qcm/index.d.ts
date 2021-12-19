import React from "react";
import { QcmConfiguration } from "./QcmContext";
declare type QcmProps = {
    config?: Partial<QcmConfiguration>;
};
declare const Qcm: React.FunctionComponent<QcmProps>;
export default Qcm;

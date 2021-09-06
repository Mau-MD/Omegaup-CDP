import { Action, action } from "easy-peasy";
import { caseConfig } from "./configInterfaces";

export interface IConfigModel {
  caseConfig: caseConfig;
  setCaseConfig: Action<IConfigModel, caseConfig>;
}

const ConfigModel = {
  caseConfig: {
    focus: "last",
    goUp: false,
  },
  setCaseConfig: action((state, payload) => {
    state.caseConfig = payload;
  }),
} as IConfigModel;

export default ConfigModel;

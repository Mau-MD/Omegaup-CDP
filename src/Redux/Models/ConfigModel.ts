import { Action, action } from "easy-peasy";

export interface caseConfig {
  focus: "first" | "last" | "none";
  goUp: boolean;
}

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

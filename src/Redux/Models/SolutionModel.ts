import { action, Action } from "easy-peasy";

export interface ISolutionModel {
  code: string;
  language: number;
  text: string;

  setCode: Action<ISolutionModel, string>;
  setLanguage: Action<ISolutionModel, number>;
  setText: Action<ISolutionModel, string>;
}

const SolutionModel = {
  code: "",
  language: 0,
  text: "Escribe aquí la solución de tu problema",

  setCode: action((state, payload) => {
    state.code = payload;
  }),
  setLanguage: action((state, payload) => {
    state.language = payload;
  }),
  setText: action((state, payload) => {
    state.text = payload;
  }),
} as ISolutionModel;

export default SolutionModel;

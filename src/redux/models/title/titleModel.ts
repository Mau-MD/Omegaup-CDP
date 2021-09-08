import { action, Action } from "easy-peasy";

export interface ITitleModel {
  titleName: string;
  setTitleName: Action<ITitleModel, string>;
}

const TitleModel = {
  titleName: "Nuevo Problema",
  setTitleName: action((state, payload) => {
    state.titleName = payload;
  }),
} as ITitleModel;

export default TitleModel;

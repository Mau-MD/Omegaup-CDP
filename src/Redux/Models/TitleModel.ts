import { action, Action } from "easy-peasy";

export interface ITitleModel {
  titleName: string;
  setTitleName: Action<ITitleModel, string>;
}

const TitleModel = <ITitleModel>{
  titleName: "Nuevo Problema",
  setTitleName: action((state, payload) => {
    state.titleName = payload;
  }),
};

export default TitleModel;

import { action, Action } from "easy-peasy";

export interface IUtilModel {
  locked: boolean;
  setLocked: Action<IUtilModel, boolean>;
}

const UtilModel = {
  locked: false,
  setLocked: action((state, payload) => {
    state.locked = payload;
  }),
} as IUtilModel;

export default UtilModel;

import { action, Action } from "easy-peasy";

interface Data {
  type: "case" | "group";
  caseName: string | null;
  groupName: string | null;
  points: number | null;
  pointsDefined: boolean | null;
}

export interface IAddModel {
  data: Data;
  setData: Action<IAddModel, Data>;
}

const AddModel = {
  data: {},
  setData: action((state, payload) => {
    state.data = payload;
  }),
} as IAddModel;

export default AddModel;

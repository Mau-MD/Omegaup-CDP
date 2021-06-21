import { action, Action } from "easy-peasy";

interface ICaseID {
  caseName: string;
  groupName: string;
}

interface IGroupCase {
  caseName: string;
  groupName: string;
  mode: "raw" | "modern";
  inputData: string | object;
  outputData: string;
}

export interface IIOModel {
  selected: ICaseID | null;
  solutionCode: boolean;
  data: IGroupCase[];
  createCase: Action<IIOModel, IGroupCase>;
  updateCase: Action<IIOModel, IGroupCase>;
  deleteGroup: Action<IIOModel, string>;
  deleteCase: Action<IIOModel, ICaseID>;
  setSelected: Action<IIOModel, ICaseID>;
  setSolutionCode: Action<IIOModel, boolean>;
}

const IOModel = <IIOModel>{
  selected: null,
  solutionCode: false,
  data: [],
  createCase: action((state, payload) => {
    state.data.push(payload);
  }),
  updateCase: action((state, payload) => {
    state.data.map((element) => {
      if (
        element.groupName === payload.groupName &&
        element.caseName === payload.caseName
      ) {
        element = payload;
      }
      return element;
    });
  }),
  deleteGroup: action((state, payload) => {
    state.data = state.data.filter((element) => {
      return element.groupName !== payload;
    });
  }),
  deleteCase: action((state, payload) => {
    state.data = state.data.filter((element) => {
      return (
        element.groupName !== payload.groupName &&
        element.caseName !== payload.caseName
      );
    });
  }),
  setSelected: action((state, payload) => {
    state.selected = payload;
  }),
  setSolutionCode: action((state, payload) => {
    state.solutionCode = payload;
  }),
};

export default IOModel;

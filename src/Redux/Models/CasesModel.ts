import { action, Action } from "easy-peasy";

interface IGroup {
  name: string | null;
  points: number | null;
  defined: boolean;
  cases: ICase[];
}

interface ICase {
  name: string | null;
  group: string | null;
  points: number | null;
  defined: boolean;
  ioData: object;
}

export interface ICasesModel {
  data: IGroup[];

  addGroup: Action<ICasesModel, IGroup>;
  editGroup: Action<ICasesModel, IGroup>;
  removeGroup: Action<ICasesModel, string>;

  addCase: Action<ICasesModel, ICase>;
  editCase: Action<ICasesModel, ICase>;
  removeCase: Action<ICasesModel, { name: string; group: string }>;
}

const CasesModel = {
  data: [],
  addGroup: action((state, payload) => {
    state.data.push(payload);
  }),
  editGroup: action((state, payload) => {
    state.data.map((element) => {
      if (element.name === payload.name) {
        element = payload;
      }
      return element;
    });
  }),
  removeGroup: action((state, payload) => {
    state.data = state.data.filter((element) => {
      return element.name !== payload;
    });
  }),
  addCase: action((state, payload) => {
    state.data.map((element) => {
      if (element.name === payload.group) {
        element.cases.push(payload);
      }
    });
  }),
  editCase: action((state, payload) => {
    state.data.map((element) => {
      if (element.name === payload.group) {
        element.cases.map((caseElement) => {
          if (caseElement.name === payload.name) {
            caseElement = payload;
          }
          return caseElement;
        });
      }
      return element;
    });
  }),
  removeCase: action((state, payload) => {
    state.data.map((element) => {
      if (element.name === payload.group) {
        element.cases = element.cases.filter((caseElement) => {
          return (
            caseElement.name !== payload.name &&
            caseElement.group !== payload.group
          );
        });
      }
      return element;
    });
  }),
} as ICasesModel;

export default CasesModel;

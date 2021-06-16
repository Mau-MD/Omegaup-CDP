import { action, Action } from "easy-peasy";

interface CaseElement {
  name: string;
  group: string;
  arePointsDefined: boolean;
  points: number | undefined;
}

interface Group {
  name: string;
  points: number | undefined;
  pointsDefined: boolean;
  isMain: boolean;
  cases: CaseElement[];
}

interface IUpdate {
  oldName: string;
  newName: string;
  points: number | undefined;
}

export interface ICasesModel {
  cases: Group[];
  addCase: Action<ICasesModel, CaseElement>;
  updateCase: Action<ICasesModel, IUpdate>;
  removeCase: Action<ICasesModel, string>;
}

const CasesModel = <ICasesModel>{
  cases: [
    {
      name: "mainGroup",
      points: undefined,
      isMain: true,
      pointsDefined: false,
      cases: [],
    },
  ],
  addCase: action((state, payload) => {
    const groupToSearch = payload.group;
    let groupFound = false;

    state.cases.map((element) => {
      if (element.name === groupToSearch) {
        element.cases.push(payload);
        groupFound = true;
      }
      return element;
    });

    if (!groupFound) {
      state.cases.push({
        name: groupToSearch,
        points: undefined,
        isMain: false,
        pointsDefined: false,
        cases: [payload],
      });
    }
  }),
  updateCase: action((state, payload) => {
    // Itero por todos los grupos y busco el que quiero cambiar
    state.cases.map((element) => {
      if (element.name === payload.oldName) {
        element.name = payload.newName; // Cambio el nombre del grupo
        element.points = payload.points; // Cambio el puntaje del grupo
        element.cases = element.cases.map((individualCase) => {
          // Cambio el nombre de grupo de los hijos
          individualCase.group = payload.newName;
          return individualCase;
        });
      }
      return element;
    });
  }),
  removeCase: action((state, payload) => {
    state.cases = state.cases.filter((element) => {
      // console.log(element.name + " " + payload);
      return element.name !== payload;
    });
  }),
};

export default CasesModel;

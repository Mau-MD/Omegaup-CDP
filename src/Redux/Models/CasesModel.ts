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

export interface ICasesModel {
  cases: Group[];
  addCase: Action<ICasesModel, CaseElement>;
  // removeCase: Action<ICasesModel, string>;
  // updateCase: Action<ICasesModel, CaseElement>;
}

// TODO Checar si ya existe el mismo caso en el grupo o nombre de grupo

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
};

export default CasesModel;

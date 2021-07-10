import { action, Action, Computed, computed } from "easy-peasy";

interface IGroup {
  name: string;
  points: number;
  defined: boolean;
  cases: ICase[];
}

export interface ICase {
  name: string;
  group: string;
  points: number;
  defined: boolean;
  ioData: object;
}

export interface ICasesModel {
  data: IGroup[];
  selected: { name: string; group: string };

  addGroup: Action<ICasesModel, IGroup>;
  editGroup: Action<ICasesModel, { payload: IGroup; oldName: string }>;
  removeGroup: Action<ICasesModel, string>;

  addCase: Action<ICasesModel, ICase>;
  editCase: Action<ICasesModel, ICase>;
  removeCase: Action<ICasesModel, { name: string; group: string }>;
  setSelected: Action<ICasesModel, { name: string; group: string }>;
}

function calculatePoints(state: IGroup[]) {
  let maxPoints = 100;
  let notDefinedCount = 0;

  state.forEach((element) => {
    if (element.name === "Sin Grupo") {
      element.cases.forEach((caseElement) => {
        if (caseElement.defined) {
          maxPoints -= caseElement.points ? caseElement.points : 0;
        } else {
          notDefinedCount++;
        }
      });
    } else {
      if (element.defined) {
        maxPoints -= element.points ? element.points : 0;
      } else {
        notDefinedCount++;
      }
    }
  });

  let individualPoints = maxPoints / notDefinedCount;

  state = state.map((element) => {
    if (element.name === "Sin Grupo") {
      element.cases = element.cases.map((caseElement) => {
        if (!caseElement.defined) {
          caseElement.points = individualPoints;
        }
        return caseElement;
      });
    }
    if (!element.defined) {
      element.points = individualPoints;
    }
    return element;
  });

  return state;
}

const CasesModel = {
  data: [
    {
      name: "Sin Grupo",
      cases: [],
      defined: false,
      points: 0,
    },
  ],
  selected: {
    name: "none",
    group: "none",
  },
  addGroup: action((state, payload) => {
    state.data.push(payload);
    state.data = calculatePoints(state.data);
  }),
  editGroup: action((state, payload) => {
    state.data = state.data.map((element) => {
      if (element.name === payload.oldName) {
        element = payload.payload;
      }
      return element;
    });
    state.data = calculatePoints(state.data);
  }),
  removeGroup: action((state, payload) => {
    state.data = state.data.filter((element) => {
      return element.name !== payload;
    });
    state.data = calculatePoints(state.data);
  }),
  addCase: action((state, payload) => {
    state.data.map((element) => {
      if (element.name === payload.group) {
        element.cases.push(payload);
      }
      return element;
    });
    state.data = calculatePoints(state.data);
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
    state.data = calculatePoints(state.data);
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
    state.data = calculatePoints(state.data);
  }),
  setSelected: action((state, payload) => {
    state.selected = payload;
  }),
} as ICasesModel;

export default CasesModel;

import { action, Action } from "easy-peasy";

// TODO Check if another group is trying to rename it to an existing name
// TODO Change color depending if the point is defined
// TODO Add points to modal
interface CaseElement {
  name: string;
  group: string;
  arePointsDefined: boolean;
  points: number;
}

interface Group {
  name: string;
  points: number;
  pointsDefined: boolean;
  isMain: boolean;
  cases: CaseElement[];
}

interface IUpdate {
  oldName: string;
  newName: string;
  points: number;
  pointsDefined: boolean;
}

export interface ICasesModel {
  cases: Group[];
  availablePoints: number;
  addCase: Action<ICasesModel, CaseElement>;
  updateCase: Action<ICasesModel, IUpdate>;
  removeCase: Action<ICasesModel, string>;
}

function calculatePoints(cases: Group[]): Group[] {
  var availablePoints = 100;

  var groupsWithoutPointsDefined = 0;

  cases.forEach((element) => {
    if (element.name === "mainGroup") {
      element.cases.forEach((groupCase) => {
        // Los que esten en el grupo principal deben ser contados como individuales tambien!!data.points
        console.log(groupCase);
        if (groupCase.arePointsDefined) {
          availablePoints -= groupCase.points;
        } else {
          groupsWithoutPointsDefined += 1;
        }
      });
    } else {
      if (element.pointsDefined) {
        availablePoints -= element.points;
      } else {
        groupsWithoutPointsDefined += 1;
      }
    }
  });

  console.log("group: " + groupsWithoutPointsDefined + " " + availablePoints);
  let fractionalPoints = availablePoints / groupsWithoutPointsDefined;
  return cases.map((element) => {
    if (element.name === "mainGroup") {
      element.cases = element.cases.map((groupCase) => {
        if (!groupCase.arePointsDefined) {
          groupCase.points = fractionalPoints;
        }
        return groupCase;
      });
    }
    if (!element.pointsDefined) {
      element.points = fractionalPoints;
    }
    return element;
  });
}

const CasesModel = <ICasesModel>{
  cases: [
    {
      name: "mainGroup",
      points: 0,
      isMain: true,
      pointsDefined: false,
      cases: [],
    },
  ],
  availablePoints: 100,
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
        points: 0,
        isMain: false,
        pointsDefined: false,
        cases: [payload],
      });
    }

    // Calculate Available Points

    state.cases = calculatePoints(state.cases);
    // state.availablePoints = 100;
    //
    // let groupsWithoutPointsDefined = 0;
    // state.cases.forEach((element) => {
    //   if (element.pointsDefined) {
    //     state.availablePoints -= element.points;
    //   } else {
    //     groupsWithoutPointsDefined += 1;
    //   }
    // });
    //
    // let fractionalPoints = state.availablePoints / groupsWithoutPointsDefined;
    // state.cases.map((element) => {
    //   if (!element.pointsDefined) {
    //     element.points = fractionalPoints;
    //   }
    //   return element;
    // });
  }),

  updateCase: action((state, payload) => {
    // Itero por todos los grupos y busco el que quiero cambiar
    state.cases.map((element) => {
      if (element.name === payload.oldName) {
        element.name = payload.newName; // Cambio el nombre del grupo
        element.points = payload.points; // Cambio el puntaje del grupo
        element.pointsDefined = payload.pointsDefined;
        element.cases = element.cases.map((individualCase) => {
          // Cambio el nombre de grupo de los hijos
          individualCase.group = payload.newName;
          return individualCase;
        });
      }
      return element;
    });
    state.cases = calculatePoints(state.cases);
  }),
  removeCase: action((state, payload) => {
    state.cases = state.cases.filter((element) => {
      // console.log(element.name + " " + payload);
      return element.name !== payload;
    });
    state.cases = calculatePoints(state.cases);
  }),
};

export default CasesModel;

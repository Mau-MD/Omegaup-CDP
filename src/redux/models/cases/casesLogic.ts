import {IGroup} from "./casesInterfaces";

export function calculatePoints(state: IGroup[]) {
  let maxPoints = 100;
  let notDefinedCount = 0;

  state.forEach((element) => {
    if (element.name === "sin_grupo") {
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
    if (element.name === "sin_grupo") {
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


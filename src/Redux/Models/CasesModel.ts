import { action, Action, Computed, computed, thunk, Thunk } from "easy-peasy";
import { uuid } from "uuidv4";
import Store from "../Store";

export interface IGroup {
  groupId: string;
  name: string;
  points: number;
  defined: boolean;
  cases: ICase[];
}

export interface ICase {
  caseId: string;
  name: string;
  groupId: string;
  points: number;
  defined: boolean;
}

interface caseIndentifier {
  groupId: string;
  caseId: string;
}

interface Index {
  groupIndex: number;
  caseIndex: number;
}

export interface ICasesModel {
  data: IGroup[];
  selected: caseIndentifier;
  selectedIndex: Index;
  lastState: IGroup[];
  lastIndex: Action<ICasesModel>;
  nextIndex: Action<ICasesModel>;
  setData: Action<ICasesModel, IGroup[]>;
  selectedData: Computed<
    ICasesModel,
    (groupId: string, caseId: string) => { groupName: string; caseData: ICase }
  >;

  addGroup: Action<ICasesModel, IGroup>;
  editGroup: Action<ICasesModel, IGroup>;
  removedGroup: Action<ICasesModel, string>;
  removeGroup: Thunk<ICasesModel, string>;
  removedGroupCases: Action<ICasesModel, string>;
  removeGroupCases: Thunk<ICasesModel, string>;

  addCase: Action<ICasesModel, ICase>;
  editCase: Action<ICasesModel, { case: ICase; lastId: string }>;
  removedCase: Action<ICasesModel, caseIndentifier>;
  removeCase: Thunk<ICasesModel, caseIndentifier>;
  setSelected: Action<ICasesModel, caseIndentifier>;
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
      groupId: uuid(),
      name: "Sin Grupo",
      cases: [],
      defined: false,
      points: 0,
    },
  ],
  selected: {
    groupId: "None",
    caseId: "None",
  },
  selectedIndex: {
    groupIndex: 0,
    caseIndex: -1,
  },
  lastState: [],
  setSelected: action((state, payload) => {
    state.selected = payload;
    if (payload.caseId === "None" || payload.groupId === "None") {
      state.selectedIndex = { groupIndex: 0, caseIndex: -1 };
      return;
    }
    // Tengo que buscar su index
    const groupIndex = state.data.findIndex(
      (groupElement) => groupElement.groupId === payload.groupId
    );
    const caseIndex = state.data[groupIndex].cases.findIndex(
      (caseElement) => caseElement.caseId === payload.caseId
    );
    state.selectedIndex = { groupIndex, caseIndex };
  }),
  lastIndex: action((state) => {
    let { groupIndex, caseIndex } = state.selectedIndex;
    console.log(groupIndex, caseIndex);
    caseIndex--;
    // Ensure that we are not selecting a case that doesn't exist in that group
    if (caseIndex < 0) {
      groupIndex--;
      if (groupIndex < 0) {
        groupIndex = state.data.length - 1;
      }
      caseIndex = state.data[groupIndex].cases.length - 1;
    }
    // Ensure we are not selecting a group that doens't exist
    const { groupId, caseId } = state.data[groupIndex].cases[caseIndex];
    state.selected = { groupId, caseId };
    state.selectedIndex = { groupIndex, caseIndex };
  }),
  nextIndex: action((state) => {
    let { groupIndex, caseIndex } = state.selectedIndex;
    console.log(groupIndex, caseIndex);
    caseIndex++;
    // Ensure that we are not selecting a case that doesn't exist in that group
    if (caseIndex >= state.data[groupIndex].cases.length) {
      groupIndex++;
      caseIndex = 0;
    }
    // Ensure we are not selecting a group that doens't exist
    if (groupIndex >= state.data.length) {
      groupIndex = 0;
      caseIndex = 0;
    }
    const { groupId, caseId } = state.data[groupIndex].cases[caseIndex];
    state.selected = { groupId, caseId };
    state.selectedIndex = { groupIndex, caseIndex };
  }),
  selectedData: computed((state) => {
    return (groupId, caseId) => {
      const groupState = state.data.find(
        (groupElement) => groupElement.groupId === groupId
      );

      const groupName = groupState ? groupState.name : "None";

      const caseState = groupState?.cases.find(
        (caseElement) => caseElement.caseId === caseId
      );

      if (caseState) return { groupName: groupName, caseData: caseState };
    };
  }),
  setData: action((state, payload) => {
    state.data = payload;
  }),
  addGroup: action((state, payload) => {
    state.data.push(payload);
    state.data = calculatePoints(state.data);
  }),
  editGroup: action((state, payload) => {
    const groupIndex = state.data.findIndex(
      (groupElement) => groupElement.groupId === payload.groupId
    );

    if (groupIndex !== undefined) state.data[groupIndex] = payload;

    state.data = calculatePoints(state.data);
  }),
  removedGroup: action((state, payload) => {
    state.data = state.data.filter((element) => {
      // Eliminamos del InputStore todos los hijos del grupo
      return element.groupId !== payload;
    });
    state.data = calculatePoints(state.data);
  }),
  removeGroup: thunk((actions, payload, helper) => {
    const groupData = helper
      .getState()
      .data.find((element) => element.groupId === payload);

    groupData?.cases.forEach((caseToBeDeleted) => {
      //@ts-ignore
      helper.getStoreActions().input.removeData({
        caseId: caseToBeDeleted.caseId,
        groupId: caseToBeDeleted.groupId,
      });
    });
    actions.removedGroup(payload);
  }),
  removedGroupCases: action((state, payload) => {
    const groupData = state.data.find((element) => element.groupId === payload);
    if (groupData !== undefined) {
      groupData.cases = [];
    }
    state.data = calculatePoints(state.data);
  }),
  removeGroupCases: thunk((actions, payload, helper) => {
    const groupData = helper
      .getState()
      .data.find((element) => element.groupId === payload);

    groupData?.cases.forEach((caseToBeDeleted) => {
      //@ts-ignore
      helper.getStoreActions().input.removeData({
        caseId: caseToBeDeleted.caseId,
        groupId: caseToBeDeleted.groupId,
      });
    });
    actions.removedGroupCases(payload);
  }),
  addCase: action((state, payload) => {
    const groupState = state.data.find(
      (groupElement) => groupElement.groupId === payload.groupId
    );
    groupState?.cases.push(payload);
    state.data = calculatePoints(state.data);
  }),
  editCase: action((state, payload) => {
    const { case: caseData, lastId } = payload;

    const groupState = state.data.find(
      (groupElement) => groupElement.groupId === lastId
    );

    if (lastId !== caseData.groupId) {
      if (groupState) {
        groupState.cases = groupState.cases.filter(
          (caseElement) => caseElement.caseId !== caseData.caseId
        );
      }

      const newGroup = state.data.find(
        (groupElement) => groupElement.groupId === caseData.groupId
      );

      newGroup?.cases.push(caseData);
      state.data = calculatePoints(state.data);
      return;
    }

    const caseIndex = groupState?.cases.findIndex(
      (caseElement) => caseElement.caseId === caseData.caseId
    );

    if (groupState !== undefined && caseIndex !== undefined) {
      groupState.cases[caseIndex] = caseData;
    }

    state.data = calculatePoints(state.data);
  }),

  removedCase: action((state, payload) => {
    const groupState = state.data.find(
      (groupElement) => groupElement.groupId === payload.groupId
    );

    if (groupState !== undefined) {
      groupState.cases = groupState.cases.filter(
        (caseElement) => caseElement.caseId !== payload.caseId
      );
    }
    state.data = calculatePoints(state.data);
  }),
  removeCase: thunk((actions, payload, helper) => {
    actions.removedCase(payload);
    // @ts-ignore
    helper.getStoreActions().input.removeData(payload);
  }),
} as ICasesModel;

export default CasesModel;

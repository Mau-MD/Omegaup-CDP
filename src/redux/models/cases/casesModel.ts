import { action, Action, Computed, computed, thunk, Thunk } from "easy-peasy";
import { empty } from "uuidv4";
import { caseIdentifier } from "../input/inputInterfaces";
import { ICase, IGroup, Index } from "./casesInterfaces";
import { calculatePoints } from "./casesLogic";

export interface ICasesModel {
  data: IGroup[];
  selected: caseIdentifier;
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
  removedCase: Action<ICasesModel, caseIdentifier>;
  removeCase: Thunk<ICasesModel, caseIdentifier>;
  setSelected: Action<ICasesModel, caseIdentifier>;
}

const CasesModel = {
  data: [
    {
      groupId: empty(),
      name: "sin_grupo",
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
    const groupIndex = state.data.findIndex(
      (groupElement) => groupElement.groupId === payload.groupId
    );
    const caseIndex = state.data[groupIndex].cases.findIndex(
      (caseElement) => caseElement.caseId === payload.caseId
    );
    state.selectedIndex = { groupIndex, caseIndex };
  }),
  // Selects the previous case
  lastIndex: action((state) => {
    let { groupIndex, caseIndex } = state.selectedIndex;
    caseIndex--;
    // Ensure that we are not selecting a case that doesn't exist in that group
    while (caseIndex < 0) {
      groupIndex--;
      while (groupIndex < 0) {
        groupIndex = state.data.length - 1;
      }
      caseIndex = state.data[groupIndex].cases.length - 1;
    }
    const { groupId, caseId } = state.data[groupIndex].cases[caseIndex];
    state.selected = { groupId, caseId };
    state.selectedIndex = { groupIndex, caseIndex };
  }),
  // Selectes the next case
  nextIndex: action((state) => {
    let { groupIndex, caseIndex } = state.selectedIndex;
    console.log(groupIndex, caseIndex);
    caseIndex++;
    // Ensure that we are not selecting a case that doesn't exist in that group
    while (caseIndex >= state.data[groupIndex].cases.length) {
      groupIndex++;
      caseIndex = 0;
      if (groupIndex >= state.data.length) {
        groupIndex = 0;
        caseIndex = 0;
      }
    }
    const { groupId, caseId } = state.data[groupIndex].cases[caseIndex];
    state.selected = { groupId, caseId };
    state.selectedIndex = { groupIndex, caseIndex };
  }),
  // Calculate selected data based on a groupId and a caseId
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
  // Removes a group based on a groupId
  removedGroup: action((state, payload) => {
    state.data = state.data.filter((element) => {
      // Eliminamos del InputStore todos los hijos del grupo
      return element.groupId !== payload;
    });
    state.data = calculatePoints(state.data);
  }),
  // Helper function that removes a group and also removes the Input Page of all cases associated with it
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
  // Function that removes all the cases inside the group
  removedGroupCases: action((state, payload) => {
    const groupData = state.data.find((element) => element.groupId === payload);
    if (groupData !== undefined) {
      groupData.cases = [];
    }
    state.data = calculatePoints(state.data);
  }),
  /* Helper function that removes all the cases inside the group and also removes the Input Page of all the
  cases that are on the group */
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

  // Function that removes a case based on a caseIdentifier
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
  // Helper function that removes a case and also removes the input page associated with it
  removeCase: thunk((actions, payload, helper) => {
    actions.removedCase(payload);
    // @ts-ignore
    helper.getStoreActions().input.removeData(payload);
  }),
} as ICasesModel;

export default CasesModel;

import { action, Action, computed, Computed } from "easy-peasy";
import _ from "lodash";

export interface IArrayData {
  size: number;
  minValue: number;
  maxValue: number;
  distinct: boolean;
  value: string;
}
export interface ILine {
  lineId: string;
  type: "line" | "multiline" | "array" | "matrix";
  label: string;
  value: string;
  arrayData: IArrayData | undefined;
  matrixData: object | undefined;
}

export interface IInput {
  id: caseIdentifier;
  lines: ILine[];
}

export interface caseIdentifier {
  groupId: string;
  caseId: string;
}

export interface IInputModel {
  data: IInput[];
  layout: ILine[] | undefined;
  hidden: boolean;
  lastCreated: string;

  addData: Action<IInputModel, IInput>;
  removeData: Action<IInputModel, caseIdentifier>;

  addLine: Action<IInputModel, { caseIdentifier: caseIdentifier; line: ILine }>;
  setLines: Action<
    IInputModel,
    {
      caseIdentifier: caseIdentifier;
      lineArray: ILine[];
    }
  >;
  removeLine: Action<
    IInputModel,
    { caseIdentifier: caseIdentifier; lineId: string }
  >;
  removeAllLines: Action<IInputModel, caseIdentifier>;
  lineData: Computed<
    IInputModel,
    (caseIdentifier: caseIdentifier, lineId: string) => ILine
  >;
  updateLine: Action<
    IInputModel,
    { caseIdentifier: caseIdentifier; lineId: string; lineData: ILine }
  >;
  handleGroupChange: Action<
    IInputModel,
    { caseId: string; newGroupId: string }
  >;
  setLineArrayData: Action<
    IInputModel,
    { caseIdentifier: caseIdentifier; lineId: string; arrayData: IArrayData }
  >;
  setHidden: Action<IInputModel, boolean>;

  setLayout: Action<IInputModel, ILine[]>;
  addLayoutLine: Action<IInputModel, ILine>;
  updateLayoutLine: Action<IInputModel, ILine>;
  removeLayoutLine: Action<IInputModel, string>;
}

const InputModel = {
  data: [],
  layout: [],
  hidden: false,
  lastCreated: "",

  addData: action((state, inputPage) => {
    state.data.push(inputPage);
  }),
  removeData: action((state, id) => {
    state.data.filter((inputElement) => {
      return inputElement.id !== id;
    });
  }),
  addLine: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );
    lineGroup?.lines.push(payload.line);
    state.lastCreated = payload.line.lineId;
  }),
  setLines: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );

    if (lineGroup !== undefined) {
      lineGroup.lines = payload.lineArray;
    }
  }),
  removeLine: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );
    if (lineGroup !== undefined) {
      lineGroup.lines = lineGroup?.lines.filter(
        (lineElement) => lineElement.lineId !== payload.lineId
      );
    }
  }),
  removeAllLines: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(payload, inputElement.id)
    );

    if (lineGroup !== undefined) {
      lineGroup.lines = [];
    }
  }),
  lineData: computed((state) => {
    return (caseIdentifier, lineId) => {
      const lineGroup = state.data.find(
        (inputElement) => inputElement.id === caseIdentifier
      );

      const line = lineGroup?.lines.find(
        (lineElement) => lineElement.lineId === lineId
      );

      if (line) return line;
    };
  }),
  updateLine: action((state, { caseIdentifier, lineId, lineData }) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, caseIdentifier)
    );

    const lineIndex = lineGroup?.lines.findIndex(
      (lineElement) => lineElement.lineId === lineId
    );

    if (lineGroup !== undefined && lineIndex !== undefined) {
      lineGroup.lines[lineIndex] = lineData;
    }
  }),
  setLineArrayData: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );

    const line = lineGroup?.lines.find(
      (lineElement) => lineElement.lineId === payload.lineId
    );

    if (line !== undefined) {
      line.arrayData = payload.arrayData;
    }
  }),
  setHidden: action((state, hide) => {
    state.hidden = hide;
  }),

  setLayout: action((state, layout) => {
    state.layout = layout;
  }),
  addLayoutLine: action((state, payload) => {
    state.layout?.push(payload);
  }),
  updateLayoutLine: action((state, payload) => {
    const lineToUpdate = state.layout?.find(
      (lineElement) => lineElement.lineId === payload.lineId
    );
    if (lineToUpdate !== undefined) {
      lineToUpdate.label = payload.label;
      lineToUpdate.type = payload.type;
    }
  }),
  removeLayoutLine: action((state, payload) => {
    state.layout = state.layout?.filter(
      (lineElement) => lineElement.lineId !== payload
    );
  }),

  handleGroupChange: action((state, { caseId, newGroupId }) => {
    const inputPage = state.data.find(
      (inputElement) => inputElement.id.caseId === caseId
    );
    if (inputPage !== undefined) {
      inputPage.id.groupId = newGroupId;
    }
  }),
} as IInputModel;

export default InputModel;

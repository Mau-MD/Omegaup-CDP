import { action, Action, computed, Computed } from "easy-peasy";

export interface ILine {
  lineId: string;
  type: "line" | "multiline" | "array" | "matrix";
  label: string;
  value: string;
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

  addData: Action<IInputModel, IInput>;
  removeData: Action<IInputModel, caseIdentifier>;

  addLine: Action<IInputModel, { caseIdentifier: caseIdentifier; line: ILine }>;
  // updateLines: Action<IInputModel, caseIdentifier>; // Actualizar todos los inputs
  removeLine: Action<
    IInputModel,
    { caseIdentifier: caseIdentifier; lineId: string }
  >;

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
  setHidden: Action<IInputModel, boolean>;
  setLayout: Action<IInputModel, ILine[]>;
}

const InputModel = {
  data: [],
  layout: undefined,
  hidden: false,

  addData: action((state, inputPage) => {
    state.data.push(inputPage);
  }),
  removeData: action((state, id) => {
    state.data.filter((inputElement) => {
      return inputElement.id !== id;
    });
  }),
  addLine: action((state, payload) => {
    const lineGroup = state.data.find(
      (inputElement) =>
        JSON.stringify(inputElement.id) ===
        JSON.stringify(payload.caseIdentifier)
    );
    lineGroup?.lines.push(payload.line);
  }),
  removeLine: action((state, payload) => {
    const lineGroup = state.data.find(
      (inputElement) => inputElement.id === payload.caseIdentifier
    );
    lineGroup?.lines.filter(
      (lineElement) => lineElement.lineId !== payload.lineId
    );
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
    const lineGroup = state.data.find(
      (inputElement) => inputElement.id === caseIdentifier
    );

    const lineIndex = lineGroup?.lines.findIndex(
      (lineElement) => lineElement.lineId === lineId
    );

    if (lineGroup !== undefined && lineIndex !== undefined) {
      lineGroup.lines[lineIndex] = lineData;
    }
  }),

  setHidden: action((state, hide) => {
    state.hidden = hide;
  }),
  setLayout: action((state, layout) => {
    state.layout = layout;
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

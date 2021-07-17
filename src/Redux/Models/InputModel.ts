import { action, Action, computed, Computed } from "easy-peasy";

export interface ILine {
  lineId: string;
  type: "line" | "multiline" | "array" | "matrix";
  label: string;
  value: string;
}

export interface IInput {
  id: caseIndentifier;
  lines: ILine[];
}

export interface caseIndentifier {
  groupId: string;
  caseId: string;
}

interface IInputModel {
  data: IInput[];
  layout: ILine[] | undefined;

  addData: Action<IInputModel, IInput>;
  removeData: Action<IInputModel, caseIndentifier>;

  addLine: Action<
    IInputModel,
    { caseIndentifier: caseIndentifier; line: ILine }
  >;
  // updateLines: Action<IInputModel, caseIndentifier>; // Actualizar todos los inputs
  removeLine: Action<
    IInputModel,
    { caseIndentifier: caseIndentifier; lineId: string }
  >;

  lineData: Computed<
    IInputModel,
    (caseIndentifier: caseIndentifier, lineId: string) => ILine
  >;
  updateLine: Action<
    IInputModel,
    { caseIndentifier: caseIndentifier; lineId: string; lineData: ILine }
  >;
}

const InputModel = {
  data: [],
  layout: undefined,

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
      (inputElement) => inputElement.id === payload.caseIndentifier
    );
    lineGroup?.lines.push(payload.line);
  }),
  removeLine: action((state, payload) => {
    const lineGroup = state.data.find(
      (inputElement) => inputElement.id === payload.caseIndentifier
    );
    lineGroup?.lines.filter(
      (lineElement) => lineElement.lineId !== payload.lineId
    );
  }),
  lineData: computed((state) => {
    return (caseIndentifier, lineId) => {
      const lineGroup = state.data.find(
        (inputElement) => inputElement.id === caseIndentifier
      );

      const line = lineGroup?.lines.find(
        (lineElement) => lineElement.lineId === lineId
      );

      if (line) return line;
    };
  }),
  updateLine: action((state, { caseIndentifier, lineId, lineData }) => {
    const lineGroup = state.data.find(
      (inputElement) => inputElement.id === caseIndentifier
    );

    const lineIndex = lineGroup?.lines.findIndex(
      (lineElement) => lineElement.lineId === lineId
    );

    if (lineGroup !== undefined && lineIndex !== undefined) {
      lineGroup.lines[lineIndex] = lineData;
    }
  }),
} as IInputModel;

export default IInputModel;

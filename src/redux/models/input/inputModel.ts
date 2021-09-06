import { action, Action, computed, Computed } from "easy-peasy";
import _ from "lodash";
import { uuid } from "uuidv4";
import {caseIdentifier, IArrayData, IInput, ILine, IMatrixData} from "./inputInterfaces";

export interface IInputModel {
  data: IInput[];
  layout: ILine[] | undefined;
  hidden: boolean;
  lastCreated: string;

  addData: Action<IInputModel, IInput>;
  removeData: Action<IInputModel, caseIdentifier>;

  setOutData: Action<
    IInputModel,
    { caseIdentifier: caseIdentifier; outData: string }
  >;

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
  setLineMatrixData: Action<
    IInputModel,
    { caseIdentifier: caseIdentifier; lineId: string; matrixData: IMatrixData }
  >;
  setHidden: Action<IInputModel, boolean>;

  setLayout: Action<IInputModel, ILine[]>;
  setLayoutToAll: Action<IInputModel>;
  addLayoutLine: Action<IInputModel, ILine>;
  updateLayoutLine: Action<IInputModel, ILine>;
  removeLayoutLine: Action<IInputModel, string>;
}

const InputModel = {
  data: [],
  layout: [],
  hidden: false,
  lastCreated: "",

  // Adds a new Input Page
  addData: action((state, inputPage) => {
    state.data.push(inputPage);
  }),
  // Removes an Input Page
  removeData: action((state, id) => {
    state.data = state.data.filter(
      (inputElement) => !_.isEqual(inputElement.id, id)
    );
  }),
  // Sets the Out information to the Input Page
  setOutData: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );
    if (lineGroup !== undefined) {
      lineGroup.outData = payload.outData;
    }
  }),
  // Adds a line to a selected Input Page
  addLine: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );
    lineGroup?.lines.push(payload.line);
    state.lastCreated = payload.line.lineId;
  }),
  // Overrides all the lines to a selected Input Page
  setLines: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );

    if (lineGroup !== undefined) {
      lineGroup.lines = payload.lineArray;
    }
  }),
  // Removes a line of a selected Input Page
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
  // Removes all lines of a selected Input Page
  removeAllLines: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(payload, inputElement.id)
    );

    if (lineGroup !== undefined) {
      lineGroup.lines = [];
    }
  }),
  // Gets a specific line given the lineId and caseIdentifier
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
  // Updates a single line
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
  // Sets the Array Value of a line
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
  /* Sets the Matrix Value of a line. Note: Array and Matrix values are stored in different places.
     If you change to Array Mode, set the array data, change the mode to something different, and then
     change again to Array Mode, the array information will be preserved.
   */
  setLineMatrixData: action((state, payload) => {
    const lineGroup = state.data.find((inputElement) =>
      _.isEqual(inputElement.id, payload.caseIdentifier)
    );

    const line = lineGroup?.lines.find(
      (lineElement) => lineElement.lineId === payload.lineId
    );

    if (line !== undefined) {
      line.matrixData = payload.matrixData;
    }
  }),

  // Hidden mode where it doesn't show labels and drag options
  setHidden: action((state, hide) => {
    state.hidden = hide;
  }),

  // Sets the global layout
  setLayout: action((state, layout) => {
    state.layout = layout;
  }),

  // Sets the layout to all Input Pages
  setLayoutToAll: action((state) => {
    state.data.forEach((inputElement) => {
      if (state.layout !== undefined) {
        const newLines = state.layout.map((layoutLine) => {
          return { ...layoutLine, lineId: uuid() };
        });
        inputElement.lines = newLines;
      }
    });
  }),

  // Adds a new line to the Layout
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

  // Changes the group of a case to another one
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

import { action, Action } from "easy-peasy";
import { makeAll, findSections, initialMarkdownValue } from "./writingLogic";

export interface IWritingModel {
  all: string;
  description: string;
  input: string;
  output: string;
  example: string;
  limits: string;
  error: boolean;

  set: Action<IWritingModel, { markdown: string; index: number }>;
  setAll: Action<IWritingModel, string>;
  setDescription: Action<IWritingModel, string>;
  setInput: Action<IWritingModel, string>;
  setOutput: Action<IWritingModel, string>;
  setExample: Action<IWritingModel, string>;
  setLimits: Action<IWritingModel, string>;
  setError: Action<IWritingModel, boolean>;

  handleAll: () => string;
}

const WritingModel = {
  all: initialMarkdownValue.all,
  description: initialMarkdownValue.description,
  input: initialMarkdownValue.input,
  output: initialMarkdownValue.output,
  example: initialMarkdownValue.example,
  limits: initialMarkdownValue.limits,
  error: false,

  set: action((state, payload) => {
    switch (payload.index) {
      case 0:
        state.all = payload.markdown;
        const sectionData = findSections(payload.markdown.split("\n"));
        if (sectionData.length < 6) {
          state.error = true;
          return;
        }
        state.error = false;
        state.description = sectionData[1].join("\n");
        state.input = sectionData[2].join("\n");
        state.output = sectionData[3].join("\n");
        state.example = sectionData[4].join("\n");
        state.limits = sectionData[5].join("\n");
        return;
      case 1:
        state.description = payload.markdown;
        break;
      case 2:
        state.input = payload.markdown;
        break;
      case 3:
        state.output = payload.markdown;
        break;
      case 4:
        state.example = payload.markdown;
        break;
      case 5:
        state.limits = payload.markdown;
        break;
    }
    state.all = makeAll(state);
  }),
  setAll: action((state, payload) => {
    state.all = payload;
    makeAll(state);
  }),
  setDescription: action((state, payload) => {
    state.description = payload;
    makeAll(state);
  }),
  setInput: action((state, payload) => {
    state.input = payload;
    makeAll(state);
  }),
  setOutput: action((state, payload) => {
    state.output = payload;
    makeAll(state);
  }),
  setExample: action((state, payload) => {
    state.example = payload;
    makeAll(state);
  }),
  setLimits: action((state, payload) => {
    state.limits = payload;
    makeAll(state);
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
} as IWritingModel;

export default WritingModel;

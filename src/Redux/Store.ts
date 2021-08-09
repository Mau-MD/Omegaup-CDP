import title, { ITitleModel } from "./Models/TitleModel";
import cases, { ICasesModel } from "./Models/CasesModel";
import input, { IInputModel } from "./Models/InputModel";
import writing, { IWritingModel } from "./Models/WritingModel";
import solution, { ISolutionModel } from "./Models/SolutionModel";

import { createStore, createTypedHooks, persist } from "easy-peasy";

const globalModel = {
  title,
  cases,
  input,
  writing,
  solution,
};

interface IGlobalModel {
  title: ITitleModel;
  cases: ICasesModel;
  input: IInputModel;
  writing: IWritingModel;
  solution: ISolutionModel;
}

const GlobalStore = createStore(persist(globalModel));
export default GlobalStore;

const typedHooks = createTypedHooks<IGlobalModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

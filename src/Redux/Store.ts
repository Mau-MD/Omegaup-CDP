import title, { ITitleModel } from "./Models/TitleModel";
import cases, { ICasesModel } from "./Models/CasesModel";
import input, { IInputModel } from "./Models/InputModel";
import writing, { IWritingModel } from "./Models/WritingModel";
import solution, { ISolutionModel } from "./Models/SolutionModel";
import tabs, { ITabsModel } from "./Models/TabsModel";
import util, { IUtilModel } from "./Models/UtilModel";
import config, { IConfigModel } from "./Models/ConfigModel";

import { createStore, createTypedHooks, persist } from "easy-peasy";

const globalModel = {
  title,
  cases,
  input,
  writing,
  solution,
  tabs,
  util,
  config,
};

interface IGlobalModel {
  title: ITitleModel;
  cases: ICasesModel;
  input: IInputModel;
  writing: IWritingModel;
  solution: ISolutionModel;
  tabs: ITabsModel;
  util: IUtilModel;
  config: IConfigModel;
}

const GlobalStore = createStore(persist(globalModel));
export default GlobalStore;

const typedHooks = createTypedHooks<IGlobalModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

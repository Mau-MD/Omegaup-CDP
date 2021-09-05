import title, { ITitleModel } from "./models/titleModel";
import cases, { ICasesModel } from "./models/casesModel";
import input, { IInputModel } from "./models/inputModel";
import writing, { IWritingModel } from "./models/writingModel";
import solution, { ISolutionModel } from "./models/solutionModel";
import tabs, { ITabsModel } from "./models/tabsModel";
import util, { IUtilModel } from "./models/utilModel";
import config, { IConfigModel } from "./models/configModel";

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

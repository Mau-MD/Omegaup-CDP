import title, { ITitleModel } from "./models/title/titleModel";
import cases, { ICasesModel } from "./models/cases/casesModel";
import input, { IInputModel } from "./models/input/inputModel";
import writing, { IWritingModel } from "./models/writing/writingModel";
import solution, { ISolutionModel } from "./models/solution/solutionModel";
import tabs, { ITabsModel } from "./models/tabs/tabsModel";
import util, { IUtilModel } from "./models/util/utilModel";
import config, { IConfigModel } from "./models/config/configModel";

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

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = GlobalStore;
}

export default GlobalStore;

const typedHooks = createTypedHooks<IGlobalModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

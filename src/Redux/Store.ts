import title, { ITitleModel } from "./Models/TitleModel";
import cases, { ICasesModel } from "./Models/CasesModel";
import selected, { IIOModel } from "./Models/IOModel";
import add, { IAddModel } from "./Models/AddModel";
import { createStore, createTypedHooks, persist } from "easy-peasy";

const globalModel = {
  title,
  cases,
  selected,
  add,
};

interface IGlobalModel {
  title: ITitleModel;
  cases: ICasesModel;
  selected: IIOModel;
  add: IAddModel;
}

const GlobalStore = createStore(persist(globalModel));
export default GlobalStore;

const typedHooks = createTypedHooks<IGlobalModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

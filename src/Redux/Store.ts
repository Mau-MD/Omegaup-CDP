import title, { ITitleModel } from "./Models/TitleModel";
import cases, { ICasesModel } from "./Models/CasesModel";
import modal, { IModalModel } from "./Models/ModalModel";

import { createStore, createTypedHooks, persist } from "easy-peasy";

const globalModel = {
  title,
  cases,
  modal,
};

interface IGlobalModel {
  title: ITitleModel;
  cases: ICasesModel;
  modal: IModalModel;
}

const GlobalStore = createStore(persist(globalModel));
export default GlobalStore;

const typedHooks = createTypedHooks<IGlobalModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

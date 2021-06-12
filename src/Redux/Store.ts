import title, { ITitleModel } from "./Models/TitleModel";
import { createStore, createTypedHooks, persist } from "easy-peasy";

const globalModel = {
  title,
};

interface IGlobalModel {
  title: ITitleModel;
}

const GlobalStore = createStore(persist(globalModel));
export default GlobalStore;

const typedHooks = createTypedHooks<IGlobalModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

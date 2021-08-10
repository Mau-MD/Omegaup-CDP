import { action, Action } from "easy-peasy";

export interface ITabsModel {
  tabIndex: number;
  setTab: Action<ITabsModel, number>;
}

const TabsModel = {
  tabIndex: 0,
  setTab: action((state, payload) => {
    state.tabIndex = payload;
  }),
} as ITabsModel;

export default TabsModel;

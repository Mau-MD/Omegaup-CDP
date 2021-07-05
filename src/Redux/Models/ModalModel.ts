import { Action, action } from "easy-peasy";
import { ICasesModel } from "./CasesModel";

interface disclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface initial {
  caseName: string;
  groupName: string;
  points: number;
  pointsDefined: boolean;
}

export interface IModalModel {
  disclosure: disclosure;
  setDisclosure: Action<IModalModel, disclosure>;
  initial: initial;
  setInitial: Action<IModalModel, initial>;
}

const ModalModel = {
  disclosure: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
  },
  initial: {
    caseName: "",
    groupName: "",
    points: 0,
    pointsDefined: false,
  },
  setDisclosure: action((state, payload) => {
    state.disclosure = payload;
  }),
  setInitial: action((state, payload) => {
    state.initial = payload;
  }),
} as IModalModel;

export default ModalModel;

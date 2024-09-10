import { createContext, Dispatch, useContext } from "react";
import { Action, initailState, State } from "./reducer";


type DefaultContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
  actions: Record<string, any>;
}

const contextValue: DefaultContextValue = {
  state: initailState,
  dispatch: () => {},
  actions: {}
};

const StateContext = createContext(contextValue);

export function useStateContext() {
  return useContext(StateContext);
}

export {StateContext};


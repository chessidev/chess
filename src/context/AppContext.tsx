import { createContext, Dispatch, useContext, useReducer } from "react";
import { ReactNode } from "react";
import { initialState } from "../Data/data";
import { Action, reducer, State } from "../reducer/reducer";

interface AppContextProps {
  children: ReactNode;
}

interface AppProviderValue {
  appState: State;
  dispatch: Dispatch<Action>;
}

const appContext = createContext<AppProviderValue>({
  appState: initialState,
  dispatch: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(appContext);
};

const AppContext = ({ children }: AppContextProps) => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const appProvider = { appState, dispatch };

  return (
    <appContext.Provider value={appProvider}>{children}</appContext.Provider>
  );
};

export default AppContext;

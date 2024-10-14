import { createContext, useContext, useReducer } from "react";
import { ReactNode } from "react";
import { initialState } from "../Data/data";
import { reducer } from "../reducer/reducer";

interface AppContextProps {
  children: ReactNode;
}

const appContext = createContext({});

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

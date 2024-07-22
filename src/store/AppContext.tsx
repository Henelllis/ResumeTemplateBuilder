import { createContext, useState } from "react";
import { SCREEN } from "../types";

export interface AppContextValue {
  screen: SCREEN;
  setScreen: (screen: SCREEN) => void;
}

export const AppContext = createContext<AppContextValue>({
  screen: SCREEN.HOME,
  setScreen: () => {},
});

function AppContextProvider({ children }: { children: any }) {
  const [screenValue, setScreenValue] = useState<Omit<
    AppContextValue,
    "setScreen"
  > | null>(null);

  function setScreen(screen: SCREEN): void {
    setScreenValue({ screen });
  }

  const value = {
    screen: screenValue?.screen ?? SCREEN.HOME,
    setScreen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;

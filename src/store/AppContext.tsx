import { createContext, useState } from "react";
import { SCREEN, Template } from "../types";

export interface AppContextValue {
  screen: SCREEN;
  templateToUse: Template | null;
  setTemplateToUse: (template: Template | null) => void;
  setScreen: (screen: SCREEN) => void;
}

export const AppContext = createContext<AppContextValue>({
  screen: SCREEN.HOME,
  templateToUse: null,
  setTemplateToUse: () => {},
  setScreen: () => {},
});

function AppContextProvider({ children }: { children: any }) {
  const [screenValue, setScreenValue] = useState<Omit<
    AppContextValue,
    "setScreen" | "setTemplateToUse" | "templateToUse"
  > | null>(null);

  const [templateToUseValue, setTemplateToUseValue] = useState<Omit<
    AppContextValue,
    "setScreen" | "screen" | "setTemplateToUse"
  > | null>(null);

  function setScreen(screen: SCREEN): void {
    setScreenValue({ screen });
  }

  function setTemplateToUse(template: Template | null): void {
    setTemplateToUseValue({ templateToUse: template });
  }

  const value = {
    screen: screenValue?.screen ?? SCREEN.HOME,
    templateToUse: templateToUseValue?.templateToUse ?? null,
    setTemplateToUse,
    setScreen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;

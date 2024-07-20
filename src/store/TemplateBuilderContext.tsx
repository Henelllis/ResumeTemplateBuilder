import { createContext, useState } from "react";
import { TemplateBuilderMode } from "../types";

export interface TemplateBuilderContextValue {
  mode: TemplateBuilderMode;
  setMode: (args: { mode: TemplateBuilderMode }) => void;
}

export const TemplateBuilderContext =
  createContext<TemplateBuilderContextValue>({
    mode: "BLOCK_PLACEMENT_EDIT",
    setMode: () => {},
  });

function TemplateBuilderContextProvider({ children }: { children: any }) {
  const [contextValue, setContextValue] = useState<Omit<
    TemplateBuilderContextValue,
    "setMode"
  > | null>(null);

  function setMode(args: { mode: TemplateBuilderMode }): void {
    console.log(args);
    setContextValue({
      mode: args.mode,
    });
  }

  const value = {
    mode: contextValue?.mode || "BLOCK_PLACEMENT_EDIT",
    setMode,
  };

  return (
    <TemplateBuilderContext.Provider value={value}>
      {children}
    </TemplateBuilderContext.Provider>
  );
}

export default TemplateBuilderContextProvider;

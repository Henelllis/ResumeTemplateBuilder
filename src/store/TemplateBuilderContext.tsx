import { createContext, useState } from "react";
import { TemplateBuilderMode } from "../types";

export interface TemplateBuilderContextValue {
  mode: TemplateBuilderMode;
  selectedSection: "header" | "primary" | "secondary" | null;
  setMode: (args: { mode: TemplateBuilderMode }) => void;
  setSelection: (args: {
    section: "header" | "primary" | "secondary" | null;
  }) => void;
}

export const TemplateBuilderContext =
  createContext<TemplateBuilderContextValue>({
    mode: "BLOCK_PLACEMENT_EDIT",
    selectedSection: null,
    setMode: () => {},
    setSelection: () => {},
  });

function TemplateBuilderContextProvider({ children }: { children: any }) {
  const [modeValue, setModeValue] = useState<Omit<
    TemplateBuilderContextValue,
    "setMode" | "selectedSection" | "setSelection"
  > | null>(null);

  const [sectionValue, setSectionValue] = useState<Omit<
    TemplateBuilderContextValue,
    "setMode" | "mode" | "setSelection"
  > | null>(null);

  function setMode(args: { mode: TemplateBuilderMode }): void {
    console.log(args);
    setModeValue({
      mode: args.mode,
    });
  }

  function setSelection(args: {
    section: "header" | "primary" | "secondary" | null;
  }): void {
    setSectionValue({
      selectedSection: args.section,
    });
  }

  const value = {
    mode: modeValue?.mode || "BLOCK_PLACEMENT_EDIT",
    selectedSection: sectionValue?.selectedSection || null,
    setMode,
    setSelection,
  };

  return (
    <TemplateBuilderContext.Provider value={value}>
      {children}
    </TemplateBuilderContext.Provider>
  );
}

export default TemplateBuilderContextProvider;

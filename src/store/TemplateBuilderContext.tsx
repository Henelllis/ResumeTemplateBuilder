import { createContext, useState } from "react";
import { BlockDescriptor, BlockState, TemplateBuilderMode } from "../types";

export interface TemplateBuilderContextValue {
  mode: TemplateBuilderMode;
  selectedSection: "header" | "primary" | "secondary" | null;
  templates: Array<Record<BlockDescriptor, BlockState>>;
  currentWorkingTemplate: Record<BlockDescriptor, BlockState> | null;
  setMode: (args: { mode: TemplateBuilderMode }) => void;
  setSelection: (args: {
    section: "header" | "primary" | "secondary" | null;
  }) => void;
  setCurrentWorkingTemplate: (args: {
    template: Record<BlockDescriptor, BlockState>;
  }) => void;
  setTemplates: (args: {
    templates: Array<Record<BlockDescriptor, BlockState>>;
  }) => void;
}

export const TemplateBuilderContext =
  createContext<TemplateBuilderContextValue>({
    mode: "BLOCK_PLACEMENT_EDIT",
    selectedSection: null,
    templates: [],
    currentWorkingTemplate: null,
    setMode: () => {},
    setSelection: () => {},
    setCurrentWorkingTemplate: () => {},
    setTemplates: () => {},
  });

function TemplateBuilderContextProvider({ children }: { children: any }) {
  const [modeValue, setModeValue] = useState<Omit<
    TemplateBuilderContextValue,
    | "setMode"
    | "selectedSection"
    | "setSelection"
    | "templates"
    | "currentWorkingTemplate"
    | "setCurrentWorkingTemplate"
    | "setTemplates"
  > | null>(null);

  const [sectionValue, setSectionValue] = useState<Omit<
    TemplateBuilderContextValue,
    | "setMode"
    | "mode"
    | "setSelection"
    | "templates"
    | "currentWorkingTemplate"
    | "setCurrentWorkingTemplate"
    | "setTemplates"
  > | null>(null);

  const [templatesValue, setTemplatesValue] = useState<Omit<
    TemplateBuilderContextValue,
    | "setMode"
    | "mode"
    | "selectedSection"
    | "setSelection"
    | "currentWorkingTemplate"
    | "setCurrentWorkingTemplate"
    | "setTemplates"
  > | null>(null);

  const [currentWorkingTemplateValue, setCurrentWorkingTemplateValue] =
    useState<Omit<
      TemplateBuilderContextValue,
      | "setMode"
      | "mode"
      | "selectedSection"
      | "setSelection"
      | "templates"
      | "setTemplates"
      | "setCurrentWorkingTemplate"
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

  function setCurrentWorkingTemplate(args: {
    template: Record<BlockDescriptor, BlockState> | null;
  }): void {
    setCurrentWorkingTemplateValue({
      currentWorkingTemplate: args.template,
    });
  }

  function setTemplates(args: {
    templates: Array<Record<BlockDescriptor, BlockState>>;
  }): void {
    setTemplatesValue({
      templates: args.templates,
    });
  }

  const value = {
    mode: modeValue?.mode || "BLOCK_PLACEMENT_EDIT",
    selectedSection: sectionValue?.selectedSection || null,
    templates: templatesValue?.templates || [],
    currentWorkingTemplate:
      currentWorkingTemplateValue?.currentWorkingTemplate || null,
    setMode,
    setCurrentWorkingTemplate,
    setTemplates,
    setSelection,
  };

  return (
    <TemplateBuilderContext.Provider value={value}>
      {children}
    </TemplateBuilderContext.Provider>
  );
}

export default TemplateBuilderContextProvider;

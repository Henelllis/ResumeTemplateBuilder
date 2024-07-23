import { createContext, useState } from "react";
import { BlockDescriptor, Resume } from "../types";

export interface ResumeFillingContextValue {
  templateData: Record<BlockDescriptor, any> | null;
  templates: Resume[];
  setTemplateData: (template: Record<BlockDescriptor, any> | null) => void;
  setTemplates: (templates: Resume[]) => void;
}

export const ResumeFillingContext = createContext<ResumeFillingContextValue>({
  templateData: null,
  templates: [],
  setTemplateData: () => {},
  setTemplates: () => {},
});

function ResumeFillingContextProvider({ children }: { children: any }) {
  const [templateDataValue, setTemplateDataValue] = useState<Omit<
    ResumeFillingContextValue,
    "setTemplateData" | "setTemplates" | "templates"
  > | null>(null);

  const [templatesValue, setTemplatesValue] = useState<Omit<
    ResumeFillingContextValue,
    "setTemplateData" | "setTemplates" | "templateData"
  > | null>(null);

  function setTemplateData(
    templateData: Record<BlockDescriptor, any> | null
  ): void {
    setTemplateDataValue({ templateData });
  }

  function setTemplates(templates: Resume[]): void {
    setTemplatesValue({ templates });
  }

  const value = {
    templateData: templateDataValue?.templateData ?? null,
    templates: templatesValue?.templates ?? [],
    setTemplates,
    setTemplateData,
  };

  return (
    <ResumeFillingContext.Provider value={value}>
      {children}
    </ResumeFillingContext.Provider>
  );
}

export default ResumeFillingContextProvider;

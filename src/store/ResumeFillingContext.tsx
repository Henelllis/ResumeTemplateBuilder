import { createContext, useState } from "react";
import { BlockDescriptor, SCREEN, Template } from "../types";

export interface ResumeFillingContextValue {
  templateData: Record<BlockDescriptor, any> | null;
  setTemplateData: (template: Record<BlockDescriptor, any> | null) => void;
}

export const ResumeFillingContext = createContext<ResumeFillingContextValue>({
  templateData: null,
  setTemplateData: () => {},
});

function ResumeFillingContextProvider({ children }: { children: any }) {
  const [templateDataValue, setTemplateDataValue] = useState<Omit<
    ResumeFillingContextValue,
    "setTemplateData"
  > | null>(null);

  function setTemplateData(
    templateData: Record<BlockDescriptor, any> | null
  ): void {
    console.log("DO THIS setTemplateData", templateData);
    setTemplateDataValue({ templateData });
  }

  const value = {
    templateData: templateDataValue?.templateData ?? null,
    setTemplateData,
  };

  return (
    <ResumeFillingContext.Provider value={value}>
      {children}
    </ResumeFillingContext.Provider>
  );
}

export default ResumeFillingContextProvider;

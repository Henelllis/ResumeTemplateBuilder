import { createContext, useState } from "react";
import { BlockDescriptor, Resume } from "../types";

export interface ResumeFillingContextValue {
  templateData: Record<BlockDescriptor, any> | null;
  resumes: Resume[];
  setTemplateData: (template: Record<BlockDescriptor, any> | null) => void;
  setResumes: (resumes: Resume[]) => void;
}

export const ResumeFillingContext = createContext<ResumeFillingContextValue>({
  templateData: null,
  resumes: [],
  setTemplateData: () => {},
  setResumes: () => {},
});

function ResumeFillingContextProvider({ children }: { children: any }) {
  const [templateDataValue, setTemplateDataValue] = useState<Omit<
    ResumeFillingContextValue,
    "setTemplateData" | "setResumes" | "resumes"
  > | null>(null);

  const [templatesValue, setTemplatesValue] = useState<Omit<
    ResumeFillingContextValue,
    "setTemplateData" | "setResumes" | "templateData"
  > | null>(null);

  function setTemplateData(
    templateData: Record<BlockDescriptor, any> | null
  ): void {
    setTemplateDataValue({ templateData });
  }

  function setResumes(resumes: Resume[]): void {
    setTemplatesValue({ resumes });
  }

  const value = {
    templateData: templateDataValue?.templateData ?? null,
    resumes: templatesValue?.resumes ?? [],
    setResumes,
    setTemplateData,
  };

  return (
    <ResumeFillingContext.Provider value={value}>
      {children}
    </ResumeFillingContext.Provider>
  );
}

export default ResumeFillingContextProvider;

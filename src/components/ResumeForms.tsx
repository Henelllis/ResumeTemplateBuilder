import React, { useContext, useEffect } from "react";
import { Container, Box } from "@mui/material";
import CollapsibleCard from "./CollapsibleCard";

import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { AppContext } from "../store/AppContext";
import {
  BlockDescriptor,
  ConfigType,
  Entry,
  Item,
  Resume,
  SCREEN,
  Template,
} from "../types";
import TimeSpanForm from "./TimeSpanForm";
import { ResumeFillingContext } from "../store/ResumeFillingContext";
import SimpleListForm from "./SimpleListForm";
import SimpleTextForm from "./SimpleTextForm";
import ContactInfoForm from "./ContactInfoForm";

const ResumeForm = () => {
  const { selectedSection } = useContext(TemplateBuilderContext);
  const { templateToUse, setScreen } = useContext(AppContext);
  const { templateData, setTemplateData, setResumes, resumes } =
    useContext(ResumeFillingContext);
  const [localTemplateData, setLocalTemplateData] = React.useState<
    Record<BlockDescriptor, any>
  >({
    [BlockDescriptor.Name]: "",
    [BlockDescriptor.Description]: "",
    [BlockDescriptor.ContactInfo]: {
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      toggleAddress: true,
      toggleEmail: true,
      togglePhone: true,
      toggleLinkedIn: false,
    },
    [BlockDescriptor.Education]: [],
    [BlockDescriptor.Experience]: [],
    [BlockDescriptor.Skills]: [],
    [BlockDescriptor.Certifications]: [],
    [BlockDescriptor.References]: [],
  } as Record<BlockDescriptor, any>);

  useEffect(() => {
    if (templateData) {
      setLocalTemplateData(templateData);
    }
  }, []);

  useEffect(() => {
    setTemplateData(localTemplateData);
  }, [localTemplateData]);

  let blocks: Array<Item> = [];

  const { headerBlocks, primaryBlocks, secondaryBlocks } =
    templateToUse as Template;

  if (selectedSection === "header") {
    blocks = [...headerBlocks];
  } else if (selectedSection === "primary") {
    blocks = [...primaryBlocks];
  } else if (selectedSection === "secondary") {
    blocks = [...secondaryBlocks];
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          boxShadow: 3,
          width: "100%",
          height: "100%",
          p: 2,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <button
          onClick={() => {
            if (!templateData) {
              return null;
            }

            const id = `${templateData[BlockDescriptor.Name]}-1`;

            // Check if the resume already exists and get its index
            const resumeIndex = resumes.findIndex((resume) => resume.id === id);

            if (resumeIndex !== -1) {
              const newResumes = [...resumes];
              newResumes[resumeIndex] = {
                ...newResumes[resumeIndex],
                templateData: localTemplateData,
              };
              setResumes(newResumes);
            } else {
              const resume: Resume = {
                id: `${templateData[BlockDescriptor.Name]}-1`,
                name: templateData[BlockDescriptor.Name],
                template: templateToUse as Template,
                templateData: localTemplateData,
              };

              setResumes([...resumes, resume]);
            }

            setScreen(SCREEN.RESUME_FILLING_ADD_OR_EDIT);
          }}
          style={{
            padding: "10px",
            borderRadius: "20px",
            width: "200px",
            marginRight: "60px",
            border: "none",
            backgroundColor: "green",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          {"SAVE RESUME"}
        </button>
        <button
          onClick={() => {}}
          style={{
            padding: "10px",
            borderRadius: "20px",
            width: "200px",
            border: "none",
            backgroundColor: "blue",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          {"DOWNLOAD RESUME"}
        </button>

        {blocks.map((block) => {
          const { id, content, configType } = block;

          const data = localTemplateData[content];

          const handleInputChange = (value: any) => {
            setLocalTemplateData({
              ...localTemplateData,
              [content]: value,
            } as Record<BlockDescriptor, any>);
          };

          return (
            <CollapsibleCard
              isAutomaticallyExpanded={true}
              key={block.id}
              title={block.content}
            >
              <FormFromConfig
                configType={configType}
                data={data}
                handleInputChange={handleInputChange}
              />
            </CollapsibleCard>
          );
        })}
      </Box>
    </Container>
  );
};

export default ResumeForm;

const FormFromConfig = ({
  configType,
  handleInputChange,
  data,
}: {
  configType: ConfigType;
  handleInputChange: (value: any) => void;
  data: any;
}) => {
  switch (configType) {
    case "TIME_SPAN":
      return <TimeSpanForm data={data} handleInputChange={handleInputChange} />;
    case "LIST":
      return (
        <SimpleListForm data={data} handleInputChange={handleInputChange} />
      );
    case "DETAIL":
      return (
        <SimpleTextForm data={data} handleInputChange={handleInputChange} />
      );
    case "TEXT":
      return (
        <SimpleTextForm data={data} handleInputChange={handleInputChange} />
      );
    case "CONTACT":
      return (
        <ContactInfoForm data={data} handleInputChange={handleInputChange} />
      );
    default:
      return null;
  }
};

import React, { useContext, useEffect } from "react";
import { Container, Box } from "@mui/material";
import CollapsibleCard from "./CollapsibleCard";

import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { AppContext } from "../store/AppContext";
import { BlockDescriptor, ConfigType, Entry, Item, Template } from "../types";
import TimeSpanForm from "./TimeSpanForm";
import { ResumeFillingContext } from "../store/ResumeFillingContext";
import SimpleListForm from "./SimpleListForm";
import SimpleTextForm from "./SimpleTextForm";
import ContactInfoForm from "./ContactInfoForm";

const ResumeForm = () => {
  const { selectedSection } = useContext(TemplateBuilderContext);
  const { templateToUse } = useContext(AppContext);
  const { templateData, setTemplateData } = useContext(ResumeFillingContext);
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
    setTemplateData(localTemplateData);

    console.log("set up templateData in USE EFFECT", templateData);
  }, [localTemplateData]);

  let blocks: Array<Item> = [];
  console.log("localTemplateData", localTemplateData);

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
  console.log(configType);
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
      return <ContactInfoForm />;
    default:
      return null;
  }
};

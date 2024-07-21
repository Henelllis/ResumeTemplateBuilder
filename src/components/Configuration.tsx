import React, { useContext } from "react";
import CollapsibleCard from "./CollapsibleCard";
import { CardContent, Typography } from "@mui/material";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";
import DocumentConfig from "./DocumentConfig";

function Configuration() {
  const { selectedSection, setSelection } = useContext(TemplateBuilderContext);
  const { blocks } = useContext(BlockContext);

  if (!selectedSection) {
    return (
      <div style={{ width: "80%" }}>
        <CollapsibleCard
          key={"DOCUMENT"}
          title="DOCUMENT"
          isAutomaticallyExpanded
        >
          <DocumentConfig />
        </CollapsibleCard>
      </div>
    );
  } else {
    let blockConfigs = null;

    if (selectedSection === "header") {
      blockConfigs = blocks.headerBlockList;
    } else if (selectedSection === "primary") {
      blockConfigs = blocks.primaryBlockList;
    } else if (selectedSection === "secondary") {
      blockConfigs = blocks.secondaryBlockList;
    }

    if (!blockConfigs) {
      return null;
    }

    return (
      <div style={{ width: "80%" }}>
        <CollapsibleCard
          key={selectedSection}
          title={selectedSection}
          isAutomaticallyExpanded
        >
          <CardContent>
            <Typography paragraph>Additional content can go here.</Typography>
          </CardContent>
        </CollapsibleCard>
        {blockConfigs.map((block) => (
          <CollapsibleCard
            key={block.id}
            title={block.content}
            isAutomaticallyExpanded={false}
          >
            <CardContent>
              <Typography paragraph>Additional content can go here.</Typography>
            </CardContent>
          </CollapsibleCard>
        ))}
      </div>
    );
  }

  return null;
}

export default Configuration;

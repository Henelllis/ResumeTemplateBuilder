import { useContext } from "react";
import CollapsibleCard from "./CollapsibleCard";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";
import DocumentConfig from "./DocumentConfig";
import SectionConfig from "./SectionConfig";
import { blockConfigMap, BlockDescriptor } from "../types";

function Configuration() {
  const { selectedSection } = useContext(TemplateBuilderContext);
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
          <SectionConfig />
        </CollapsibleCard>
        {blockConfigs.map((block) => (
          <CollapsibleCard
            key={block.id}
            title={block.content}
            isAutomaticallyExpanded={false}
          >
            <BlockConfig blockDescriptor={block.content} />
          </CollapsibleCard>
        ))}
      </div>
    );
  }

  return null;
}

export default Configuration;

function BlockConfig({
  blockDescriptor,
}: {
  blockDescriptor: BlockDescriptor;
}) {
  const configType = blockConfigMap[blockDescriptor];

  switch (configType) {
    case "TEXT":
      return <SectionConfig />;
    case "CONTACT":
      return <SectionConfig />;
    case "TIME_SPAN":
      return <SectionConfig />;
    case "LIST":
      return <SectionConfig />;
    case "DETAIL":
      return <SectionConfig />;
    default:
      return null;
  }
}

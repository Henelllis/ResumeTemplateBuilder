import { useContext } from "react";
import CollapsibleCard from "./CollapsibleCard";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";
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
          <SectionConfig blockDescriptor={BlockDescriptor.document} />
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
          <BlockConfig blockDescriptor={selectedSection as BlockDescriptor} />
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
      return <SectionConfig blockDescriptor={blockDescriptor} />;
    case "CONTACT":
      return <SectionConfig blockDescriptor={blockDescriptor} />;
    case "TIME_SPAN":
      return <SectionConfig blockDescriptor={blockDescriptor} />;
    case "LIST":
      return <SectionConfig blockDescriptor={blockDescriptor} />;
    case "DETAIL":
      return <SectionConfig blockDescriptor={blockDescriptor} />;
    default:
      return <SectionConfig blockDescriptor={blockDescriptor} />;
  }
}

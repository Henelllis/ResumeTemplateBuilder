import { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import { BlockDescriptor, Item } from "../types";
import { getPrimaryAndSecondaryColor, inchesToPixels } from "../utils";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import BlockRenderer from "./BlockRenderer";

function BlockTemplateResumePreview({
  widthInInches,
  heightInInches,
  dpi,
  blocks,
}: {
  widthInInches: number;
  heightInInches: number;
  dpi: number;
  blocks: {
    headerBlockList: Array<Item>;
    primaryBlockList: Array<Item>;
    secondaryBlockList: Array<Item>;
  };
}) {
  const { mode, setSelection } = useContext(TemplateBuilderContext);

  const { currentWorkingTemplate } = useContext(TemplateBuilderContext);
  const headerHeightInInches = 2;
  const bodyHeightInInches = heightInInches - headerHeightInInches;

  const headerHeightInPixels = inchesToPixels(headerHeightInInches, dpi);
  const bodyHeightInPixels = inchesToPixels(bodyHeightInInches, 80);

  const primaryWidthInInches = widthInInches * 0.7;
  const secondaryWidthInInches = widthInInches * 0.3;

  const widthInPixels = inchesToPixels(widthInInches, 80);
  const heightInPixels = inchesToPixels(heightInInches, 80);

  const isBlockMode = mode === "BLOCK_PLACEMENT_EDIT";

  if (!currentWorkingTemplate) {
    return null;
  }

  const style = currentWorkingTemplate[BlockDescriptor.document];
  const [primaryColor, secondaryColor] = getPrimaryAndSecondaryColor(
    style.colorScheme
  );

  console.log("primaryColor" + primaryColor);
  console.log("secondaryColor" + secondaryColor);
  return (
    <Container
      widthInPixels={widthInPixels}
      heightInPixels={heightInPixels}
      overrideStyles={{
        padding: style.margin * -10,
      }}
    >
      {isBlockMode ? (
        <Droppable droppableId={"headerBlockList"}>
          {(provided) => (
            <Container
              droppableProps={provided.droppableProps}
              droppableInnerRef={provided.innerRef}
              widthInPixels={widthInPixels}
              heightInPixels={headerHeightInPixels}
              backgroundColor="lightgrey"
              section="header"
            >
              header
              <DraggableList blockList={blocks.headerBlockList} />
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      ) : (
        <Container
          widthInPixels={widthInPixels}
          heightInPixels={headerHeightInPixels}
          backgroundColor="lightgrey"
          section="header"
          overrideStyles={{ backgroundColor: primaryColor }}
        >
          {blocks.headerBlockList.map((block) => (
            <BlockRenderer isHeader key={block.id} content={block.content} />
          ))}
        </Container>
      )}

      <div
        style={{
          width: `${widthInPixels}px`,
          height: `${bodyHeightInPixels}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {isBlockMode ? (
            <Droppable droppableId={"primaryBlockList"}>
              {(provided) => (
                <Container
                  droppableProps={provided.droppableProps}
                  droppableInnerRef={provided.innerRef}
                  widthInPixels={inchesToPixels(primaryWidthInInches, dpi)}
                  heightInPixels={bodyHeightInPixels}
                  section="primary"
                >
                  Primary
                  <DraggableList blockList={blocks.primaryBlockList} />
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          ) : (
            <Container
              widthInPixels={inchesToPixels(primaryWidthInInches, dpi)}
              heightInPixels={bodyHeightInPixels}
              backgroundColor="#FAF9F6"
              section="primary"
              overrideStyles={{ backgroundColor: secondaryColor }}
            >
              {blocks.primaryBlockList.map((block) => (
                <BlockRenderer
                  isHeader={false}
                  key={block.id}
                  content={block.content}
                />
              ))}
            </Container>
          )}
          {isBlockMode ? (
            <Droppable droppableId={"secondaryBlockList"}>
              {(provided) => (
                <Container
                  droppableProps={provided.droppableProps}
                  droppableInnerRef={provided.innerRef}
                  widthInPixels={inchesToPixels(secondaryWidthInInches, dpi)}
                  heightInPixels={bodyHeightInPixels}
                  backgroundColor="lightcoral"
                  section="secondary"
                >
                  Secondary
                  <DraggableList blockList={blocks.secondaryBlockList} />
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          ) : (
            <Container
              widthInPixels={inchesToPixels(secondaryWidthInInches, dpi)}
              heightInPixels={bodyHeightInPixels}
              backgroundColor="wheat"
              section="secondary"
              overrideStyles={{ backgroundColor: secondaryColor }}
            >
              {blocks.secondaryBlockList.map((block) => (
                <BlockRenderer
                  isHeader={false}
                  key={block.id}
                  content={block.content}
                />
              ))}
            </Container>
          )}
        </div>
      </div>
    </Container>
  );
}

export default BlockTemplateResumePreview;

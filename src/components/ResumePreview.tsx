import { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import { BlockDescriptor, BlockState, Item } from "../types";
import { getPrimaryAndSecondaryColor, inchesToPixels } from "../utils";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import BlockRenderer from "./BlockRenderer";

function ResumePreview({
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

  const documentStyle = currentWorkingTemplate[
    BlockDescriptor.document
  ] as BlockState;
  if (!documentStyle) {
    return null;
  }
  const headerStyle = currentWorkingTemplate[BlockDescriptor.header];

  const headerColor = getPrimaryAndSecondaryColor(
    headerStyle.colorScheme || "Default"
  )?.[0];

  console.log("headerColor", headerColor);
  console.log("headerStyle currentWorkingTemplate", headerStyle);
  const primaryStyle = currentWorkingTemplate[BlockDescriptor.primary];

  const primarySectionColor = getPrimaryAndSecondaryColor(
    primaryStyle.colorScheme || "Default"
  )?.[0];

  const secondaryStyle = currentWorkingTemplate[BlockDescriptor.secondary];

  const secondarySectionColor = getPrimaryAndSecondaryColor(
    secondaryStyle.colorScheme || "Default"
  )?.[0];

  const [primaryColor, secondaryColor] = getPrimaryAndSecondaryColor(
    documentStyle.colorScheme || "Default"
  ) || ["", ""];

  console.log("secondarySectionColor", secondarySectionColor);
  console.log("primarySectionColor", primarySectionColor);

  return (
    <Container
      widthInPixels={widthInPixels}
      heightInPixels={heightInPixels}
      overrideStyles={{
        padding: documentStyle.margin || 0 * -10,
      }}
    >
      {isBlockMode ? (
        <Droppable droppableId={"headerBlockList"}>
          {(provided) => (
            <Container
              droppableProps={provided.droppableProps}
              droppableInnerRef={provided.innerRef}
              widthInPixels={widthInPixels}
              backgroundColor="lightgrey"
              heightInPixels={headerHeightInPixels}
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
          section="header"
          overrideStyles={{
            backgroundColor: headerColor || primaryColor,
            fontSize: headerStyle.fontSize || documentStyle.fontSize,
            fontFamily: headerStyle.fontType || documentStyle.fontType,
          }}
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
                  backgroundColor="lightblue"
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
              overrideStyles={{
                backgroundColor: primarySectionColor || secondaryColor,
                fontSize: primaryStyle.fontSize || documentStyle.fontSize,
                fontFamily: primaryStyle.fontType || documentStyle.fontType,
              }}
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
              overrideStyles={{
                backgroundColor: secondarySectionColor || secondaryColor,
                fontSize: secondaryStyle.fontSize || documentStyle.fontSize,
                fontFamily: secondaryStyle.fontType || documentStyle.fontType,
              }}
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

export default ResumePreview;

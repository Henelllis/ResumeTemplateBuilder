import React from "react";
import Container from "./Container";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import { Item } from "../types";
import { inchesToPixels } from "../utils";

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
  const headerHeightInInches = 2;
  const bodyHeightInInches = heightInInches - headerHeightInInches;

  const headerHeightInPixels = inchesToPixels(headerHeightInInches, dpi);
  const bodyHeightInPixels = inchesToPixels(bodyHeightInInches, 80);

  const primaryWidthInInches = widthInInches * 0.7;
  const secondaryWidthInInches = widthInInches * 0.3;

  const widthInPixels = inchesToPixels(widthInInches, 80);
  const heightInPixels = inchesToPixels(heightInInches, 80);

  return (
    <Container
      widthInPixels={widthInPixels}
      heightInPixels={heightInPixels}
      backgroundColor="red"
    >
      <Droppable droppableId={"headerBlockList"}>
        {(provided) => (
          <Container
            droppableProps={provided.droppableProps}
            droppableInnerRef={provided.innerRef}
            widthInPixels={widthInPixels}
            heightInPixels={headerHeightInPixels}
            backgroundColor="lightgrey"
          >
            header
            <DraggableList blockList={blocks.headerBlockList} />
            {provided.placeholder}
          </Container>
        )}
      </Droppable>

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
          <Droppable droppableId={"primaryBlockList"}>
            {(provided) => (
              <Container
                droppableProps={provided.droppableProps}
                droppableInnerRef={provided.innerRef}
                widthInPixels={inchesToPixels(primaryWidthInInches, dpi)}
                heightInPixels={bodyHeightInPixels}
                backgroundColor="lightgreen"
              >
                Primary
                <DraggableList blockList={blocks.primaryBlockList} />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          <Droppable droppableId={"secondaryBlockList"}>
            {(provided) => (
              <Container
                droppableProps={provided.droppableProps}
                droppableInnerRef={provided.innerRef}
                widthInPixels={inchesToPixels(secondaryWidthInInches, dpi)}
                heightInPixels={bodyHeightInPixels}
                backgroundColor="lightcoral"
              >
                Secondary
                <DraggableList blockList={blocks.secondaryBlockList} />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </div>
      </div>
    </Container>
  );
}

export default BlockTemplateResumePreview;

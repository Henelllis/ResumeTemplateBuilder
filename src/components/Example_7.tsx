import { useContext, useEffect, useState } from "react";
import {
  BlockDescriptor,
  BlockListKey,
  Item,
  TemplateBuilderMode,
  TemplateLayout,
} from "../types";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import "./ShowPlaceHolderDocument.css";
import { BlockContext } from "../store/blockContext";
import DraggableList from "./DraggableList";
import BlockTemplateResumePreview from "./BlockTemplateResumePreview";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";

const Example_7: React.FC<{ layout: TemplateLayout }> = ({ layout }) => {
  const { blocks, blockRules, setBlocks } = useContext(BlockContext);
  const { mode, setMode } = useContext(TemplateBuilderContext);

  const [dpi, setDpi] = useState(96); // Default DPI

  useEffect(() => {
    setBlocks({
      headerBlockList: [],
      primaryBlockList: [],
      secondaryBlockList: [],
      selectionBlockList: [
        { id: "1", content: BlockDescriptor.Name },
        { id: "2", content: BlockDescriptor.ContactInfo },
        { id: "3", content: BlockDescriptor.Education },
        { id: "4", content: BlockDescriptor.Skills },
        { id: "5", content: BlockDescriptor.Experience },
        { id: "6", content: BlockDescriptor.Description },
        { id: "7", content: BlockDescriptor.Certifications },
        { id: "8", content: BlockDescriptor.References },
        { id: "9", content: BlockDescriptor.Title },
      ],
    });
  }, []);

  useEffect(() => {
    const estimateDPI = () => {
      const screenWidthPx = window.screen.width;
      const screenHeightPx = window.screen.height;
      const screenWidthInch =
        window.screen.width / window.devicePixelRatio / 80;
      const screenHeightInch =
        window.screen.height / window.devicePixelRatio / 80;
      const diagonalPx = Math.sqrt(screenWidthPx ** 2 + screenHeightPx ** 2);
      const diagonalInch = Math.sqrt(
        screenWidthInch ** 2 + screenHeightInch ** 2
      );
      const estimatedDPI = diagonalPx / diagonalInch;
      setDpi(estimatedDPI);
    };

    estimateDPI();
    window.addEventListener("resize", estimateDPI);

    return () => {
      window.removeEventListener("resize", estimateDPI);
    };
  }, []);

  const widthInInches = 8.27;
  const heightInInches = 11.69;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(JSON.stringify(source), JSON.stringify(destination));

    if (!destination) {
      return;
    }

    const content = blocks[source.droppableId as BlockListKey][source.index]
      .content as BlockDescriptor;

    if (
      blockRules[destination.droppableId as BlockListKey].disallowList.includes(
        content
      )
    ) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Function to get list by droppable ID
    const getListById = (id: BlockListKey): Item[] => {
      return blocks[id] || [];
    };

    // Get source and destination lists
    const sourceList = Array.from(
      getListById(source.droppableId as BlockListKey)
    );
    const destinationList = Array.from(
      getListById(destination.droppableId as BlockListKey)
    );

    // Move item within the same list
    if (source.droppableId === destination.droppableId) {
      const [movedItem] = sourceList.splice(source.index, 1);
      sourceList.splice(destination.index, 0, movedItem);
      setBlocks({
        ...blocks,
        [source.droppableId]: sourceList,
      });
    } else {
      // Move item to different list
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);
      setBlocks({
        ...blocks,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      });
    }
  };

  const isValidToSwitchToEdit = () => {
    if (
      !!blocks.headerBlockList.find(
        (item) =>
          item.content === BlockDescriptor.Name ||
          item.content === BlockDescriptor.Title
      ) &&
      !!blocks.primaryBlockList.find(
        (item) => item.content === BlockDescriptor.Experience
      ) &&
      blocks.secondaryBlockList.length >= 1
    ) {
      return true;
    }

    return false;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="document-container">
          <BlockTemplateResumePreview
            widthInInches={widthInInches}
            heightInInches={heightInInches}
            dpi={dpi}
            blocks={blocks}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "90vh",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <h2>
              {mode === "BLOCK_PLACEMENT_EDIT"
                ? "Block Placement Mode"
                : "Preview Mode"}
            </h2>
            <button
              disabled={!isValidToSwitchToEdit()}
              onClick={() => {
                const newMode =
                  mode === "BLOCK_PLACEMENT_EDIT"
                    ? "HTML_EDIT"
                    : "BLOCK_PLACEMENT_EDIT";

                if (isValidToSwitchToEdit()) {
                  console.log("Switching to", newMode);
                  setMode({
                    mode: newMode,
                  });
                }
              }}
              style={{
                padding: "10px",
                borderRadius: "20px",
                width: "200px",
                border: "none",
                backgroundColor: isValidToSwitchToEdit() ? "green" : "grey",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              {mode === "BLOCK_PLACEMENT_EDIT"
                ? "Edit Mode"
                : "Block Placement Mode"}
            </button>
          </div>
          <h3>
            Please Drag and drop these blocks to where you want them to be in
            the resume
          </h3>
          <Droppable droppableId={"selectionBlockList"}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  padding: "20px",
                  backgroundColor: "lightgrey",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DraggableList blockList={blocks.selectionBlockList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Example_7;

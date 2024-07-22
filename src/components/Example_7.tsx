import { useContext, useEffect, useState } from "react";
import {
  BlockDescriptor,
  BlockListKey,
  blockStateMap,
  ConfigType,
  Item,
  TemplateBuilderMode,
  TemplateLayout,
} from "../types";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import "./document.css";
import { BlockContext } from "../store/blockContext";
import DraggableList from "./DraggableList";
import BlockTemplateResumePreview from "./BlockTemplateResumePreview";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import ConfigControl from "./ConfigControl";

const Example_7: React.FC<{ layout: TemplateLayout }> = ({ layout }) => {
  const { blocks, blockRules, setBlocks } = useContext(BlockContext);
  const { currentWorkingTemplate, setCurrentWorkingTemplate } = useContext(
    TemplateBuilderContext
  );

  const [dpi, setDpi] = useState(96); // Default DPI

  useEffect(() => {
    setBlocks({
      headerBlockList: [],
      primaryBlockList: [],
      secondaryBlockList: [],
      selectionBlockList: [
        { id: "1", content: BlockDescriptor.Name, configType: ConfigType.TEXT },
        {
          id: "2",
          content: BlockDescriptor.ContactInfo,
          configType: ConfigType.CONTACT,
        },
        {
          id: "3",
          content: BlockDescriptor.Education,
          configType: ConfigType.TIME_SPAN,
        },
        {
          id: "4",
          content: BlockDescriptor.Experience,
          configType: ConfigType.TIME_SPAN,
        },

        {
          id: "5",
          content: BlockDescriptor.Skills,
          configType: ConfigType.LIST,
        },
        {
          id: "6",
          content: BlockDescriptor.Description,
          configType: ConfigType.TEXT,
        },
        {
          id: "7",
          content: BlockDescriptor.Certifications,
          configType: ConfigType.DETAIL,
        },
        {
          id: "8",
          content: BlockDescriptor.References,
          configType: ConfigType.DETAIL,
        },
        {
          id: "9",
          content: BlockDescriptor.Title,
          configType: ConfigType.TEXT,
        },
      ],
    });
    setCurrentWorkingTemplate({
      template: blockStateMap,
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
        <ConfigControl />
      </div>
    </DragDropContext>
  );
};

export default Example_7;

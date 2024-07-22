import { useContext, useEffect, useState } from "react";
import {
  BlockDescriptor,
  BlockListKey,
  blockStateMap,
  ConfigType,
  Item,
  SCREEN,
  TemplateLayout,
} from "../types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./document.css";
import { BlockContext } from "../store/blockContext";
import BlockTemplateResumePreview from "./BlockTemplateResumePreview";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import ConfigControl from "./ConfigControl";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppContext } from "../store/AppContext";

const TemplateResumeBuilder: React.FC<{ layout: TemplateLayout }> = ({
  layout,
}) => {
  const { blocks, blockRules, setBlocks } = useContext(BlockContext);
  const { mode, setMode, currentWorkingTemplate, setCurrentWorkingTemplate } =
    useContext(TemplateBuilderContext);

  const { setScreen, templateToUse } = useContext(AppContext);

  const [dpi, setDpi] = useState(96); // Default DPI

  useEffect(() => {
    if (templateToUse) {
      setBlocks({
        headerBlockList: templateToUse.headerBlocks,
        primaryBlockList: templateToUse.primaryBlocks,
        secondaryBlockList: templateToUse.secondaryBlocks,
        selectionBlockList: templateToUse.selectionBlocks, //TODO : Add selection block list KEEP TRACK OF UNUSED BLOCKS
      });
      setCurrentWorkingTemplate({
        template: templateToUse.styles,
      });
      setMode({
        mode: "HTML_EDIT",
      });
    } else {
      setBlocks({
        headerBlockList: [],
        primaryBlockList: [],
        secondaryBlockList: [],
        selectionBlockList: [
          {
            id: "1",
            content: BlockDescriptor.Name,
            configType: ConfigType.TEXT,
          },
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
    }
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

  const handleBackClick = () => {
    // Navigate back or set screen to the previous state
    setScreen(SCREEN.TEMPLATE_ADD_OR_EDIT); // Replace with appropriate screen or navigation action
    setMode({
      mode: "BLOCK_PLACEMENT_EDIT",
    });
  };

  if (!currentWorkingTemplate) return null;

  const style = currentWorkingTemplate[BlockDescriptor.document];

  return (
    <div className="app">
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "text.primary",
        }}
        onClick={handleBackClick}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="document-container"
          style={{
            fontSize: style.fontSize,
            fontFamily: style.fontType,
          }}
        >
          <BlockTemplateResumePreview
            widthInInches={widthInInches}
            heightInInches={heightInInches}
            dpi={dpi}
            blocks={blocks}
          />
        </div>
        <ConfigControl />
      </DragDropContext>
    </div>
  );
};

export default TemplateResumeBuilder;

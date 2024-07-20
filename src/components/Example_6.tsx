import { useContext, useEffect, useState } from "react";
import { BlockListKey, Item, TemplateLayout } from "../types";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import "./ShowPlaceHolderDocument.css";
import { BlockContext } from "../store/blockContext";

const Example_6: React.FC<{ layout: TemplateLayout }> = ({ layout }) => {
  const { blocks, setBlocks } = useContext(BlockContext);

  const [dpi, setDpi] = useState(96); // Default DPI

  useEffect(() => {
    setBlocks({
      headerBlockList: [],
      primaryBlockList: [],
      secondaryBlockList: [],
      selectionBlockList: [
        // { id: "1", content: "Contact Info" },
        // { id: "2", content: "Name" },
        // { id: "3", content: "Education" },
        // { id: "4", content: "Skills" },
        // { id: "5", content: "Experience" },
        // { id: "6", content: "Description" },
        // { id: "7", content: "Certifications" },
        // { id: "8", content: "References" },
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

  const inchesToPixels = (inches: number, dpi: number) => inches * dpi;

  const widthInInches = 8.27;
  const heightInInches = 11.69;

  const headerHeightInInches = 2;
  const bodyHeightInInches = heightInInches - headerHeightInInches;

  const headerHeightInPixels = inchesToPixels(headerHeightInInches, dpi);
  const bodyHeightInPixels = inchesToPixels(bodyHeightInInches, 80);

  const primaryWidthInInches = widthInInches * 0.7;
  const secondaryWidthInInches = widthInInches * 0.3;

  const widthInPixels = inchesToPixels(widthInInches, 80);
  const heightInPixels = inchesToPixels(heightInInches, 80);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
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

  const setBlockList = ({
    sourceId,
    destinationId,
    sourceItems,
    destinationItems,
  }: {
    sourceId: BlockListKey;
    destinationId: BlockListKey;
    sourceItems: Item[];
    destinationItems: Item[];
  }) => {
    setBlocks({
      ...blocks,
      [sourceId]: sourceItems,
      [destinationId]: destinationItems,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="document-container">
          <div
            className="document"
            style={{
              width: `${widthInPixels}px`,
              height: `${heightInPixels}px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              backgroundColor: "red",
            }}
          >
            <Droppable droppableId={"headerBlockList"}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    width: `${widthInPixels}px`,
                    height: `${headerHeightInPixels}px`,
                    backgroundColor: "lightgrey",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  header
                  {blocks.headerBlockList.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: "16px",
                            borderRadius: "10px",

                            margin: "0 0 8px 0",
                            width: "100px",
                            textAlign: "center",
                            //   minHeight: "25px",
                            backgroundColor: "#456C86",
                            color: "white",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div
              style={{
                width: `${widthInPixels}px`,
                height: `${bodyHeightInPixels}px`,
                backgroundColor: "lightblue",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Droppable droppableId={"primaryBlockList"}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        width: `${inchesToPixels(primaryWidthInInches, dpi)}px`,
                        height: `${bodyHeightInPixels}px`,
                        backgroundColor: "lightgreen",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Primary
                      {blocks.primaryBlockList.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: "16px",
                                borderRadius: "10px",

                                margin: "0 0 8px 0",
                                width: "100px",
                                textAlign: "center",
                                //   minHeight: "25px",
                                backgroundColor: "#456C86",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId={"secondaryBlockList"}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        width: `${inchesToPixels(
                          secondaryWidthInInches,
                          dpi
                        )}px`,
                        height: `${bodyHeightInPixels}px`,

                        backgroundColor: "lightcoral",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Secondary
                      {blocks.secondaryBlockList.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: "16px",
                                borderRadius: "10px",

                                margin: "0 0 8px 0",
                                width: "100px",
                                textAlign: "center",
                                //   minHeight: "25px",
                                backgroundColor: "#456C86",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "lightgrey",
            height: "90vh",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "50%",
          }}
        >
          <Droppable droppableId={"selectionBlockList"}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  // width: `${widthInPixels}px`,
                  // height: `${headerHeightInPixels}px`,
                  padding: "20px",
                  backgroundColor: "lightgrey",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {blocks.selectionBlockList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "16px",
                          borderRadius: "10px",

                          margin: "0 0 8px 0",
                          width: "100px",
                          textAlign: "center",
                          //   minHeight: "25px",
                          backgroundColor: "#456C86",
                          color: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Example_6;

import { useEffect, useState } from "react";
import { Item, TemplateLayout } from "../types";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { getListById, setListById } from "../utils";
import DraggableArea from "./DraggableArea";
import "./ShowPlaceHolderDocument.css";

const initialItems: Item[] = [
  // { id: "1", content: "Contact Info" },
  // { id: "2", content: "Name" },
  // { id: "3", content: "Education" },
  // { id: "4", content: "Skills" },
  // { id: "5", content: "Experience" },
  // { id: "6", content: "Description" },
  // { id: "7", content: "Certifications" },
  // { id: "8", content: "References" },
];

const headerList: Item[] = [
  // { id: "1", content: "Contact Info" },
  // { id: "2", content: "Name" },
];

const Example_5: React.FC<{ layout: TemplateLayout }> = ({ layout }) => {
  const [lists, setLists] = useState<{ [key: string]: Item[] }>({
    list1: [],
    list2: [],
    list3: initialItems,
    list4: [],
  });

  const [dpi, setDpi] = useState(96); // Default DPI

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

    const sourceList = getListById(source.droppableId, lists);
    const destinationList = getListById(destination.droppableId, lists);

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setListById(source.droppableId, sourceList, lists, setLists);
    setListById(destination.droppableId, destinationList, lists, setLists);
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
            <Droppable droppableId={"list4"}>
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
                  {lists.list4.map((item, index) => (
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
                <Droppable droppableId={"list1"}>
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
                      {lists.list1.map((item, index) => (
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
                <Droppable droppableId={"list2"}>
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
                      {lists.list2.map((item, index) => (
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
          <Droppable droppableId={"list3"}>
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
                {lists.list3.map((item, index) => (
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

export default Example_5;

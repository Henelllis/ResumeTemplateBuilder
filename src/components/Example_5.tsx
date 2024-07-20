import { useEffect, useState } from "react";
import { Item, TemplateLayout } from "../types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getListById, setListById } from "../utils";
import DraggableArea from "./DraggableArea";
import "./ShowPlaceHolderDocument.css";

const initialItems: Item[] = [
  { id: "1", content: "Contact Info" },
  { id: "2", content: "Name" },
  { id: "3", content: "Education" },
  { id: "4", content: "Skills" },
  { id: "5", content: "Experience" },
  { id: "6", content: "Description" },
  { id: "7", content: "Certifications" },
  { id: "8", content: "References" },
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

  const primaryWidthInInches = 4.9025;
  const secondaryWidthInInches = 2.0675;

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
            <div
              style={{
                width: `${widthInPixels}px`,
                height: `${headerHeightInPixels}px`,
                backgroundColor: "lightgrey",
              }}
            ></div>

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
                <div
                  style={{
                    width: `${inchesToPixels(primaryWidthInInches, dpi)}px`,
                    height: `${bodyHeightInPixels}px`,
                    backgroundColor: "lightgreen",
                  }}
                >
                  Primary
                </div>
                <div
                  style={{
                    width: `${inchesToPixels(secondaryWidthInInches, dpi)}px`,
                    height: `${bodyHeightInPixels}px`,

                    backgroundColor: "lightcoral",
                  }}
                >
                  Secondary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Example_5;

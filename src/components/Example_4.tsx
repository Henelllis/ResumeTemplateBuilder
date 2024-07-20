import { useState } from "react";
import { Item } from "../types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getListById, setListById } from "../utils";
import DraggableArea from "./DraggableArea";

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

const Example_4: React.FC = () => {
  const [lists, setLists] = useState<{ [key: string]: Item[] }>({
    list1: [],
    list2: [],
    list3: initialItems,
    list4: [],
  });

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "200px",
          paddingTop: "50px",
          // height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div style={{ flex: 1 }}>
            <DraggableArea
              droppableId="list4"
              items={lists.list4}
              isBody={false}
              isSelectList={false}
              title="header"
            />
          </div>
          <div
            style={{
              display: "flex",
              flex: 2,
              justifyContent: "center",
            }}
          >
            <div style={{ flex: 2 }}>
              <DraggableArea
                droppableId="list1"
                items={lists.list1}
                isBody
                isSelectList={false}
                title="Primary"
              />
            </div>
            <div style={{ flex: 1 }}>
              <DraggableArea
                droppableId="list2"
                items={lists.list2}
                isBody
                isSelectList={false}
                title="Secondary"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "lightgrey",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              width: "50%",
            }}
          >
            <p style={{ textAlign: "center" }}>
              Please Drag and Drop your blocks to the Resume to continue
            </p>
          </div>
          <DraggableArea
            droppableId="list3"
            items={lists.list3}
            isBody={false}
            isSelectList
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Example_4;

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

// Define an interface for the item type
interface Item {
  id: string;
  content: string;
}

const initialItems: Item[] = [
  // { id: "1", content: "Item 1" },
  // { id: "2", content: "Item 2" },
  // { id: "3", content: "Item 3" },
];

const App: React.FC = () => {
  const [list1Items, setList1Items] = useState<Item[]>(initialItems);
  const [list2Items, setList2Items] = useState<Item[]>([]);
  const [list3Items, setList3Items] = useState<Item[]>([]);

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

    const sourceList = getListById(source.droppableId);
    const destinationList = getListById(destination.droppableId);

    if (sourceList && destinationList) {
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);

      setListsById(source.droppableId, sourceList);
      setListsById(destination.droppableId, destinationList);
    }
  };

  const getListById = (id: string): Item[] => {
    if (id === "list1") return [...list1Items];
    if (id === "list2") return [...list2Items];
    if (id === "list3") return [...list3Items];
    return [];
  };

  const setListsById = (id: string, items: Item[]) => {
    if (id === "list1") setList1Items(items);
    if (id === "list2") setList2Items(items);
    if (id === "list3") setList3Items(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Droppable droppableId="list1">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: "lightblue",
                padding: "10px",
                width: "200px",
                minHeight: "300px",
              }}
            >
              {list1Items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "16px",
                        margin: "0 0 8px 0",
                        minHeight: "50px",
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

        <Droppable droppableId="list2">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: "lightgreen",
                padding: "10px",
                width: "200px",
                minHeight: "300px",
              }}
            >
              {list2Items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "16px",
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: "#8E44AD",
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

        <Droppable droppableId="list3">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: "lightcoral",
                padding: "10px",
                width: "200px",
                minHeight: "300px",
              }}
            >
              {list3Items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "16px",
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: "#E74C3C",
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
    </DragDropContext>
  );
};

export default App;

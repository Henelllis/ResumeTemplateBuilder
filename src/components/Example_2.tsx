import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const initialItems: any[] = [
  // { id: "1", content: "Item 1" },
  // { id: "2", content: "Item 2" },
  // { id: "3", content: "Item 3" },
];

const Example_2 = () => {
  const [items, setItems] = useState(initialItems);
  const [list2Items, setList2Items] = useState<
    { id: string; content: string }[]
  >([]);

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

    let updatedSourceItems = [...items];
    let updatedDestinationItems = [...list2Items];

    if (source.droppableId === "list1" && destination.droppableId === "list2") {
      const [removed] = updatedSourceItems.splice(source.index, 1);
      updatedDestinationItems.splice(destination.index, 0, removed);
    } else if (
      source.droppableId === "list2" &&
      destination.droppableId === "list1"
    ) {
      const [removed] = updatedDestinationItems.splice(source.index, 1);
      updatedSourceItems.splice(destination.index, 0, removed);
    }

    setItems(updatedSourceItems);
    setList2Items(updatedDestinationItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            {items.map((item, index) => (
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
    </DragDropContext>
  );
};

export default Example_2;

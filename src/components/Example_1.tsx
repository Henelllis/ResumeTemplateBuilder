import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../App.css";

interface Item {
  id: string;
  content: string;
}

const initialItems: Item[] = [
  // { id: "1", content: "Item 1" },
  // { id: "2", content: "Item 2" },
  // { id: "3", content: "Item 3" },
  // { id: "4", content: "Item 4" },
];

function Example_1() {
  const [items, setItems] = useState<Item[]>(initialItems);

  function handleOnDragEnd(result: any) {
    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="droppable-container"
          >
            {items.map(({ id, content }, index) => {
              return (
                <Draggable key={id} draggableId={`${index + 1}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={id}
                      className="draggable-item"
                    >
                      <p>{content}</p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Example_1;

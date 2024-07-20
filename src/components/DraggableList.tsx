import React from "react";
import { Item } from "../types";
import { Draggable } from "react-beautiful-dnd";

function DraggableList({ blockList }: { blockList: Array<Item> }) {
  return (
    <>
      {blockList.map((item, index) => (
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
    </>
  );
}

export default DraggableList;

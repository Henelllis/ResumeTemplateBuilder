import { Draggable, Droppable } from "react-beautiful-dnd";
import { Item } from "../types";
import { title } from "process";

// DraggableList Component
const DraggableArea: React.FC<{
  droppableId: string;
  isBody: boolean;
  isSelectList: boolean;
  title?: string;
  items: Item[];
}> = ({ droppableId, isBody, items, isSelectList, title }) => (
  <>
    {title && <h3 style={{ margin: 0 }}>{title}</h3>}

    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: isSelectList ? "transparent" : "lightgrey",
            padding: "10px",
            margin: "8px",
            display: "flex",
            justifyContent: isSelectList ? "flex-start" : "center",
            alignItems: isSelectList ? "center" : "normal",
            flexDirection: "column",
            borderRadius: "10px",

            minHeight: isBody ? "500px" : "100px",
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
                    borderRadius: "10px",

                    margin: "0 0 8px 0",
                    width: isSelectList ? "100px" : "auto",
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
  </>
);

export default DraggableArea;

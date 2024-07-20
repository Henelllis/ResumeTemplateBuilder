import { Droppable } from "react-beautiful-dnd";

function MyDroppableArea({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Droppable droppableId="items">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="droppable-container"
          >
            {children}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default MyDroppableArea;

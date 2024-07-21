import { useContext } from "react";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";
import { BlockDescriptor } from "../types";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";

function ConfigControl() {
  const { mode, setMode } = useContext(TemplateBuilderContext);

  const { blocks, setBlocks } = useContext(BlockContext);

  const isValidToSwitchToEdit = () => {
    if (
      !!blocks.headerBlockList.find(
        (item) =>
          item.content === BlockDescriptor.Name ||
          item.content === BlockDescriptor.Title
      ) &&
      !!blocks.primaryBlockList.find(
        (item) => item.content === BlockDescriptor.Experience
      ) &&
      blocks.secondaryBlockList.length >= 1
    ) {
      return true;
    }

    return false;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "50%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <h2>
          {mode === "BLOCK_PLACEMENT_EDIT"
            ? "Block Placement Mode"
            : "Edit Mode"}
        </h2>
        <button
          disabled={!isValidToSwitchToEdit()}
          onClick={() => {
            const newMode =
              mode === "BLOCK_PLACEMENT_EDIT"
                ? "HTML_EDIT"
                : "BLOCK_PLACEMENT_EDIT";

            if (isValidToSwitchToEdit()) {
              console.log("Switching to", newMode);
              setMode({
                mode: newMode,
              });
            }
          }}
          style={{
            padding: "10px",
            borderRadius: "20px",
            width: "200px",
            border: "none",
            backgroundColor: isValidToSwitchToEdit() ? "green" : "grey",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          {mode === "BLOCK_PLACEMENT_EDIT"
            ? "Edit Mode"
            : "Block Placement Mode"}
        </button>
      </div>
      <h3>
        Please Drag and drop these blocks to where you want them to be in the
        resume
      </h3>
      <Droppable droppableId={"selectionBlockList"}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: "20px",
              backgroundColor: "lightgrey",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DraggableList blockList={blocks.selectionBlockList} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ConfigControl;

import { useContext } from "react";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";
import { BlockDescriptor } from "../types";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import Configuration from "./Configuration";

function ConfigControl() {
  const { mode, setMode, selectedSection } = useContext(TemplateBuilderContext);

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

  const isBlockMode = mode === "BLOCK_PLACEMENT_EDIT";

  return (
    <div
      style={{
        display: "flex",
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
        <h2 style={{ textAlign: "center" }}>
          {isBlockMode ? "Block Placement Mode" : "Edit Mode"}
        </h2>
        <button
          disabled={!isValidToSwitchToEdit()}
          onClick={() => {
            const newMode = isBlockMode ? "HTML_EDIT" : "BLOCK_PLACEMENT_EDIT";

            if (isValidToSwitchToEdit()) {
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
          {isBlockMode ? "Edit Mode" : "Block Placement Mode"}
        </button>
      </div>

      {isBlockMode ? (
        <>
          <h3>
            Please Drag and drop these blocks to where you want them to be in
            the resume
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
        </>
      ) : (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Configuration />
        </div>
      )}
    </div>
  );
}

export default ConfigControl;

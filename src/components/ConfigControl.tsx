import { useContext, useState } from "react";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";
import { BlockDescriptor, SCREEN } from "../types";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import Configuration from "./Configuration";
import { Box, TextField, Typography } from "@mui/material";
import { AppContext } from "../store/AppContext";

function ConfigControl() {
  const {
    mode,
    setMode,
    selectedSection,
    currentWorkingTemplate,
    templates,
    setTemplates,
  } = useContext(TemplateBuilderContext);

  const { blocks, setBlocks } = useContext(BlockContext);
  const { setScreen } = useContext(AppContext);

  const [name, setName] = useState("");

  const handleChange = (event: any) => {
    setName(event.target.value);
  };

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
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField
          label="Template Name"
          variant="outlined"
          value={name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
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

        <button
          disabled={!isValidToSwitchToEdit()}
          onClick={() => {
            if (!currentWorkingTemplate) {
              return;
            }

            console.log(
              "currentWorkingTemplate",
              JSON.stringify(
                {
                  id: name,
                  name: name,
                  layout: "HEADER_PRIMARY",
                  styles: currentWorkingTemplate,
                  headerBlocks: blocks.headerBlockList,
                  primaryBlocks: blocks.primaryBlockList,
                  secondaryBlocks: blocks.secondaryBlockList,
                },
                null,
                2
              )
            );
            setTemplates({
              templates: [
                ...templates,
                {
                  id: name,
                  name: name,
                  layout: "HEADER_PRIMARY",
                  styles: currentWorkingTemplate,
                  headerBlocks: blocks.headerBlockList,
                  primaryBlocks: blocks.primaryBlockList,
                  secondaryBlocks: blocks.secondaryBlockList,
                },
              ],
            });
            console.log("CHANGE SCREEN TO HOME");
            setScreen(SCREEN.HOME);
            setMode({
              mode: "BLOCK_PLACEMENT_EDIT",
            });
          }}
          style={{
            padding: "10px",
            borderRadius: "20px",
            width: "200px",
            border: "none",
            backgroundColor:
              isValidToSwitchToEdit() && name.length >= 5 ? "blue" : "grey",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          SAVE TEMPLATE
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

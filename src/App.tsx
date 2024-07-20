import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import Example_1 from "./components/Example_1";
import Example_2 from "./components/Example_2";
import Example_3 from "./components/Example_3";
import Example_4 from "./components/Example_4";
import ShowPlaceHolderDocument from "./components/ShowPlaceHolderDocument";
import Example_5 from "./components/Example_5";
import BlockContextProvider from "./store/blockContext";
import Example_6 from "./components/Example_6";

interface Item {
  id: string;
  content: string;
}

function App() {
  return (
    <BlockContextProvider>
      <Example_6 layout="HEADER_PRIMARY" />;
    </BlockContextProvider>
  );

  // return <Example_4 layout={"HEADER_PRIMARY_SECONDARY"} />;
}

export default App;

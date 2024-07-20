import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import Example_1 from "./components/Example_1";
import Example_2 from "./components/Example_2";
import Example_3 from "./components/Example_3";
import Example_4 from "./components/Example_4";
import ShowPlaceHolderDocument from "./components/ShowPlaceHolderDocument";

interface Item {
  id: string;
  content: string;
}

function App() {
  return <ShowPlaceHolderDocument />;

  // return <Example_4 layout={"HEADER_PRIMARY_SECONDARY"} />;
}

export default App;

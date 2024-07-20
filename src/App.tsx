import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import Example_1 from "./components/Example_1";
import Example_2 from "./components/Example_2";
import Example_3 from "./components/Example_3";
import Example_4 from "./components/Example_4";

interface Item {
  id: string;
  content: string;
}

const initialItems: Item[] = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
];

function App() {
  const [items, setItems] = useState<Item[]>(initialItems);

  function handleOnDragEnd(result: any) {
    console.log(result);
  }

  return <Example_4 />;
}

export default App;

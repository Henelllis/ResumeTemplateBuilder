import React from "react";
import { AppContext } from "../store/AppContext";
import HomeScreen from "./HomeScreen";
import ResumeScreen from "./ResumeScreen";
import SelectionGrid from "./SelectionGrid";
import AddOrEditScreen from "./AddOrEditScreen";

function Screen() {
  const { screen, setScreen } = React.useContext(AppContext);

  switch (screen) {
    case "HOME":
      return <HomeScreen />;
    case "TEMPLATE_BUILDER":
      return <ResumeScreen layout="HEADER_PRIMARY" />;
    case "TEMPLATE_TO_CHOOSE_FOR_FILLING":
      return <SelectionGrid />;
    case "TEMPLATES_TO_EDIT":
      return <SelectionGrid />;
    case "RESUME_TO_EDIT":
      return <SelectionGrid />;
    case "TEMPLATE_ADD_OR_EDIT":
      return <AddOrEditScreen />;
    case "RESUME_FILLING":
      return <ResumeScreen layout="HEADER_PRIMARY" />;
    case "RESUME_FILLING_ADD_OR_EDIT":
      return <AddOrEditScreen />;
    default:
      return <HomeScreen />;
  }
}

export default Screen;

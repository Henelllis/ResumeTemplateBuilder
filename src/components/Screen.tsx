import React from "react";
import { AppContext } from "../store/AppContext";
import HomeScreen from "./HomeScreen";
import TemplateResumeBuilder from "./TemplateResumeBuilder";
import SelectionGrid from "./SelectionGrid";
import AddOrEditScreen from "./AddOrEditScreen";

function Screen() {
  const { screen } = React.useContext(AppContext);

  switch (screen) {
    case "HOME":
      return <HomeScreen />;
    case "TEMPLATE_BUILDER":
      return <TemplateResumeBuilder layout="HEADER_PRIMARY" />;
    case "TEMPLATES_TO_EDIT":
      return <SelectionGrid />;
    case "RESUME_TO_EDIT":
      return <SelectionGrid />;
    case "TEMPLATE_ADD_OR_EDIT":
      return <AddOrEditScreen />;
    case "RESUME_FILLING":
      return <AddOrEditScreen />;
    case "RESUME_FILLING_ADD_OR_EDIT":
      return <AddOrEditScreen />;
    default:
      return <HomeScreen />;
  }
}

export default Screen;

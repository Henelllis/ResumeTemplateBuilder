import "./App.css";

import BlockContextProvider from "./store/blockContext";
import TemplateResumeBuilder from "./components/TemplateResumeBuilder";
import TemplateBuilderContextProvider from "./store/TemplateBuilderContext";
import HomeScreen from "./components/HomeScreen";
import SelectionGrid from "./components/SelectionGrid";
import AddOrEditScreen from "./components/AddOrEditScreen";
function App() {
  return (
    <BlockContextProvider>
      <TemplateBuilderContextProvider>
        {/* <TemplateResumeBuilder layout="HEADER_PRIMARY" />; */}
        {/* <SelectionGrid /> */}
        <AddOrEditScreen />
      </TemplateBuilderContextProvider>
    </BlockContextProvider>
  );
}

export default App;

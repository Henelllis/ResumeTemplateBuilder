import "./App.css";

import BlockContextProvider from "./store/blockContext";
import TemplateResumeBuilder from "./components/TemplateResumeBuilder";
import TemplateBuilderContextProvider from "./store/TemplateBuilderContext";

function App() {
  return (
    <BlockContextProvider>
      <TemplateBuilderContextProvider>
        <TemplateResumeBuilder layout="HEADER_PRIMARY" />;
      </TemplateBuilderContextProvider>
    </BlockContextProvider>
  );
}

export default App;

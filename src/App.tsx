import "./App.css";

import BlockContextProvider from "./store/blockContext";
import TemplateBuilderContextProvider from "./store/TemplateBuilderContext";
import Screen from "./components/Screen";
import AppContextProvider from "./store/AppContext";
import ResumeFillingContextProvider from "./store/ResumeFillingContext";

function App() {
  return (
    <AppContextProvider>
      <BlockContextProvider>
        <TemplateBuilderContextProvider>
          <ResumeFillingContextProvider>
            <Screen />
          </ResumeFillingContextProvider>
        </TemplateBuilderContextProvider>
      </BlockContextProvider>
    </AppContextProvider>
  );
}

export default App;

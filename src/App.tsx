import "./App.css";

import BlockContextProvider from "./store/blockContext";
import TemplateBuilderContextProvider from "./store/TemplateBuilderContext";
import Screen from "./components/Screen";
import AppContextProvider from "./store/AppContext";

function App() {
  return (
    <AppContextProvider>
      <BlockContextProvider>
        <TemplateBuilderContextProvider>
          <Screen />
        </TemplateBuilderContextProvider>
      </BlockContextProvider>
    </AppContextProvider>
  );
}

export default App;

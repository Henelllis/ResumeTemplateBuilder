import "./App.css";

import BlockContextProvider from "./store/blockContext";
import Example_7 from "./components/Example_7";
import TemplateBuilderContextProvider from "./store/TemplateBuilderContext";

function App() {
  return (
    <BlockContextProvider>
      <TemplateBuilderContextProvider>
        <Example_7 layout="HEADER_PRIMARY" />;
      </TemplateBuilderContextProvider>
    </BlockContextProvider>
  );
}

export default App;

import React from "react";
import Home from "./Home";
import ThemeProvider from "./ThemeProvider";
import OllamaStarter from "./OllamaStarter";
import LlamaPuller from "./LlamaPuller";

const App = () => {
  return (
    <ThemeProvider>
      <OllamaStarter>
        <LlamaPuller>
          <Home />
        </LlamaPuller>
      </OllamaStarter>
    </ThemeProvider>
  );
};

export default App;

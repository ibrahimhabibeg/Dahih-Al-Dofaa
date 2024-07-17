import React from "react";
import ThemeProvider from "./ThemeProvider";
import OllamaStarter from "./Loaders/OllamaStarter";
import Router from "./Router";
import OllamaSetup from "./Loaders/OllamaSetup";

const App = () => {
  return (
    <ThemeProvider>
      <OllamaStarter>
        <OllamaSetup>
          <Router />
        </OllamaSetup>
      </OllamaStarter>
    </ThemeProvider>
  );
};

export default App;

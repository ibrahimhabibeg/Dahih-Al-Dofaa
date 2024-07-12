import React from "react";
import Home from "./Home";
import ThemeProvider from "./ThemeProvider";
import OllamaStarter from "./OllamaStarter";

const App = () => {
  return (
    <ThemeProvider>
      <OllamaStarter>
        <Home />
      </OllamaStarter>
    </ThemeProvider>
  );
};

export default App;

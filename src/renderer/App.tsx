import React from "react";
import ThemeProvider from "./ThemeProvider";
import OllamaStarter from "./OllamaStarter";
import LlamaPuller from "./LlamaPuller";
import Router from "./Router";

const App = () => {
  return (
    <ThemeProvider>
      <OllamaStarter>
        <LlamaPuller>
          <Router />
        </LlamaPuller>
      </OllamaStarter>
    </ThemeProvider>
  );
};

export default App;

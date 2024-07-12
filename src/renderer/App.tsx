import React from "react";
import Home from "./Home";
import ThemeProvider from "./ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;

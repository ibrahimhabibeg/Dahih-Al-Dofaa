import React from "react";
import ThemeProvider from "./ThemeProvider";
import OllamaStarter from "./Loaders/OllamaStarter";
import Router from "./Router";
import OllamaSetup from "./Loaders/OllamaSetup";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Router />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import ThemeProvider from "./ThemeProvider";
import Router from "./Router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";
import Welcome from "./Welcome/Welcome";

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Welcome>
          <Router />
        </Welcome>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import ThemeProvider from "./ThemeProvider";
import Router from "./Router";
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

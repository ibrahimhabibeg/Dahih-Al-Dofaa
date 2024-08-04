import React, { useEffect, useState } from "react";
import useIsOllamaReady from "../backend/useIsOllamaReady";
import { Box, LinearProgress, Typography } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";

const loadingStatements = [
  "With great power comes great loading time...",
  "Your friendly neighborhood AI is loading...",
  "Patience is a virtue... or so we've heard.",
  "Getting ready to ace your exams",
  "Loading the magic",
  "Don't panic! We're just binge-watching textbooks.",
  "We're searching the universe for the ultimate study hack.",
  "May the force of knowledge be with you.",
  "We're in the endgame now... of loading.",
];

type PropsType = {
  children: React.ReactNode;
};

const RequiresOllama = ({ children }: PropsType) => {
  const isOllamaReady = useIsOllamaReady();
  const [loadingStatement, setLoadingStatement] = useState(
    loadingStatements[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStatement(
        loadingStatements[Math.floor(Math.random() * loadingStatements.length)]
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isOllamaReady) {
    return <>{children}</>;
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: "80%",
          }}
        >
          <img
            src={Logo}
            alt="App Logo"
            width={150}
            style={{ marginTop: 50 }}
          />
          <Typography variant="h5" marginTop={5}>
            Please wait while app is getting ready...
          </Typography>
          <LinearProgress
            sx={{
              width: "100%",
              marginTop: 5,
            }}
          />
          <Typography variant="body1" marginTop={2}>
            {loadingStatement}
          </Typography>
        </Box>
      </Box>
    );
  }
};

const requiresOllama = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => (
    <RequiresOllama>
      <Component {...props} />
    </RequiresOllama>
  );
};

export default requiresOllama;

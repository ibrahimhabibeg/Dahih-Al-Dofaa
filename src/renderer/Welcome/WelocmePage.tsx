import { Box } from "@mui/material";
import React, { useState } from "react";
import HorizontalLinearStepper from "../UI/HorizontalLinearStepper";
import UserWelcomePage from "./UserWelcomePage";
import requiresOllama from "../Requirers/RequiresOllama";
import LLMSetup from "./LLMSetup";
import EmbeddingsSetup from "./EmbeddingsSetup";
import useScrollbarStyle from "../UI/useScrollbarStyle";

type PropsType = {
  onFinish: () => void;
};

const WelcomePage = ({ onFinish }: PropsType) => {
  const [activeStep, setActiveStep] = useState(0);
  const scrollBarStyle = useScrollbarStyle();

  const steps = ["Welcome", "Setup LLM", "Setup Embeddings"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
        overflowY: "auto",
        ...scrollBarStyle,
      }}
    >
      <Box
        sx={{
          width: "80%",
        }}
      >
        {activeStep === 0 ? (
          <UserWelcomePage />
        ) : activeStep === 1 ? (
          <LLMSetup />
        ) : (
          <EmbeddingsSetup />
        )}
      </Box>
      <Box sx={{ width: "70%", mb: 5, mt: 5 }}>
        <HorizontalLinearStepper
          activeStep={activeStep}
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
          handleFinish={onFinish}
        />
      </Box>
    </Box>
  );
};

export default requiresOllama(WelcomePage);

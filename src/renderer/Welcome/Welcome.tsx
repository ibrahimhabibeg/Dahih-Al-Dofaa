import React, { useEffect, useState } from "react";
import WelcomePage from "./WelocmePage";

const FINISHED_WELCOME_KEY = "FINISHED_WELCOME";
type PropsType = {
  children: React.JSX.Element;
};

const Welcome = ({ children }: PropsType) => {
  const [finishedWelcome, setFinishedWelcome] = useState(false);

  useEffect(() => {
    const finishedWelcome =
      localStorage.getItem(FINISHED_WELCOME_KEY) === "true";
    setFinishedWelcome(finishedWelcome);
  }, []);

  const handleFinishWelcome = () => {
    localStorage.setItem(FINISHED_WELCOME_KEY, "true");
    setFinishedWelcome(true);
  };

  if (finishedWelcome) {
    return children;
  } else {
    return <WelcomePage onFinish={handleFinishWelcome} />;
  }
};

export default Welcome;

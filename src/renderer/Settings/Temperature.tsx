import React, { useEffect, useState } from "react";
import getModelTemperature from "../backend/config/getModelTemperature";
import setModelTemperature from "../backend/config/setModelTemperature";
import { ListItem, ListItemIcon, ListItemText, Slider } from "@mui/material";
import { Thermostat } from "@mui/icons-material";

const Temperature = () => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    getModelTemperature().then((temperature) => {
      setTemperature(temperature);
    });
  }, []);

  const handleChange = async (event: Event, value: number) => {
    const newTempreture = await setModelTemperature(value);
    setTemperature(newTempreture);
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Thermostat />
      </ListItemIcon>
      <ListItemText
        primary={`Model Temperature`}
        secondary={"Higher temperature means more random but creative results"}
      />
      <Slider
        value={temperature}
        onChange={handleChange}
        min={0}
        max={1}
        step={0.1}
        valueLabelDisplay="auto"
        marks
        sx={{
          width: "25%",
        }}
      />
    </ListItem>
  );
};

export default Temperature;

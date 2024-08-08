const setModelTemperature = (temperature: number): Promise<number> => {
  return window.api.config.setModelTemperature(temperature);
};

export default setModelTemperature;

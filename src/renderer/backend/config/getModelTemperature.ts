const getModelTemperature = (): Promise<number> => {
  return window.api.config.getModelTemperature();
};

export default getModelTemperature;

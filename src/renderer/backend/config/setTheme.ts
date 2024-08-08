const setTheme = (theme: "light" | "dark") => {
  window.api.config.setTheme(theme);
};

export default setTheme;

import { useTheme } from "@mui/material";

const useScrollbarStyle = () => {
  const theme = useTheme();

  const scrollbarStyle = {
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.text.secondary,
      borderRadius: 5,
    },
  };

  return scrollbarStyle;
};

export default useScrollbarStyle;
import React from "react";
import { Box, useTheme } from "@chakra-ui/react";

const useStyles = (theme) => ({
  outlined: {
    border: `1px solid ${theme.colors.primary.lighter}`,
  },
  naked: {
    border: "none",
    boxShadow: "none",
  },
  filled: {
    border: "none",
  },
  mde: {
    boxShadow: `${theme.shadow.shadow1}`,
  },
});

export const Card = ({ variant = "outlined", children, ...props }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const cardStyles = { ...(styles[variant] || {}) };

  return (
    <Box {...cardStyles} borderRadius="12px" bg="white" {...props}>
      {children}
    </Box>
  );
};

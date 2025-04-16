import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

const LogoutButton = () => {
  return (
    <Button
      variant="fab"
      startIcon={<LogoutIcon/>}
      sx={{
        backgroundColor: "#4CAF50",
        color: "#000",
      }}
    >
    </Button>
  );
};

export default LogoutButton;

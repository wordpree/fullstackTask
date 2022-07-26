import React from "react";
import { Backdrop } from "@mui/material";

const InputBackdrop = ({ children, open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      {children}
    </Backdrop>
  );
};

export default InputBackdrop;

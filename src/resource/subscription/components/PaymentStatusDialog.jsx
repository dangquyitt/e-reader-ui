import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { green, red } from "@mui/material/colors";

const PaymentStatusDialog = ({ open, onClose, isSuccess, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: isSuccess ? green[500] : red[500],
        }}
      >
        {isSuccess ? (
          <CheckCircleIcon fontSize="large" />
        ) : (
          <ErrorIcon fontSize="large" />
        )}
        {isSuccess ? "Payment Successful" : "Payment Failed"}
      </DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={isSuccess ? "success" : "error"}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentStatusDialog;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
export default function ResponsiveDialog({ title }) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px", // Tùy chỉnh bo góc
            backgroundColor: "#f5f5f5", // Đổi màu nền
            padding: "20px", // Thêm padding
          },
        }}
      >
        <DialogTitle sx={{ color: "#222" }} id="responsive-dialog-title">
          {"Payment Status Notification!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#333" }}>
            {title}
            {title === "Congratulations on your successful payment!" && (
              <DoneIcon
                sx={{ marginLeft: "8px", color: "green", marginBottom: "-5px" }}
              />
            )}
            {title === "Your payment failed!" && (
              <CloseIcon
                sx={{ marginLeft: "8px", color: "red", marginBottom: "-5px" }}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#333" }} onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

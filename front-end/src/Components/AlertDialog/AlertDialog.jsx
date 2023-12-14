import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({
  title,
  description,
  acceptText,
  cancelText,
  handleClose,
  handleAccept,
}) {
  const handleCloseClick = () => {
    handleClose();
  };

  const handleAcceptClick = () => {
    handleAccept();
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Typography variant="h4" fontWeight={500} align="start">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="alert-dialog-slide-description">
          <Box>
            <Typography variant="h5" fontWeight={700} color="black">
              {description}
            </Typography>
            <br />
            <br />
            <br />
          </Box>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button className="cancel-btn" onClick={handleCloseClick}  sx={{
            fontSize:"1rem"
          }}>
          {cancelText}
        </Button>
        <Button
          className="confirm-btn"
          color="error"
          variant="contained"
          onClick={handleAcceptClick}
          sx={{
            fontSize:"1rem"
          }}
        >
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

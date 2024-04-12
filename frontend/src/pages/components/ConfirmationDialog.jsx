import MUIButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmationDialog(props) {
  const {
    title,
    description,
    confirmText,
    openConfirmDialog,
    handleConfirmDialogClose,
    handleConfirmAction,
  } = props;
  return (
    <Dialog
      open={openConfirmDialog}
      onClose={handleConfirmDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <b>{title}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MUIButton onClick={handleConfirmAction} autoFocus>
          {confirmText}
        </MUIButton>
        <MUIButton onClick={handleConfirmDialogClose}>Cancel</MUIButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;

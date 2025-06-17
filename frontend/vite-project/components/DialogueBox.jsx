import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../src/assets/Colors";

const DialogueBox = ({
  open,
  onClose,
  confirmClick,
  dialogueMessage,
  dialogueTitle,
  showTextField,
  showFailedMessage,
  failedMessage,
  textFieldName,
  textFieldLabel,
  textFieldType,
  cancelText,
  submitText,
  textFieldChange,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogueTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogueMessage}
        </DialogContentText>
        {showTextField && (
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name={textFieldName}
            label={textFieldLabel}
            type={textFieldType}
            fullWidth
            variant="standard"
            onChange={textFieldChange}
          />
        )}
        {showFailedMessage && (
          <Typography sx={{ color: Colors.error }}>{failedMessage}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={confirmClick} autoFocus>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogueBox;

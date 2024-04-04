import React, { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  contentText: string;
  handleClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Modal: FC<IModalProps> = (props) => {
  const { open, title, contentText, handleClose, children, onSubmit } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
      PaperProps={{
        onSubmit,
        component: "form",
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

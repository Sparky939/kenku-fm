import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";

import { useDispatch } from "react-redux";
import { addApp, editApp } from "./appsSlice";

type AppAddProps = {
  open: boolean;
  onClose: () => void;
};

export function AppAdd({ open, onClose }: AppAddProps) {
  const dispatch = useDispatch();

  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!open) {
      setURL("");
      setTitle("");
    }
  }, [open]);

  function handleURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    setURL(event.target.value);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const id = uuid();
    dispatch(addApp({ id, url, title, icon: "" }));
    window.kenku.appIcon(url).then((icon) => {
      dispatch(editApp({ id, icon }));
    });
    onClose();
  }

  return (
    <Dialog fullScreen sx={{ width: 240 }} open={open} onClose={onClose}>
      <DialogTitle>Add App</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            fullWidth
            variant="standard"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            value={url}
            onChange={handleURLChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            value={title}
            onChange={handleTitleChange}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!url} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

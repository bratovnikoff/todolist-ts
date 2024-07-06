import { AddCircleOutline } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  console.log("Input start render");

  const [newItemTitle, setNewItemTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (e.key === "Enter") addItem();
  };

  const addItem = () => {
    if (newItemTitle.trim() === "") {
      setError("Title is required");
      return;
    }

    props.addItem(newItemTitle.trim());
    setNewItemTitle("");
  };

  return (
    <div>
      <TextField
        type="text"
        value={newItemTitle}
        onChange={onNewTitleChangeHandler}
        onKeyUp={onKeyPressHandler}
        variant="standard"
        label="Type value"
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addItem} color="primary">
        <AddCircleOutline />
      </IconButton>
    </div>
  );
}

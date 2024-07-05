import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  console.log("Span start render");

  const [editMode, setEditMode] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setNewItemTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(newItemTitle);
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemTitle(e.target.value);

  return editMode ? (
    <input
      value={newItemTitle}
      onChange={onNewTitleChangeHandler}
      onBlur={activateViewMode}
      autoFocus
    ></input>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}

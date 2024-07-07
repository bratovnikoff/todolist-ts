import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistReducer = (
  state: Array<TodolistType>,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: v1(),
          filter: "all",
          title: action.title,
        },
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodolistAC = (
  newTodolistTitle: string
): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: newTodolistTitle };
};

export const ChangeTodolistTitleAC = (
  todolistId: string,
  newTodolistTitle: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistId,
    title: newTodolistTitle,
  };
};

export const ChangeTodolistFilterAC = (
  todolistId: string,
  newFilter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: newFilter };
};

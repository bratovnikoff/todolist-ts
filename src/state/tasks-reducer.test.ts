import { TasksStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolist-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = addTaskAC("juce", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", false, "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].isDone).toBeTruthy();
  expect(endState["todolistId2"][1].isDone).toBeFalsy();
});

test("title of specified task should be changed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("2", "juce", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("juce");
});

test("new property with new array should be added when new todolist is added", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test("property with todolistId should be deleted", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

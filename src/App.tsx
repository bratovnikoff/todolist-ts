import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  console.log("App start render");

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => !t.isDone);
  }

  // const tasks2: Array<TaskType> = [
  //   { id: 1, title: "Terminator", isDone: true },
  //   { id: 2, title: "Robocop", isDone: false },
  //   { id: 3, title: "Taxi", isDone: false },
  // ];

  function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
      {/* <Todolist title="Movies" tasks={tasks2} /> */}
    </div>
  );
}

export default App;

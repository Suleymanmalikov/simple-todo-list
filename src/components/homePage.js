import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "../features/todoSlice";
import "./homePage.css";

function HomePage() {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="homePage">
      <h1 className="title">Simple Todo List</h1>
      <div className="container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo} className="addButton">
          Add Task
        </button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todoItem">
              {todo.text}{" "}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="taskButton"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;

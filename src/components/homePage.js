import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from "../features/todoSlice";
import "./homePage.css";

function HomePage() {
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [theme, setTheme] = useState("dark");
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleGlobalKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (isEditing !== null) {
        handleSaveEdit(isEditing);
      } else {
        handleAddTodo();
      }
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, text) => {
    setIsEditing(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, newText: editText }));
      setIsEditing(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditText("");
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <div className="homePage">
      <h1 className="title">Todo List</h1>
      <div className="theme-toggle-container">
        <label className="theme-toggle-label">
          <span>Dark Mode</span>
          <div className="theme-toggle-switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <span className="theme-toggle-slider"></span>
          </div>
        </label>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Press ' / ' to add task"
          className="taskInput"
          ref={inputRef}
        />
        <button onClick={handleAddTodo} className="addButton">
          Add
        </button>
      </div>
      <ul className="todoList">
        {sortedTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todoItem ${todo.completed ? "completed" : ""}`}
          >
            {isEditing === todo.id ? (
              <div className="editContainer">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="editInput"
                />
                <div className="buttonsContainer">
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="saveButton"
                  >
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="cancelButton">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="todoContent">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="checkbox"
                />
                <span className="todoText">{todo.text}</span>
                <div className="buttonsContainer">
                  <button
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                    className="editButton"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

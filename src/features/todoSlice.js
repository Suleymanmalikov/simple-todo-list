import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

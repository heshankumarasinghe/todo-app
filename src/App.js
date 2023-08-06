import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const baseUrl = "http://3.110.25.227";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodoId, setEditedTodoId] = useState("");
  const [editedTodoText, setEditedTodoText] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get(`${baseUrl}/api/todos`);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    if (newTodo.trim() === "") return;
    await axios.post(`${baseUrl}/api/todos`, { text: newTodo });
    fetchTodos();
    setNewTodo("");
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(`${baseUrl}/api/todos/${id}`);
    fetchTodos();
  };

  const handleEditTodo = (id, text) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleUpdateTodo = async (id) => {
    await axios.patch(`${baseUrl}/api/todos/${id}`, { text: editedTodoText });
    fetchTodos();
    setEditedTodoId("");
    setEditedTodoText("");
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button className="btn" onClick={handleCreateTodo}>
          Add Todo
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editedTodoId === todo._id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button
                  className="btn"
                  onClick={() => handleUpdateTodo(todo._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="todo-details">
                <span>{todo.text}</span>
                <div className="btn-group">
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEditTodo(todo._id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteTodo(todo._id)}
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

export default App;

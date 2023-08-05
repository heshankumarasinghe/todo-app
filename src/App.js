import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001";

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
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editedTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo._id)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditTodo(todo._id, todo.text)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

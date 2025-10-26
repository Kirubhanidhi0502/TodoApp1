import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title) return;
    const res = await axios.post('http://localhost:5000/todos', { title });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To-Do App</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a task" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo._id, todo.completed)} />
            {todo.title} 
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TextField } from '@mui/material';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
    .then(res => setTodos(res.data));
  });

  const addTodo = () => {
    axios
      .post('http://localhost:3001/todos', 
      { id: todos.length + 1, title: newTodo })
      .then(res => {
        setTodos([...todos, res.data]);
        setNewTodo('');
      })
      .catch(err => console.error('Error adding todo:', err));
  };

  const updateTodo = (id, newText) => {
    axios
      .put(`http://localhost:3001/todos/${id}`, { title: newText })
      .then(res => {
        setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
      })
      .catch(err => console.error('Error updating todo:', err));
  };

  const deleteTodo = id => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    
    if (confirmDelete) {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(err => console.error('Error deleting todo:', err));
  }
};

  return (
    <div className='body'>
      <h1>To Do List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                <button className='edit' onClick={() => updateTodo(todo.id, prompt('Update todo:', todo.title))}>
                  <BorderColorIcon />
                </button>
                <button className='delete' onClick={() => deleteTodo(todo.id)}>
                  <DeleteOutlineIcon />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='creating'> 
        <TextField
          variant='standard'
          id='creating'
          placeholder="New Todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button className='create' onClick={addTodo}>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};
export default App;
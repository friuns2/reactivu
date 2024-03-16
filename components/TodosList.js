import React, { useState } from 'react';

import useVueLikeReactivity from './useVueLikeReactivity';

function TodoList() {

  let state = globalThis.db;

  const addTodo = () => {
    if (state.newTodoText.trim() !== '') {
      state.todos.push({ id: state.todos.length, text: state.newTodoText, completed: false });
      state.newTodoText = '';
    }
  };

  const toggleTodo = todo => {
    todo.completed = !todo.completed;
  };

  const deleteTodo = index => {
    state.todos.splice(index, 1);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={state.newTodoText}
        onChange={e => (state.newTodoText = e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

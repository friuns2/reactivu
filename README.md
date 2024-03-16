# Reactivu: Vue's Reactivity, Reimagined for React

## Elevate Your React Apps
Reactivu seamlessly integrates Vue's intuitive reactivity system into React, offering a streamlined state management experience. Say goodbye to the cumbersome useState boilerplate and hello to a more efficient, reactive state sharing across components and pages.

## Key Features at a Glance
- **State Sharing Made Simple**: Effortlessly share state across different pages without prop drilling or context wrapping.
- **Boilerplate Begone**: Eliminate the verbose useState setup, making your code cleaner and more readable.
- **NextJS Ready**: Comes with an out-of-the-box implementation for NextJS, enabling you to leverage Reactivu in your NextJS projects right away.

## Dive Into Reactivu with a Todo List Example
Explore how Reactivu simplifies state management in React through a practical Todo List example, showcasing the power and ease of use of Vue-like reactivity in a React environment.

```js
import useVueLikeReactivity from './useVueLikeReactivity';
function TodoList() {

  const state = useVueLikeReactivity({
    todos: [],
    newTodoText: ''
  });

  const addTodo = () => {
    if (state.newTodoText.trim() !== '') {
      state.todos.push({ text: state.newTodoText, completed: false });
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
```

<details>
<summary>The old way </summary>


```js 
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      setTodos([...todos, { text: newTodoText, completed: false }]);
      setNewTodoText('');
    }
  };

  const toggleTodo = index => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = index => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
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
```

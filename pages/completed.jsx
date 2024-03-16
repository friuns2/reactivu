import React from 'react';
import useVueLikeReactivity from '../components/useVueLikeReactivity';
export default function Completed() {
  //globalThis.db= useVueLikeReactivity(globalThis.db);
  return (
    <div>
      <h1>Completed Todos</h1>
      <ul>
        {globalThis.db.todos.filter(todo => todo.completed).map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => (todo.completed = false)} key={`btn-${todo.id}`}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

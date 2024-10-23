import React from 'react';

const DoneList = ({ todos, toggleDone, removeTodo }) => {
  return (
    <ul className="space-y-4">
      {todos
        .filter((todo) => todo.done)  // Show only finished todos
        .map((todo) => (
          <li key={todo.id} className="bg-gray-700 p-4 rounded-md flex justify-between">
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <div className="flex items-center">
              {/* Button to toggle back to todo */}
              <button onClick={() => toggleDone(todo.id)} className="bg-green-500 p-2 rounded-full mr-2">
                ↩️
              </button>
              {/* Button to remove a done item */}
              <button onClick={() => removeTodo(todo.id)} className="bg-red-500 p-2 rounded-full">🗑️</button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default DoneList;

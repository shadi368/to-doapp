import React, { useState } from 'react';

const TodoList = ({ todos, toggleDone, removeTodo, editTodo, editingTodoId, setEditingTodoId }) => {
  const [newTitle, setNewTitle] = useState(''); // Local state to hold the new title when editing

  // Function to start editing
  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id); // Set the todo being edited
    setNewTitle(todo.title);
  };

  // Function to save changes
  const handleSave = (id) => {
    editTodo(id, newTitle);
  };

  return (
    <ul className="space-y-4">
      {todos
        .filter((todo) => !todo.done)  // Show only unfinished todos
        .map((todo) => (
          <li key={todo.id} className="bg-gray-800 p-4 rounded-md flex justify-between">
            <div>
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  className="bg-gray-700 text-white p-2 rounded-md"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                <h3 className="text-xl font-semibold">{todo.title}</h3>
              )}
              <p className="text-gray-400 ">{todo.description}</p>
            </div>
            <div className="flex">
              <span className="text-orange-500 font-bold ml-20">{todo.createdAt}</span>

              {editingTodoId === todo.id ? (
                <button
                  onClick={() => handleSave(todo.id)}
                  className="bg-green-500 p-2 rounded-full mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => toggleDone(todo.id)}
                  className="bg-green-500 p-2 rounded-full mr-2"
                >
                  ✓
                </button>
              )}

              {editingTodoId === todo.id ? null : (
                <>
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="bg-yellow-500 p-2 rounded-full mr-2"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="bg-red-500 p-2 rounded-full"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TodoList;

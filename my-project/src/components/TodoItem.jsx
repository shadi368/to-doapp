import React from 'react';

function TodoItem({ todo, updateTodoStatus }) {
  const priorityColor = {
    1: 'border-red-500',
    2: 'border-orange-400',
    3: 'border-yellow-300',
    4: 'border-green-400',
    5: 'border-blue-400'
  };

  const dueInDays = Math.ceil((new Date(todo.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`p-4 mb-4 border-l-4 rounded-md ${priorityColor[todo.priority]} bg-gray-100`}>
      <h3 className="text-lg font-semibold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.content}</p>
      <p className="text-sm text-gray-600">Due in: {dueInDays} days</p>
      <button
        onClick={() => updateTodoStatus(todo.id)}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        {todo.done ? 'Undo' : 'Mark as Done'}
      </button>
    </div>
  );
}

export default TodoItem;

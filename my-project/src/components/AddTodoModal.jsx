import React, { useState } from 'react';

const AddTodoModal = ({ setIsModalOpen, addTodo }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState(''); // Define the text state variable

  // Handle submission of the new task
  const handleSubmit = () => {
    if (title.trim()) {
      addTodo(title, text);  // Call addTodo function to add the new task with description
      setIsModalOpen(false);  // Close the modal
      setTitle('');  // Clear the title input field
      setText('');   // Clear the text input field
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-md text-white w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-white mb-4"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-white mb-4"
          placeholder="Enter task description..." // Updated placeholder for clarity
          value={text}
          onChange={(e) => setText(e.target.value)} // Update state for description
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}  // Close the modal on cancel
            className="bg-red-500 p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 p-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

// Export as default to resolve the error
export default AddTodoModal;

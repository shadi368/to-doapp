import React, { useState, useEffect } from 'react';
import AddTodoModal from './components/AddTodoModal.jsx';
import TodoList from './components/TodoList.jsx';
import DoneList from './components/DoneList.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state
  const [searchTerm, setSearchTerm] = useState('');       // Search term state
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever `todos` changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Function to add a new todo
  const addTodo = (title, description) => {
    const newTodo = {
      title,
      description,
      done: false,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Function to update a todo by its id
  const updateTodo = (id, updatedFields) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  // Function to toggle a todo's 'done' status
  const toggleDone = (id) => updateTodo(id, { done: !todos.find((todo) => todo.id === id).done });

  // Function to edit the todo title
  const editTodo = (id, newTitle) => {
    updateTodo(id, { title: newTitle });
    setEditingTodoId(null);
  };

  // Function to remove a todo
  const removeTodo = (id) => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  // Filter todos based on search term
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <div className='bg-black w-full rounded-md h-16 flex justify-center items-center'>
          <h1 className="text-3xl font-bold text-orange-500">
            tasX <span className='text-white'>- get things done</span>
          </h1>
        </div>
      </header>

      <div className='flex'>
        <div className='w-1/4 flex items-center justify-center'>
          <button
            onClick={() => setIsModalOpen(true)}  // Open the modal
            className="bg-orange-500 text-2xl rounded-full w-full"
          >
            +
          </button>
        </div>
        <div className="w-3/4">
          <input
            type="text"
            placeholder="Search"
            className="bg-white p-2 rounded-md text-gray-900 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Update the search term
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Todo List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Todo Items</h2>
          <TodoList
            todos={filteredTodos.filter((todo) => !todo.done)}  // Show only todos that are not done
            toggleDone={toggleDone}
            removeTodo={removeTodo}
            editTodo={editTodo}
            editingTodoId={editingTodoId}
            setEditingTodoId={setEditingTodoId}
          />
        </div>

        {/* Done List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Done Items</h2>
          <DoneList
            todos={filteredTodos.filter((todo) => todo.done)}  // Show only done todos
            toggleDone={toggleDone}
            removeTodo={removeTodo}
            editTodo={editTodo}
            editingTodoId={editingTodoId}
            setEditingTodoId={setEditingTodoId}
          />
        </div>
      </div>

      {/* Modal for Adding Todo */}
      {isModalOpen && (
        <AddTodoModal
          setIsModalOpen={setIsModalOpen}
          addTodo={addTodo}
        />
      )}
    </div>
  );
};

export default App;

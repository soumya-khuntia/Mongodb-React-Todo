import React, { useState, useEffect } from 'react';
import './App.css'
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete, MdCheck, MdClose } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './components/Navbar.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showFinished, setShowFinished] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [todos, setTodos] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      axios.post('http://localhost:5000/todos', { text: inputValue })
        .then(response => {
          setTodos([...todos, response.data]);
          setInputValue('');
          toast.success('Todo added successfully!');
        })
        .catch(error => console.error('Error adding todo:', error));
    } else {
      toast.warn('Please enter a todo!');
    }
  };

  const handleRemoveTodo = (id) => {
    if (deleteConfirmation === id) {
      axios.delete(`http://localhost:5000/todos/${id}`)
        .then(() => {
          const newTodos = todos.filter(todo => todo.id !== id);
          setTodos(newTodos);
          setDeleteConfirmation(null);
          toast.error('Todo removed successfully!');
        })
        .catch(error => console.error('Error removing todo:', error));
    } else {
      setDeleteConfirmation(id);
    }
  };

  const handleEditTodo = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSaveEdit = (id) => {
    const updatedTodo = { text: editValue, completed: todos[editIndex].completed };
    axios.put(`http://localhost:5000/todos/${id}`, updatedTodo)
      .then(response => {
        const newTodos = [...todos];
        newTodos[editIndex] = response.data;
        setTodos(newTodos);
        setEditIndex(null);
        toast.success('Todo edited successfully!');
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const handleToggleComplete = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    const updatedTodo = { ...todos[index], completed: !todos[index].completed };
    axios.put(`http://localhost:5000/todos/${id}`, updatedTodo)
      .then(response => {
        const newTodos = [...todos];
        newTodos[index] = response.data;
        setTodos(newTodos);
        if (newTodos[index].completed) {
          toast.success('Todo completed');
        } else {
          toast.warn('Todo incompleted');
        }
      })
      .catch(error => console.error('Error toggling todo:', error));
  };

  const handleshow = () => {
    setShowFinished(!showFinished);
    if (showFinished) {
      toast.success('Hide finished');
    } else {
      toast.success('Show finished');
    }
  };

  const filteredTodos = showFinished ? todos : todos.filter(todo => !todo.completed);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <Navbar onLoginClick={toggleLogin} onSignupClick={toggleSignup} />

    {showLogin && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <Login onClose={() => setShowLogin(false)} />
        </div>
      </div>
    )}
    {showSignup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <Signup onClose={() => setShowSignup(false)} />
        </div>
      </div>
    )}


      <div className="md:container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Stask - Manage Your Todos</h1>
        <div className="flex mb-4">
          <input type="text" value={inputValue} onChange={handleInputChange} className="px-4 py-2 border border-gray-300 mr-2 rounded-md flex-grow shadow-md" placeholder="Enter your todo..." />
          <button onClick={handleAddTodo} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md">Add</button>
        </div>
        <div className="mb-4">
          <input type="checkbox" checked={showFinished} onChange={handleshow} className="mr-2 cursor-pointer" />
          <label>Show Finished</label>
        </div>
        <ul>
          <h2 className="text-lg font-bold">Your todos</h2>
          {todos.length === 0 && <div className="mx-7">No todos...</div>}
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`flex items-center justify-between mb-2 ${todo.completed ? 'line-through' : ''}`}>
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} className="mr-3 cursor-pointer" />
              {editIndex === todos.indexOf(todo) ? (
                <input type="text" value={editValue} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded-md mr-2" />
              ) : (
                <div className="w-full overflow-hidden mr-1">
                  <span className="break-all">{todo.text}</span>
                </div>
              )}
              <div className="flex">
                {editIndex === todos.indexOf(todo) ? (
                  <button onClick={() => handleSaveEdit(todo.id)} className="px-3 py-1 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"><FaSave /></button>
                ) : (
                  <button onClick={() => handleEditTodo(todo.id)} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"><FaEdit /></button>
                )}
                {deleteConfirmation === todo.id ? (
                  <>
                    <button onClick={() => handleRemoveTodo(todo.id)} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600"><MdCheck /></button>
                    <button onClick={() => setDeleteConfirmation(null)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"><MdClose /></button>
                  </>
                ) : (
                  <button onClick={() => handleRemoveTodo(todo.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"><MdDelete /></button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

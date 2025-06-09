import React, { useState } from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';

function TodoApp() {
  const [tasks, setTasks] = useState([
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }

    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="Todo-lists">
        <h1>To-Do List</h1>

        <input 
          type="text" 
          value={newTask} 
          onChange={handleInputChange} 
          placeholder="Enter a task..." 
        />
        <button className="add-button" onClick={addTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleComplete(index)} 
              />
              <span
                className="text"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1
                }}
              >
                {task.text}
              </span>
              <button className="edit-button" onClick={() => editTask(index)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="delete-button" onClick={() => deleteTask(index)}>
                <FontAwesomeIcon icon={faTrashCanArrowUp} />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TodoApp;

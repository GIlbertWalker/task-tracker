import './App.css';
import React, { useState } from 'react';
// import './TaskTracker.css';

function TaskTracker() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);

  const addTask = (e) => {
    e.preventDefault();
    const taskText = e.target.elements.task.value;
    const taskDatetime = e.target.elements.datetime.value;
    const taskReminder = e.target.elements.reminder.checked;
    const newTask = { id: tasks.length + 1, text: taskText, day: taskDatetime, reminder: taskReminder };
    setTasks([...tasks, newTask]);
    setTaskCount(taskCount + 1);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setTaskCount(taskCount - 1);
  };

  

  return (
    <div className="task-tracker">

        <div className="header">
          <h1>Task Tracker Application</h1>
        </div>

        <div className="task-count">
          <p> Total Task: <span>{taskCount}</span> </p>
          <button className="add-task-btn" onClick={toggleForm}>
            Add Task
          </button>
        </div>
      
        {showForm && (
          <form className='form' onSubmit={addTask}>
            <label htmlFor="task">Task</label>
            <input type="text" name="task" placeholder="Add Task" />
            <label htmlFor="time"> Date & Time </label>
            <input type="datetime-local" name="datetime" />
            <label htmlFor="reminder">Set Reminder <input className='check' type="checkbox" name="reminder" /></label>
            <button type="submit">Save Task</button>
          </form>
        )}
        
      

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} onDelete={deleteTask} />)
        ) : (
          <p>No tasks added yet</p>
        )}
      </div>

    </div>
  );
}

function Task({ task, onDelete }) {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`}>
      <div className="right">
        <h3>{task.text}</h3>
        <p>{task.day}</p>
      </div>
      <input type="checkbox" checked={task.reminder} onChange={() => console.log('Reminder toggled')} />
      <button className="delete-task-btn" onClick={() => onDelete(task.id)}>
          X
      </button>
    </div>
  );
}

export default TaskTracker;

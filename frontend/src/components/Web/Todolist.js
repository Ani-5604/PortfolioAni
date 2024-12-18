import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Todolist.css';

const Todolist = () => {
    const [taskText, setTaskText] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        // Load tasks from localStorage or an API if needed
    }, []);

    const handleAddTask = () => {
        if (taskText && startTime && endTime) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                completedAt: null
            };
            setTasks([...tasks, newTask]);
            setTaskText('');
            setStartTime('');
            setEndTime('');
            scheduleNotification(newTask);
        }
    };

    const handleCompleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        const completedTask = tasks.find(task => task.id === id);
        if (completedTask) {
            completedTask.completedAt = new Date();
            setCompletedTasks([...completedTasks, completedTask]);
        }
    };

    const handleDeleteTask = (id, type) => {
        if (type === 'tasks') {
            setTasks(tasks.filter(task => task.id !== id));
        } else {
            setCompletedTasks(completedTasks.filter(task => task.id !== id));
        }
    };

    const scheduleNotification = (task) => {
        const currentTime = new Date();
        const timeDiff = task.endTime.getTime() - currentTime.getTime();
        
        if (timeDiff > 0) {
            setTimeout(() => {
                sendNotification(task);
            }, timeDiff);
        }
    };
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Adjust the route as needed
    };
    

    const sendNotification = (task) => {
        fetch('/notify-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error sending notification:', error));
    };

    return (
        <div className="todolist-container">
            <div className="form-section">
                <h1>To-Do List with Notifications</h1>
                <div className="form-container">
                    <input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        placeholder="Enter task..."
                    />
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
            <div className="lists-section">
                <div className="task-list">
                    <h2>Pending Tasks</h2>
                    <ul className="list">
                        {tasks.map(task => (
                            <li key={task.id} className="pending">
                                <span className="task-number">Task {tasks.indexOf(task) + 1}:</span>
                                <span className="task-text">{task.text}</span>
                                <span className="date-time">
                                    Start Time: {task.startTime.toLocaleDateString()} {task.startTime.toLocaleTimeString()},
                                    End Time: {task.endTime.toLocaleDateString()} {task.endTime.toLocaleTimeString()}
                                </span>
                                <div className="task-actions">
                                    <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                                    <button onClick={() => handleDeleteTask(task.id, 'tasks')}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="completed-list">
                    <h2>Completed Tasks</h2>
                    <ul className="list">
                        {completedTasks.map(task => (
                            <li key={task.id} className="completed">
                                <span className="task-number">Task {completedTasks.indexOf(task) + 1}:</span>
                                <span className="task-text">{task.text}</span>
                                <span className="date-time">
                                    Start Time: {task.startTime.toLocaleDateString()} {task.startTime.toLocaleTimeString()},
                                    End Time: {task.endTime.toLocaleDateString()} {task.endTime.toLocaleTimeString()},
                                    Completed At: {task.completedAt ? `${task.completedAt.toLocaleDateString()} ${task.completedAt.toLocaleTimeString()}` : 'Not completed yet'}
                                </span>
                                <div className="task-actions">
                                    <button onClick={() => handleDeleteTask(task.id, 'completedTasks')}>Delete</button>

                                </div> 
                                   
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="btn-extra">
                <button className="btn extra"onClick={()=>handleBackToHome('/Web')}>Go back</button>
            </div>
        </div>
    );
};

export default Todolist;

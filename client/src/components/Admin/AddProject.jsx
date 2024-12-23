import React, { useState } from 'react';
import axios from 'axios';

const AddProject = ({ token }) => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isCritical, setIsCritical] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users?search=${searchTerm}`, {
                headers: { Authorization: token },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddTask = () => {
        if (taskName.trim()) {
           
            setTasks([...tasks, { name: taskName, completed: false,isCritical: isCritical }]);
            setTaskName('');
            setIsCritical(false);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/projects',
                { name: projectName, description, tasks, assignedTo },
                { headers: { Authorization: token } }
            );
            alert('Project added successfully!');
            setProjectName('');
            setDescription('');
            setTasks([]);
            setAssignedTo('');
            setUsers([]);
            setSearchTerm('');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Add Project</h1>
            <input
                type="text"
                placeholder="Project Name"
                className="w-full p-2 border rounded mb-4"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
                placeholder="Description"
                className="w-full p-2 border rounded mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Tasks</h2>
                <input
                    type="text"
                    placeholder="Task Name"
                    className="w-full p-2 border rounded mb-2"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                 <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={isCritical}
                    onChange={() => setIsCritical(!isCritical)}
                />
                Mark as Critical
            </label>
                <button
                    onClick={handleAddTask}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Add Task
                </button>
                <ul className="mt-4">
                    {tasks.map((task, index) => (
                        <li key={index} className="p-2 border-b">
                            {task.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Assign To</h2>
                <input
                    type="text"
                    placeholder="Search User"
                    className="w-full p-2 border rounded mb-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={fetchUsers}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Search
                </button>
                <ul className="mt-4">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="p-2 border-b cursor-pointer hover:bg-gray-200"
                            onClick={() => setAssignedTo(user.username)}
                        >
                            {user.username} ({user._id})
                        </li>
                    ))}
                </ul>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Add Project
            </button>
        </div>
    );
};

export default AddProject;

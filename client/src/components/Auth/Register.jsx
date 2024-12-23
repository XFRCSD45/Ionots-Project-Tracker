import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
            alert('Registration successful!');
        } catch (error) {
            console.error('Error registering:', error);
            alert('Error registering user');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;

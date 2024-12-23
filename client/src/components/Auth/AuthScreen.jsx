import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AuthScreen = ({ setToken, setUser, setRole }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setUserRole] = useState('user');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const token = response.data.token;
            const decodedToken = jwtDecode(token);

            // Set user details and token
            localStorage.setItem('token', token);
            setToken(`${token}`);
            setUser(decodedToken.username);
            setRole(decodedToken.role);
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials');
        }
    };

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
            alert('Registration successful! Please log in.');
            setIsRegistering(false);
        } catch (error) {
            console.error('Error registering:', error);
            alert('Error registering user');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isRegistering ? 'Register' : 'Login'}
                </h2>
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
                {isRegistering && (
                    <select
                        className="w-full p-2 border rounded mb-4"
                        value={role}
                        onChange={(e) => setUserRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                )}
                <button
                    onClick={isRegistering ? handleRegister : handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {isRegistering ? 'Register' : 'Login'}
                </button>
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="w-full mt-4 text-blue-500 hover:underline"
                >
                    {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                </button>
            </div>
        </div>
    );
};

export default AuthScreen;

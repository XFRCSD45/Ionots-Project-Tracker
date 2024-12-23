import React, { useState, useEffect } from 'react';
import AuthScreen from './components/Auth/AuthScreen';
import ProjectList from './components/Projects/ProjectList';
import AddProject from './components/Admin/AddProject';
import { jwtDecode } from 'jwt-decode';
function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            setRole(decoded.role);
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <div className="App">
            {!token ? (
                <AuthScreen setToken={setToken} setUser={setUser} setRole={setRole} />
            ) : role === 'admin' ? (
                <AddProject token={token} />
            ) : (
                <ProjectList token={token} />
            )}
        </div>
    );
}

export default App;

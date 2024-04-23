import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

export default function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user_type, setUserType] = useState('');
    const { signin, user, error } = useAuthService();

    async function handleFormSubmit(e) {
        e.preventDefault();
        await signin({ username, password, }); // signin updates the user in the context
    }


        // This effect handles navigation after user state is updated
    if (user) {
        if (user.user_type === 'competitor') {
            return <Navigate to="/testpage" />
        } else if (user.user_type === 'tournament_manager') {
            return <Navigate to="/testpage" />
        }
    }

    return (
    <>
        <img src="/image (3).png" alt="Sign In Page Banner" className="login-image" />
        <h1>Log the heck in why don't ya!?</h1>
        <form onSubmit={handleFormSubmit} className="signin-form-container">
            {error && <div className="error">{error.message}</div>}
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    </>
)
    }

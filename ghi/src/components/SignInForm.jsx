// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useAuthService from '../hooks/useAuthService'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signin, user, error } = useAuthService()

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password })
    }

    if (user) {
        if (user.user_type === 'competitor') {
            return <Navigate to="/testpage" />
        } else if (user.user_type === 'tournament_manager') {
            return <Navigate to="/testpage" />
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            {error && <div className="error">{error.message}</div>}
            <label htmlFor="username">Username</label>
            <input
                className="form-control"
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <label htmlFor="password">Password</label>
            <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button className="btn btn-primary" type="submit">
                Login
            </button>
        </form>
    )
}

// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useAuthService from '../hooks/useAuthService'

export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user_type, setUserType] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [photo_url, setPhotoUrl] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const { signup, user, error } = useAuthService()

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault()
        await signup({ username, password, user_type, first_name, last_name, photo_url, phone_number, address })
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={handleFormSubmit}>
            {error && <div className="error">{error.message}</div>}

            <input
                type="text"
                // name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <select
                value={user_type}
                onChange={(e) => setUserType(e.target.value)}
            >
                <option value="">Select User Type</option>
                <option value="competitor">Competitor</option>
                <option value="tournament_manager">Tournament Manager</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    )
}

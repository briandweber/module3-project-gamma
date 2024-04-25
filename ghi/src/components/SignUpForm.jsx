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
        const user = await signup({
            username,
            password,
            user_type,
            first_name,
            last_name,
            photo_url,
            phone_number,
            address,
        })
    }

    if (user) {
        if (user.user_type === 'competitor') {
            return <Navigate to="/testpage" />
        } else if (user.user_type === 'tournament_manager') {
            return <Navigate to="/testpage" />
        }
    }

    return (
        <form className="row" onSubmit={handleFormSubmit}>
            {error && <div className="error">{error.message}</div>}
            <div className="col-md-6 sign-up">
                <input
                    className="form-control"
                    type="text"
                    // name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                />
            </div>
            <div className="col-md-6 sign-up">
                <input
                    className="form-control"
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                />
            </div>
            <div className="col-md-6 sign-up">
                <input
                    className="form-control "
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter First Name"
                />
            </div>
            <div className="col-md-6 sign-up">
                <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Last Name"
                />
            </div>
            <div className="col-md-6 sign-up">
                <input
                    className="form-control"
                    type="text"
                    name="photo_url"
                    value={photo_url}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Enter photo_url"
                />
            </div>
            <div className="col-md-6 sign-up">
                <input
                    className="form-control"
                    type="text"
                    name="phone_number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter Phone Number"
                />
            </div>
            <div className="col-md-6 sign-up">
                <input
                    className="form-control"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                />
            </div>
            <div className="col-md-6 sign-up">
                <select
                    className="form-control"
                    value={user_type}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="">Select User Type</option>
                    <option value="competitor">Competitor</option>
                    <option value="tournament_manager">
                        Tournament Manager
                    </option>
                </select>
            </div>
            <div className="sign-up">
                <button className="btn btn-primary" type="submit">
                    Sign Up
                </button>
            </div>
        </form>
    )
}

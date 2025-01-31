// @ts-check
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import Carousel from './Carousel'

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
        return <Navigate to="/" />
    }

    return (
        <>
            <div className="carousel-container container-fluid">
                <Carousel />
            </div>
            <div className="page-wrapper">
                <div className="homepage-background">
                    <div className="sign-in col-auto">
                        <form onSubmit={handleFormSubmit}>
                            {error && (
                                <div className="error">{error.message}</div>
                            )}
                            <label htmlFor="username">Username</label>
                            <input
                                className="form-control col-sm-7"
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
                            <div>
                                <h3>No account yet?</h3>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

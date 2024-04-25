import { Navigate } from 'react-router-dom'

import useAuthService from '../hooks/useAuthService'

export default function SignOut() {
    const { signout, user, error } = useAuthService()

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleSignOut(e) {
        e.preventDefault()
        await signout()
    }

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <form onSubmit={handleSignOut}>
                {error && <div className="error">{error.message}</div>}
                <button type="submit" className="btn btn-primary">
                    Sign Out
                </button>
            </form>
        </div>
    )
}

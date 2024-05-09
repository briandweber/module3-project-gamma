import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function SignOut() {
    const { signout, user, error } = useAuthService()
    const navigate = useNavigate()
    useEffect(() => {
        async function handleSignOut() {
            await signout()
            navigate('/signin')
        }
        handleSignOut()
    }, [navigate, signout])
    if (user) {
        {
            error && <div className="error">{error.message}</div>
        }
    }
    return null
}

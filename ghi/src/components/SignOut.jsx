import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function SignOut() {
    const { signout } = useAuthService()
    const navigate = useNavigate()
    useEffect(() => {
        async function handleSignOut() {
            await signout()
            navigate('/signin')
        }
        handleSignOut()
    }, [navigate, signout])
    return null
}

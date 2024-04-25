import React from 'react'
import { useParams } from 'react-router-dom'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import RandomNumberPage from '/src/testpage'
import UserDetails from './CompetitorDetails'
import useAuthService from '../hooks/useAuthService'

function ProfileConstruct() {
    const { user } = useAuthService()
    console.log(user)

    return (
        <>
            <div className="homepage-background">
                <div className="container-lg">
                    {!user && (
                        <>
                            <div className="form-container">
                                <SignInForm />
                            </div>
                            <div className="form-container">
                                <SignUpForm />
                            </div>
                        </>
                    )}
                    {user && (
                        <>
                            <div className="form-container">
                                <UserDetails />
                                <h2>My Tournaments</h2>
                                {/* Assuming Tournaments are handled elsewhere or not needed */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfileConstruct

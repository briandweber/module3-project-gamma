import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import TournamentDetails from './TournamentDetails'
import useAuthService from '../hooks/useAuthService'
import SignOut from './SignOut'

function TournamentDetailsConstruct() {
    const { user } = useAuthService()

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
                    <div className="form-container">{user && <SignOut />}</div>
                    {user && (
                        <>
                            <div className="form-container">
                                <TournamentDetails />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default TournamentDetailsConstruct

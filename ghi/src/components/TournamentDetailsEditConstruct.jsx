import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import TournamentDetailsEdit from './TournamentDetailsEdit'
import useAuthService from '../hooks/useAuthService'
import SignOut from './SignOut'

function TournamentDetailsEditConstruct() {
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
                                <TournamentDetailsEdit />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default TournamentDetailsEditConstruct

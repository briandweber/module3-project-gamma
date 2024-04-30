import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import UpcomingTournaments from './UpcomingTournaments'
import TournamentList from './Tournaments'
import SignOut from './SignOut'

import useAuthService from '../hooks/useAuthService'

//@ts-check
/**
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 *
 *
 * @param {{info: LaunchInfo | undefined }} props
 * @returns {React.ReactNode}
 */
function Construct(props) {
    const { user } = useAuthService()
    if (!props.info) {
        return <p>Loading...</p>
    }


    return (
        <>
            <div className="homepage-background-extra">
                <div className="container-lg">
                    <div className="image-container"></div>
                    <div className="name-container">
                        <h1>Gamester</h1>
                    </div>
                    <div className="form-container">
                        {!user && <SignInForm />}
                    </div>
                    <div className="form-container">
                        {!user && <SignUpForm />}
                    </div>
                    <div className="form-container">{user && <SignOut />}</div>
                    <div className="form-container">
                        {user && user.user_type == 'competitor' && (
                            <UpcomingTournaments />
                        )}
                    </div>
                    <div className="form-container">
                        {user && user.user_type == 'tournament_manager' && (
                            <TournamentList />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Construct

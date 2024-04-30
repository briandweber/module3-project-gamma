import { Link } from 'react-router-dom'
import UpcomingTournaments from './UpcomingTournaments'
import TournamentList from './Tournaments'

import useAuthService from '../hooks/useAuthService'

//@ts-check
/**
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 *
 *
 * @param {{info: LaunchInfo | undefined }} props
 * @returns {React.ReactNode}
 */

export default function LandingPage() {
    const { user } = useAuthService()
    // console.log(user)
    // return (
    //     <>
    //         <div className="landing-page">
    //             <Link className="btn btn-primary" to="signup">
    //                 Sign Up
    //             </Link>
    //             <Link className="btn btn-primary" to="signin">
    //                 Sign In
    //             </Link>
    //         </div>
    //     </>
    // )
    return (
        <>
            {/* <div className="form-container">
                {!user && (
                    <Link className="btn btn-primary" to="signin">
                        Sign In
                    </Link>
                )}
            </div> */}
            <div className="form-container sign-up">
                {!user && (
                    <Link className="btn btn-primary" to="signup">
                        Sign Up
                    </Link>
                )}
                {!user && (
                    <Link className="btn btn-primary" to="signin">
                        Sign In
                    </Link>
                )}
            </div>
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
        </>
    )
}

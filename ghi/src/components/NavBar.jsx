import { Link } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

const NavBar = () => {
    const { user, isLoggedIn } = useAuthService()

    const renderUserSpecificLinks = () => {
        if (!user) return null

        const userTypeLower = user.user_type.toLowerCase()

        if (userTypeLower === 'tournament_manager') {
            return (
                <>
                    <li>
                        <Link className="nav-link" to="/tournaments">
                            My Tournaments
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/tournament/create">
                            Create Tournament
                        </Link>
                    </li>
                </>
            )
        } else if (userTypeLower === 'competitor') {
            return (
                <>
                    <li>
                        <Link
                            className="nav-link"
                            to="/mycompetitortournaments"
                        >
                            My Tournaments
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/upcomingtournaments">
                            Upcoming Tournaments
                        </Link>
                    </li>
                </>
            )
        } else if (userTypeLower === 'venue_manager') {
            return (
                <>
                    <li>
                        <Link
                            className="nav-link"
                            to="/"
                        >
                            My Venues
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/venue/create">
                            List New Venue
                        </Link>
                    </li>
                </>
            )
        }
    }

    const profileLink = () => {
        if (!user) return null

        const userTypeLower = user.user_type.toLowerCase()
        const profilePath =
            userTypeLower === 'tournament_manager'
                ? '/tournamentmanagerdetails'
                : '/competitordetails'
        console.log('ProfilePath:', profilePath)
        return (
            <li>
                <Link className="nav-link" to={profilePath}>
                    Profile
                </Link>
            </li>
        )
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src="/public/image (3).png" alt="logo" />
                <h1>GAMESTER</h1>
            </Link>
            <ul className=" nav nav-underline">
                {isLoggedIn ? (
                    <>
                        {renderUserSpecificLinks()}
                        {profileLink()}
                        <li className="nav-item">
                            <Link className="nav-link" to="/signout">
                                Sign Out
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link className="nav-link" to="/signin">
                                Sign In
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <div className="hamburger">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </nav>
    )
}

export default NavBar

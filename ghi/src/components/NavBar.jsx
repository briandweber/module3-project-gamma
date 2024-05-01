import React from 'react';
import { Link } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

const NavBar = () => {
    const { user, isLoggedIn } = useAuthService();

    const renderUserSpecificLinks = () => {
        if (!user) return null;

        const userTypeLower = user.user_type.toLowerCase();

        if (userTypeLower === 'tournament_manager') {
            return (
                <>
                    <li><Link to="/">Main Page</Link></li>
                    <li><Link to="/tournament/create">Create Tournament</Link></li>
                    <li><Link to="/tournaments">My Tournaments</Link></li>
                </>
            );
        } else if (userTypeLower === 'competitor') {
            return (
                <>
                    <li><Link to="/">Main Page</Link></li>
                    <li><Link to="/upcomingtournaments">Upcoming Tournaments</Link></li>
                    <li><Link to="/mycompetitortournaments">My Tournaments</Link></li>
                </>
            );
        }
    };

    const profileLink = () => {
        if (!user) return null;

        const userTypeLower = user.user_type.toLowerCase();
        const profilePath = userTypeLower === 'tournament_manager'
                            ? '/tournamentmanagerdetails'
                            : '/competitordetails';
        console.log("ProfilePath:", profilePath);
        return <li><Link to={profilePath}>Profile</Link></li>;
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/public/image (3).png" alt="logo" />
                <h1>GAMESTER</h1>
            </div>
            <ul>
                {isLoggedIn ? (
                    <>
                        {renderUserSpecificLinks()}
                        {profileLink()}
                        <li><Link to="/signout">Sign Out</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/signin">Sign In</Link></li>
                    </>
                )}
            </ul>
            <div className="hamburger">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </nav>
    );
};

export default NavBar;

import React from 'react';
import { useParams } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import RandomNumberPage from '/src/testpage';
import CompetitorDetails from './CompetitorDetails'
import useAuthService from '../hooks/useAuthService';
import UserDetails from './CompetitorDetails';
import TournamentManagerDetails from './TournamentManagerDetails';

function ProfileConstruct() {
    const { user } = useAuthService();

    const getUserDetailsComponent = () => {
        if (!user) {
            return (
                <>
                    <SignInForm />
                    <SignUpForm />
                </>
            );
        }

        switch (user.user_type) {
            case 'competitor':
                return <UserDetails />;
            case 'tournament_manager':
                return <TournamentManagerDetails />;
            default:
                return <div>Access Denied: Unknown or undefined user type.</div>;
        }
    };

    return (
        <div className="homepage-background">
            <div className="container-lg">
                <div className="form-container">
                    {getUserDetailsComponent()}
                </div>
            </div>
        </div>
    );
}

export default ProfileConstruct;

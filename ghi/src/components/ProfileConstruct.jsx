import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import useAuthService from '../hooks/useAuthService';
import UserDetails from './CompetitorDetails';
import TournamentManagerDetails from './TournamentManagerDetails';
import NavBar from './NavBar';
import Footer from './Footer';


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
            <NavBar />
            <div className="container-lg">
                <div className="form-container">
                    {getUserDetailsComponent()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileConstruct;

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import SignInForm from './SignInForm';
// import SignUpForm from './SignUpForm';
// import UserDetails from './CompetitorDetails';
// import TournamentManagerDetails from './TournamentManagerDetails';
// import useAuthService from '../hooks/useAuthService';

// function ProfileConstruct() {
//     const { user } = useAuthService();

//     const getUserDetailsComponent = (userType) => {
//         switch(userType) {
//             case 'competitor':
//                 return <UserDetails />;
//             case 'tournament_manager':
//                 return <TournamentManagerDetails />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="homepage-background">
//             <div className="container-lg">
//                 {!user && (
//                     <>
//                         <div className="form-container">
//                             <SignInForm />
//                         </div>
//                         <div className="form-container">
//                             <SignUpForm />
//                         </div>
//                     </>
//                 )}
//                 {user && (
//                     <div className="form-container">
//                         {getUserDetailsComponent(user.user_type)}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ProfileConstruct;

import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import UserDetails from './CompetitorDetails';
import TournamentManagerDetails from './TournamentManagerDetails';
import useAuthService from '../hooks/useAuthService';

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

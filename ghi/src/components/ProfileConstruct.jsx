// // @ts-check
// import React from 'react';
// import { useParams } from 'react-router-dom';

// import useUserDetails from '../hooks/useUserDetails';
// import useTournamentsByUser from '../hooks/useTournamentsByUser';

// /**
//  * Displays the profile page, conditionally rendering based on user type.
//  */
// function ProfileConstruct() {
//     const { userId } = useParams();
//     const { userDetails, loading: userDetailsLoading, error: userDetailsError } = useUserDetails(userId);
//     const { tournaments, loading: tournamentsLoading, error: tournamentsError } = useTournamentsByUser(userId);

//     if (userDetailsLoading || tournamentsLoading) {
//         return <div>Loading...</div>;
//     }

//     if (userDetailsError) {
//         return <div>Error loading user details: {userDetailsError}</div>;
//     }

//     if (tournamentsError) {
//         return <div>Error loading tournaments: {tournamentsError}</div>;
//     }

//     // Conditional rendering based on user type
//     const isCompetitor = userDetails?.user_type === 'competitor';
//     const isManager = userDetails?.user_type === 'tournament_manager';

//     return (
//         <div className="profile-page">
//             <h1>{userDetails?.username}'s Profile</h1>
//             <img src={userDetails?.photo_url} alt="Profile" />
//             <p>Name: {userDetails?.first_name} {userDetails?.last_name}</p>
//             <p>Phone: {userDetails?.phone_number}</p>
//             <p>Address: {userDetails?.address}</p>

//             {isCompetitor && (
//                 <>
//                     <h2>My Tournaments</h2>
//                     {tournaments.length > 0 ? (
//                         <ul>
//                             {tournaments.map(tournament => (
//                                 <li key={tournament.id}>
//                                     {tournament.event_name} - Starting {new Date(tournament.event_start).toLocaleDateString()}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No tournaments found.</p>
//                     )}
//                 </>
//             )}

//             {isManager && (
//                 <>
//                     <h2>Managed Tournaments</h2>
//                     {/* Additional Manager-specific content could go here */}
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProfileConstruct;

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import SignInForm from './SignInForm';
// import SignUpForm from './SignUpForm';
// import RandomNumberPage from '/src/testpage';
// import UserDetails from './UserDetails';
// import useAuthService from '../hooks/useAuthService';
// import useUserDetails from '../hooks/useUserDetails';
// import useTournamentsByUser from '../hooks/useTournamentsByUser';

// function Construct() {
//     const { user } = useAuthService(); // Existing authentication status
//     const { userDetails, loading: userDetailsLoading, error: userDetailsError } = useUserDetails(user?.id);
//     const { tournaments, loading: tournamentsLoading, error: tournamentsError } = useTournamentsByUser(user?.id);

//     // Loading and error handling
//     if (userDetailsLoading || tournamentsLoading) return <div>Loading...</div>;
//     if (userDetailsError) return <div>Error: {userDetailsError}</div>;
//     if (tournamentsError) return <div>Error: {tournamentsError}</div>;

//     return (
//         <>
//             <div className="homepage-background">
//                 <div className="container-lg">
//                     {!user && (
//                         <>
//                             <div className="form-container">
//                                 <SignInForm />
//                             </div>
//                             <div className="form-container">
//                                 <SignUpForm />
//                             </div>
//                         </>
//                     )}
//                     {user && (
//                         <>
//                             <div className="form-container">
//                                 <UserDetails userDetails={userDetails} />
//                                 <h2>My Tournaments</h2>
//                                 <ul>
//                                     {tournaments.map((tournament) => (
//                                         <li key={tournament.id}>{tournament.event_name} - Starting {new Date(tournament.event_start).toLocaleDateString()}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div className="form-container">
//                                 <RandomNumberPage />
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Construct;

import React from 'react';
import { useParams } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import RandomNumberPage from '/src/testpage';
import UserDetails from './CompetitorDetails';
import useAuthService from '../hooks/useAuthService';

function ProfileConstruct() {
    const { user } = useAuthService();
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
    );
}

export default ProfileConstruct;

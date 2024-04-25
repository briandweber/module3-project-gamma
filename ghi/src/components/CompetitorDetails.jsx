// // @ts-check
// import React from 'react';

// /**
//  * @typedef {Object} UserDetailsProps
//  * @prop {Object|null} userDetails - userDetails can be null or undefined.
//  * @prop {string} [userDetails.username]
//  * @prop {string} [userDetails.first_name]
//  * @prop {string} [userDetails.last_name]
//  * @prop {string} [userDetails.photo_url]
//  * @prop {string} [userDetails.phone_number]
//  * @prop {string} [userDetails.address]
//  *
//  * @param {UserDetailsProps} props
//  * @returns {React.ReactNode}
//  */
// function UserDetails({ userDetails }) {
//     if (!userDetails) {
//         // Display loading or not found message if userDetails is not available
//         return <div>Loading user details or User not found...</div>;
//     }

//     return (
//         <div className="user-details-container">
//             {userDetails.photo_url && (
//                 <div className="user-image-container">
//                     <img src={userDetails.photo_url} alt={`${userDetails.first_name} ${userDetails.last_name}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
//                 </div>
//             )}
//             <div className="user-info-container">
//                 <h2>{userDetails.first_name} {userDetails.last_name}</h2>
//                 <p>Username: {userDetails.username}</p>
//                 <p>Phone: {userDetails.phone_number}</p>
//                 <p>Address: {userDetails.address}</p>
//             </div>
//         </div>
//     );
// }

// export default UserDetails;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

function CompetitorDetails() {
    const { user } = useAuthService();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/testpage');
    };

    return (
        <div className="user-details-container">
            {user.photo_url && (
                <div className="user-image-container">
                    <img src={user.photo_url} alt={`${user.first_name} ${user.last_name}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </div>
            )}
            <div className="user-info-container">
                <h2>{user.first_name} {user.last_name}</h2>
                <p>Username: {user.username}</p>
                <p>Phone: {user.phone_number}</p>
                <p>Address: {user.address}</p>
                <button onClick={handleNavigate} className="my-tournaments-button">My Tournaments</button> {/* Button to navigate to test page */}
            </div>
        </div>
    );
}

export default CompetitorDetails;

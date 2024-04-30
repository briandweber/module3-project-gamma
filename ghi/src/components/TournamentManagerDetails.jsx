import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

function TournamentManagerDetails() {
    const { user } = useAuthService();
    const navigate = useNavigate();


    return (
        <div className="user-details-container">
            {user.photo_url && (
                <div className="user-image-container">
                    <img src={user.photo_url} alt={`${user.first_name} ${user.last_name}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </div>
            )}
            <div className="user-info-container">
                <h2>{user.first_name} {user.last_name} (Manager)</h2>
                <p>Username: {user.username}</p>
                <p>Phone: {user.phone_number}</p>
                <p>Address: {user.address}</p>
                {/* Button is also commented out:
                <button onClick={handleNavigate} className="manage-tournaments-button">Manage My Tournaments</button>
                */}
            </div>
        </div>
    );
}

export default TournamentManagerDetails;

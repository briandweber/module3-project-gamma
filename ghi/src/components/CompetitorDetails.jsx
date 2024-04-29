import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

function CompetitorDetails() {
    const { user } = useAuthService();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/mycompetitortournaments');
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

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

function CompetitorDetails() {
    const { user } = useAuthService();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        if (!user || !user.id) {
            setIsLoading(false);
            return;
        }

        const userDetailsUrl = `http://localhost:8000/api/auth/users/${user.id}`;
        try {
            const response = await fetch(userDetailsUrl);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setIsLoading(false);
            } else {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
        } catch (e) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [user.id]);

    const handleNavigate = () => {
        navigate('/mycompetitortournaments');
    };

    if (isLoading) {
        return <div>Loading user details...</div>;
    }

    if (!userData) {
        return <div>No user details available.</div>;
    }

    return (
        <div className="user-details-container">
            {userData.photo_url && (
                <div className="user-image-container">
                    <img
                        src={userData.photo_url}
                        alt={`${userData.first_name} ${userData.last_name}`}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                        }}
                    />
                </div>
            )}
            <div className="user-info-container">
                <h2>
                    {userData.first_name} {userData.last_name}
                </h2>
                <p>Username: {userData.username}</p>
                <p>Phone: {userData.phone_number}</p>
                <p>Address: {userData.address}</p>
                <Link to="/profile/edit" className="btn btn-primary">
                    Edit Profile
                </Link>
                <button onClick={handleNavigate} className="btn btn-primary">
                    My Tournaments
                </button>
            </div>
        </div>
    )
}

export default CompetitorDetails;

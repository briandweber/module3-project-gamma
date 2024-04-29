// TournamentCreateForm.jsx
import React, { useState, useEffect } from 'react';
import useAuthService from '../hooks/useAuthService';

const TournamentCreateForm = () => {
    const { user, isLoggedIn, isLoading } = useAuthService();
    const [formData, setFormData] = useState({
        user_id: '',
        event_name: '',
        roster_size: '',
        event_start: '',
        duration: '',
        event_description: '',
        picture_url: '',
        entry_fee: '',
        prize: '',
        sponsors: ''
    });

    useEffect(() => {
        if (!isLoading && isLoggedIn && user && user.user_type === 'tournament_manager') {
            setFormData(prevData => ({ ...prevData, user_id: user.id }));
        } else if (!isLoading && (!isLoggedIn || (user && user.user_type !== 'tournament_manager'))) {
            alert("You must be a tournament manager to create tournaments.");
        }
    }, [isLoggedIn, user, isLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.user_type !== 'tournament_manager') {
        alert("You are not authorized to perform this action.");
        return;
    }
    try {
        const response = await fetch('http://localhost:8000/api/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            alert('Tournament created successfully!');
        } else {
            throw new Error(data.message || 'Failed to create tournament');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert(error.message);
    }
};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        isLoggedIn && user && user.user_type === 'tournament_manager' ? (
            <form onSubmit={handleSubmit}>
                <h2>Create Tournament</h2>
                <label>
                    Event Name:
                    <input type="text" name="event_name" value={formData.event_name} onChange={handleChange} required />
                </label>
                <label>
                    Roster Size:
                    <input type="number" name="roster_size" value={formData.roster_size} onChange={handleChange} required />
                </label>
                <label>
                    Event Start Date:
                    <input type="date" name="event_start" value={formData.event_start} onChange={handleChange} required />
                </label>
                <label>
                    Duration (Days):
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
                </label>
                <label>
                    Event Description:
                    <textarea name="event_description" value={formData.event_description} onChange={handleChange} required />
                </label>
                <label>
                    Picture URL:
                    <input type="text" name="picture_url" value={formData.picture_url} onChange={handleChange} />
                </label>
                <label>
                    Entry Fee:
                    <input type="number" name="entry_fee" value={formData.entry_fee} onChange={handleChange} required />
                </label>
                <label>
                    Prize:
                    <input type="number" name="prize" value={formData.prize} onChange={handleChange} required />
                </label>
                <label>
                    Sponsors:
                    <input type="text" name="sponsors" value={formData.sponsors} onChange={handleChange} />
                </label>
                <button type="submit">Create Tournament</button>
            </form>
        ) : (
            <p>You do not have permission to create tournaments.</p>
        )
    );
};

export default TournamentCreateForm;

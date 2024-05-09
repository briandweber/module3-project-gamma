import React, { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

const VenueCreateForm = () => {
    const { user, isLoggedIn, isLoading } = useAuthService()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        venue_name: '',
        state: '',
        street_address: '',
        city: '',
        zip: '',
        photo_url: '',
        capacity: '',
        special_accommodations: '',
        venue_cost: '',
    })

    useEffect(() => {
        if (
            !isLoading &&
            isLoggedIn &&
            user &&
            user.user_type === 'venue_manager'
        ) {
            setFormData((prevData) => ({ ...prevData, user_id: user.id }))
        } else if (
            !isLoading &&
            (!isLoggedIn || (user && user.user_type !== 'venue_manager'))
        ) {
            alert('You must be a venue manager to create venues.')
        }
    }, [isLoggedIn, user, isLoading])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user || user.user_type !== 'venue_manager') {
            alert('You are not authorized to perform this action.')
            return
        }
        try {
            const response = await fetch(
                'http://localhost:8000/api/venues',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )
            const data = await response.json()
            if (response.ok) {
                alert('Venue created successfully!')
            } else {
                throw new Error(data.message || 'Failed to create venue')
            }
        } catch (error) {
            console.error('Submission error:', error)
            alert(error.message)
        }
        navigate('/venues')
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return isLoggedIn && user && user.user_type === 'venue_manager' ? (
        <div
            className="container-lg"
            style={{
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <form
                className="row"
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <h2>Create Venue</h2>
                <label>
                    Venue Name:
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="venue_name"
                            value={formData.venue_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    state:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Address:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="street_address"
                            value={formData.street_address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    City:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Zip:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Photo Url:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="photo_url"
                            value={formData.photo_url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Capacity:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Special Accommodations:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="special_accommodations"
                            value={formData.special_accommodations}
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <label>
                    Venue Cost:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="venue_cost"
                            value={formData.venue_cost}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <button className="btn btn-success" type="submit">
                    Create Venue
                </button>
            </form>
        </div>
    ) : (
        <p>You do not have permission to create Venues.</p>
    )
}

export default VenueCreateForm

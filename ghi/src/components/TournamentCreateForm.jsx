import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'

const TournamentCreateForm = () => {
    const { user, isLoggedIn, isLoading } = useAuthService()
    const [formData, setFormData] = useState({
        user_id: '',
        location: '',
        event_name: '',
        roster_size: '',
        event_start: '',
        duration: '',
        event_description: '',
        picture_url: '',
        entry_fee: '',
        prize: '',
        sponsors: '',
    })

    useEffect(() => {
        if (
            !isLoading &&
            isLoggedIn &&
            user &&
            user.user_type === 'tournament_manager'
        ) {
            setFormData((prevData) => ({ ...prevData, user_id: user.id }))
        } else if (
            !isLoading &&
            (!isLoggedIn || (user && user.user_type !== 'tournament_manager'))
        ) {
            alert('You must be a tournament manager to create tournaments.')
        }
    }, [isLoggedIn, user, isLoading])

    const [venues, setVenues] = useState([])
    const id = user.id

    const fetchData = async () => {
        const url = `http://localhost:8000/api/venues`
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                const requests = []
                for (let venue of data) {
                    const detailUrl = `http://localhost:8000/api/venues/${venue.id}`
                    requests.push(fetch(detailUrl))
                }
                const responses = await Promise.all(requests)
                const details = []
                for (const venueResponse of responses) {
                    details.push(await venueResponse.json())
                }
                setVenues(details)
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user || user.user_type !== 'tournament_manager') {
            alert('You are not authorized to perform this action.')
            return
        }
        try {
            const response = await fetch(
                'http://localhost:8000/api/tournaments',
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
                alert('Tournament created successfully!')
            } else {
                throw new Error(data.message || 'Failed to create tournament')
            }
        } catch (error) {
            console.error('Submission error:', error)
            alert(error.message)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return isLoggedIn && user && user.user_type === 'tournament_manager' ? (
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
                <h2>Create Tournament</h2>
                <label>
                    Event Name:
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="event_name"
                            value={formData.event_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Roster Size:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="roster_size"
                            value={formData.roster_size}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Event Start Date:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="date"
                            name="event_start"
                            value={formData.event_start}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Duration (Days):
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Location Select
                    <div className="col-md-5">
                        <select
                            className="form-control"
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a venue</option>
                            {venues.map((venue) => (
                                <option
                                    key={venue.id}
                                    value={
                                        venue.venue_name +
                                        ', ' +
                                        venue.street_address +
                                        ', ' +
                                        venue.city +
                                        ', ' +
                                        venue.state
                                    }
                                >
                                    {venue.venue_name}: {venue.street_address},
                                    {venue.state}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
                <label>
                    Event Description:
                    <div className="col-md-5">
                        <textarea
                            className="form-control"
                            name="event_description"
                            value={formData.event_description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Picture URL:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="picture_url"
                            value={formData.picture_url}
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <label>
                    Entry Fee:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="entry_fee"
                            value={formData.entry_fee}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Prize:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="number"
                            name="prize"
                            value={formData.prize}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Sponsors:
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            type="text"
                            name="sponsors"
                            value={formData.sponsors}
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <button className="btn btn-success" type="submit">
                    Create Tournament
                </button>
            </form>
        </div>
    ) : (
        <p>You do not have permission to create tournaments.</p>
    )
}

export default TournamentCreateForm

import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { useParams, Link } from 'react-router-dom'

function VenueDetails() {
    const { user } = useAuthService()
    const [venue, setVenue] = useState(null)
    const [hasApplied, setHasApplied] = useState(false)
    const messageClasses = !hasApplied
        ? 'alert alert-success d-none mb-0'
        : 'alert alert-success mb-0'

    const { id } = useParams()

    const handleDelete = async () => {
        const url = `http://localhost:8000/api/venues/${id}`
        const fetchConfig = {
            method: 'delete',
        }
        try {
            const response = await fetch(url, fetchConfig)

            if (response.ok) {
                window.location.reload()
            } else {
                console.error(
                    'Failed to delete venue:',
                    response.statusText
                )
            }
        } catch (error) {
            console.error('Error deleting venue:', error)
        }
    }

    const handleApply = async () => {
        if (hasApplied) {
            alert("Oops! You've already applied for this venue")
            return
        }

        const url = `http://localhost:8000/api/applications`
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify({
                venue_id: venue.id,
                user_id: user.id,
                status: 'pending',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await fetch(url, fetchConfig)

            if (response.ok) {
                setHasApplied(true)
            } else {
                console.error(
                    'Failed to submit application:',
                    response.statusText
                )
            }
        } catch (error) {
            console.error('Error with application:', error)
        }
    }

    const fetchData = async () => {
        const venueUrl = `http://localhost:8000/api/venues/${id}`
        try {
            const response = await fetch(venueUrl)
            if (response.ok) {
                const venueData = await response.json()
                setVenue(venueData)
            } else {
                console.error('Failed to fetch venue details')
            }
        } catch (error) {
            console.error('Error fetching venue details:', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [id])

    if (!venue) {
        return <div>Oops! This venue does not exist!</div>
    }

    return (
        // <div className="card mb-3 mt-3 shadow card-translucent-grey">
        <div className="page-wrapper">
            <div className="homepage-background">
                <div className="container-lg">
                    <img
                        src={venue.picture_url}
                        className="card-img-top"
                        alt="venue"
                    />
                    <div className="card-body text-center">
                        <h1 className="card-subtitle"> {venue.venue_name}</h1>
                        <h4> State: {venue.state}</h4>
                        <h4> Address: {venue.street_address}</h4>
                        <h4> City: {venue.city}</h4>
                        <h4> Zip: {venue.zip}</h4>
                        <h5 className="card-title">
                            Capacity: {venue.capacity}
                        </h5>
                        <h5 className="card-title">
                            Special Accommodations:
                            {venue.special_accommodations}
                        </h5>
                        <h5 className="card-title">
                            Venue Cost (Per Hour): ${venue.venue_cost}
                        </h5>
                        <div className="text-center">
                            {user.user_type === 'venue_manager' && (
                                <button
                                    onClick={() => handleDelete(venue.id)}
                                    className="btn btn-danger mb-3"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <div className="text-center">
                            {user.user_type === 'venue_manager' && (
                                <Link
                                    to={`/venue/${venue.id}/edit`}
                                    className="btn btn-danger mb-3"
                                >
                                    Edit
                                </Link>
                            )}
                        </div>
                        <div className="text-center">
                            {user.user_type === 'competitor' && (
                                <button
                                    onClick={() => handleApply(venue.id)}
                                    className="btn btn-danger mb-3"
                                >
                                    Apply
                                </button>
                            )}
                        </div>
                        <div className="text-center">
                            <div
                                className={messageClasses}
                                id="success-message"
                            >
                                <h2 className="mb-1">
                                    {' '}
                                    Application successful!{' '}
                                </h2>
                                <h5 className="mb-1">
                                    {' '}
                                    Check My Venues for status{' '}
                                </h5>
                                <div className="text-center">
                                    <Link
                                        to={`/`}
                                        className="btn btn-danger mb-3"
                                    >
                                        My Venue
                                    </Link>
                                </div>
                                <h2 className="mb-4">
                                    {' '}
                                    Best of luck, Gamester!{' '}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueDetails

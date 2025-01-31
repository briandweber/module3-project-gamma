import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { useParams, Link, useNavigate } from 'react-router-dom'

function VenueDetails() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { user } = useAuthService()
    const navigate = useNavigate()
    const [venue, setVenue] = useState(null)

    const { id } = useParams()

    const handleDelete = async () => {
        const url = `http://localhost:8000/api/venues/${id}`
        const fetchConfig = {
            method: 'delete',
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                navigate("/venues")
            } else {
                console.error('Failed to delete venue:', response.statusText)
            }
        } catch (error) {
            console.error('Error deleting venue:', error)
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
        <div className="page-wrapper">
            <div className="homepage-background">
                <div className="container-lg">
                    <img
                        src={venue.photo_url}
                        className="card-img-top"
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
                        <div>
                            <iframe
                                className="map"
                                width="600"
                                height="450"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${venue.street_address}+${venue.city}+${venue.state}`}
                            ></iframe>
                        </div>
                        <div className="text-center">
                            {user &&
                                user.user_type &&
                                user.user_type === 'venue_manager' && (
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueDetails

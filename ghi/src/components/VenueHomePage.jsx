import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { Navigate, Link } from 'react-router-dom'

function VenueList() {
    const { user } = useAuthService()
    const [venues, setVenues] = useState([])
    const id = user.id

    const fetchData = async () => {
        const url = `http://localhost:8000/api/venues/user/${id}`
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

    // const onApplicationsClick = (venueId) => {
    //     const applicationsUrl = `http://localhost:5173/applications/venue?id=${venueId}`
    //     return <Navigate to={applicationsUrl} />
    // }

    const onDeleteClick = async (venueId) => {
        try {
            const deleteUrl = `http://localhost:8000/api/venues/${venueId}`
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            })

            if (response.ok) {
                setVenues((prevVenues) =>
                    prevVenues.filter(
                        (venue) => venue.id !== venueId
                    )
                )
            } else {
                console.error('Error deleting venue:', response.statusText)
            }
        } catch (e) {
            console.error('Error deleting venue:', e)
        }
    }

    return (
        <div className="page-wrapper">
            <div className="homepage-background">
                <div className="container-lg">
                    <h2>Venue List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className="table-head">Venue Name</th>
                                <th className="table-head">Address</th>
                                {/* <th className="table-head">Applications</th> */}
                                <th className="table-head">Details</th>
                                <th className="table-head">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues.map((venue) => (
                                <tr className="table-row" key={venue.id}>
                                    <td className="table-data">
                                        {venue.venue_name}
                                    </td>
                                    <td className="table-data">
                                        {venue.street_address}
                                    </td>
                                    {/* <td className="table-data">
                                        <Link
                                            to={`http://localhost:5173/applications/?id=${venue.id}`}
                                            className="btn btn-danger mb-3"
                                        >
                                            Applications
                                        </Link>
                                    </td> */}
                                    <td className="table-data">
                                        <Link
                                            to={`http://localhost:5173/venue/${venue.id}`}
                                            className="btn btn-danger mb-3"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                    <td className="table-data">
                                        <button
                                            className="btn btn-danger mb-3"
                                            onClick={() =>
                                                onDeleteClick(venue.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default VenueList

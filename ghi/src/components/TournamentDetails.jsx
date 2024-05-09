import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function TournamentDetails() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { user } = useAuthService()
    const navigate = useNavigate()
    const [tournament, setTournament] = useState(null)
    const [hasApplied, setHasApplied] = useState(false)
    const messageClasses = !hasApplied
        ? 'alert alert-success d-none mb-0'
        : 'alert alert-success mb-0'

    const { id } = useParams()

    const handleDelete = async () => {
        const url = `http://localhost:8000/api/tournaments/${id}`
        const fetchConfig = {
            method: 'delete',
        }
        try {
            const response = await fetch(url, fetchConfig)

            if (response.ok) {
                navigate("/tournaments")
            } else {
                console.error(
                    'Failed to delete tournament:',
                    response.statusText
                )
            }
        } catch (error) {
            console.error('Error deleting tournament:', error)
        }
    }

    const handleApply = async () => {
        const applicationsUrl = `http://localhost:8000/api/applications`
        let matchingApplication = false

        try {
            const response = await fetch(applicationsUrl)
            if (response.ok) {
                const applications_dict = await response.json()
                const applications = applications_dict.applications
                for (const key in applications) {
                    if (
                        applications[key].user_id === user.id &&
                        applications[key].tournament_id === tournament.id
                    ) {
                        matchingApplication = true
                        break
                    }
                }
            } else {
                console.error('Failed to fetch applications')
            }
        } catch (error) {
            console.error('Error fetching applications:', error)
        }

        if (matchingApplication) {
            alert("Oops! You've already applied for this tournament")
            return
        } else {
            const url = `http://localhost:8000/api/applications`
            const fetchConfig = {
                method: 'post',
                body: JSON.stringify({
                    tournament_id: tournament.id,
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
    }

    const fetchData = async () => {
        const tournamentUrl = `http://localhost:8000/api/tournaments/${id}`
        try {
            const response = await fetch(tournamentUrl)
            if (response.ok) {
                const tournamentData = await response.json()
                setTournament(tournamentData)
            } else {
                console.error('Failed to fetch tournament details')
            }
        } catch (error) {
            console.error('Error fetching tournament details:', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [id])

    if (!tournament) {
        return <div>Oops! This tournament does not exist!</div>
    }

    const subListLocation = tournament.location.split(', ')
    const address = subListLocation[1]
    const city = subListLocation[2]
    const state = subListLocation[3]

    return (
        <div className="page-wrapper">
            <div className="homepage-background">
                <div className="container-lg">
                    <img
                        src={tournament.picture_url}
                        className="card-img-top"
                        alt="Tournament"
                    />
                    <div className="card-body text-center">
                        <h1 className="card-subtitle">
                            {' '}
                            {tournament.event_name}
                        </h1>
                        <h4>Location: {tournament.location}</h4>
                        <h4> Roster Size: {tournament.roster_size}</h4>
                        <h4> Event Starts on: {tournament.event_start}</h4>
                        <h4> Duration (Days): {tournament.duration}</h4>
                        <h5 className="card-title">
                            {tournament.event_description}
                        </h5>
                        <h5 className="card-title">
                            Entry Fee: ${tournament.entry_fee}
                        </h5>
                        <h5 className="card-title">
                            Prize: ${tournament.prize}
                        </h5>
                        <h5 className="card-title">
                            Roster Size: {tournament.roster_size}
                        </h5>
                        <h5 className="card-title">
                            Sponsors: {tournament.sponsors}
                        </h5>
                        <div>
                            <iframe
                                className="map"
                                width="600"
                                height="450"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${address}+${city}+${state}`}
                            ></iframe>
                        </div>
                        <div className="text-center">
                            {user.user_type === 'tournament_manager' && (
                                <button
                                    onClick={() => handleDelete(tournament.id)}
                                    className="btn btn-danger mb-3"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <div className="text-center">
                            {user.user_type === 'tournament_manager' && (
                                <Link
                                    to={`/tournaments/${tournament.id}/edit`}
                                    className="btn btn-danger mb-3"
                                >
                                    Edit
                                </Link>
                            )}
                        </div>
                        <div className="text-center">
                            {user.user_type === 'competitor' && (
                                <button
                                    onClick={() => handleApply(tournament.id)}
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
                                    Check My Tournaments for status{' '}
                                </h5>
                                <div className="text-center">
                                    <Link
                                        to={`/mycompetitortournaments`}
                                        className="btn btn-danger mb-3"
                                    >
                                        My Tournaments
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

export default TournamentDetails

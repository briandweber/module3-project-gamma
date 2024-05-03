import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { useParams, Link } from 'react-router-dom'

function TournamentDetails() {
    const { user } = useAuthService()
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
                window.location.reload()
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
        if (hasApplied) {
            alert("Oops! You've already applied for this tournament")
            return
        }

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
        return <div>Oops! This tournament doesn't exist!</div>
    }

    return (
        // <div className="card mb-3 mt-3 shadow card-translucent-grey">
        <div className="container-lg">
            <img
                src={tournament.picture_url}
                className="card-img-top"
                alt="Tournament"
            />
            <div className="card-body text-center">
                <h1 className="card-subtitle"> {tournament.event_name}</h1>
                <h4> Roster Size: {tournament.roster_size}</h4>
                <h4> Event Starts on: {tournament.event_start}</h4>
                <h4> Duration: {tournament.duration} minutes</h4>
                <h5 className="card-title">{tournament.event_description}</h5>
                <h5 className="card-title">
                    Entry Fee: ${tournament.entry_fee}
                </h5>
                <h5 className="card-title">Prize: ${tournament.prize}</h5>
                <h5 className="card-title">
                    Roster Size: {tournament.roster_size}
                </h5>
                <h5 className="card-title">Sponsors: {tournament.sponsors}</h5>
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
                    <div className={messageClasses} id="success-message">
                        <h2 className="mb-1"> Application successful! </h2>
                        <h5 className="mb-1">
                            {' '}
                            Check My Tournaments for status{' '}
                        </h5>
                        <div className="text-center">
                            <Link
                                to={`/mytournaments`}
                                className="btn btn-danger mb-3"
                            >
                                My Tournaments
                            </Link>
                        </div>
                        <h2 className="mb-4"> Best of luck, Gamester! </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TournamentDetails

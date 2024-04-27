import React, { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { Navigate, Link } from 'react-router-dom'

function TournamentList() {
    const {user} = useAuthService()
    const [tournaments, setTournaments] = useState([])
    const id = user.id

    const fetchData = async () => {
        const url = `http://localhost:8000/api/tournaments/user/${id}`
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                const requests = []
                for (let tournament of data) {
                    const detailUrl = `http://localhost:8000/api/tournaments/${tournament.id}`
                    requests.push(fetch(detailUrl))
                }
                const responses = await Promise.all(requests)
                const details = []
                for (const tournamentResponse of responses) {
                    details.push(await tournamentResponse.json())
                }
                setTournaments(details)
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [id])

    const onApplicationsClick = (tournamentId) => {
        const applicationsUrl = (
            `http://localhost:5173/applications/tournament?id=${tournamentId}`
        )
        return <Navigate to={applicationsUrl} />
    }

const onDeleteClick = async (tournamentId) => {
    try {

        const deleteUrl = `http://localhost:8000/api/tournaments/${tournamentId}`
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
        })

        if (response.ok) {
            setTournaments((prevTournaments) =>
                prevTournaments.filter(
                    (tournament) => tournament.id !== tournamentId
                )
            )

        } else {
            console.error('Error deleting tournament:', response.statusText)
        }
    } catch (e) {
        console.error('Error deleting tournament:', e)
    }
}

return (
    <div>
        <h2>Tournament List</h2>
        <table>
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Start</th>
                    <th>Applications</th>
                    <th>Details</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tournaments.map((tournament) => (
                    <tr key={tournament.id}>
                        <td>{tournament.event_name}</td>
                        <td>{tournament.event_start}</td>
                        <td>
                            <Link
                                to={`http://localhost:5173/applications/tournament?id=${tournament.id}`}
                                className="btn btn-danger mb-3"
                            >
                                Applications
                            </Link>
                        </td>
                        <td>
                            <button
                                onClick={() => onDetailsClick(tournament.id)}
                            >
                                Details
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={() => onDeleteClick(tournament.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
}

export default TournamentList

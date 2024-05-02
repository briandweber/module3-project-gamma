import React, { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { Navigate, Link } from 'react-router-dom'

function TournamentList() {
    const { user } = useAuthService()
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
        const applicationsUrl = `http://localhost:5173/applications/tournament?id=${tournamentId}`
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
        <div className="container-lg">
            <h2>Tournament List</h2>
            <table>
                <thead>
                    <tr>
                        <th className="table-head">Event Name</th>
                        <th className="table-head">Event Start</th>
                        <th className="table-head">Applications</th>
                        <th className="table-head">Details</th>
                        <th className="table-head">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tournaments.map((tournament) => (
                        <tr className="table-row" key={tournament.id}>
                            <td className="table-data">
                                {tournament.event_name}
                            </td>
                            <td className="table-data">
                                {tournament.event_start}
                            </td>
                            <td className="table-data">
                                <Link
                                    to={`http://localhost:5173/applications/?id=${tournament.id}`}
                                    className="btn btn-danger mb-3"
                                >
                                    Applications
                                </Link>
                            </td>
                            <td className="table-data">
                                <Link
                                    to={`http://localhost:5173/tournaments/${tournament.id}`}
                                    className="btn btn-danger mb-3"
                                >
                                    Details
                                </Link>
                            </td>
                            <td className="table-data">
                                <button
                                    className="btn btn-danger mb-3"
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

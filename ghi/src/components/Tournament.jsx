import React, { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'

function TournamentList() {
    const { user } = useAuthService()
    const [tournaments, setTournaments] = useState([])
    console.log(user)
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

    return (
        <div>
            <h2>Tournament List</h2>
            <ul>
                {tournaments.map((tournament) => (
                    <li key={tournament.id}>
                        <strong>Event Name:</strong> {tournament.event_name}
                        <br />
                        <strong>Roster Size:</strong> {tournament.roster_size}
                        <br />
                        <strong>Event Start:</strong> {tournament.event_start}
                        <br />
                        <strong>Duration:</strong> {tournament.duration} hours
                        <br />
                        <strong>Event Description:</strong>{' '}
                        {tournament.event_description}
                        <br />
                        <strong>Picture URL:</strong> {tournament.picture_url}
                        <br />
                        <strong>Entry Fee:</strong> ${tournament.entry_fee}
                        <br />
                        <strong>Prize:</strong> ${tournament.prize}
                        <br />
                        <strong>Sponsors:</strong> {tournament.sponsors}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TournamentList

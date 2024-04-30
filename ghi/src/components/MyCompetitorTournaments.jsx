import { useEffect, useState } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function MyCompetitorTournaments() {
    const { user } = useAuthService()
    const user_id = user.id
    const [tournaments, setTournaments] = useState([])
    const getData = async () => {
        const url = `http://localhost:8000/api/tournaments/user/${user_id}`
        try {
            const response = fetch(url)
            if (response.ok) {
                const data = await response.json()
                setTournaments(data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <h2>My Tournaments</h2>
            <table>
                <thead>
                    <th>Event Name</th>
                    <th>Event Start Time</th>
                    <th>Roster Size Limit</th>
                    <th>Entry Fee</th>
                    <th>Prize</th>
                </thead>
                <tbody>
                    {tournaments.map((tournament) => (
                        <tr key={tournament.id}>
                            <td>{tournament.event_name}</td>
                            <td>{tournament.event_start}</td>
                            <td>{tournament.event_roster_size}</td>
                            <td>{tournament.event_entry_fee}</td>
                            <td>{tournament.event_prize}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

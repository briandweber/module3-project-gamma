import { useEffect, useState } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function MyCompetitorTournaments() {
    const { user } = useAuthService()
    const [tournaments, setTournaments] = useState([])
    const [applications, setApplications] = useState([])

    const getData = async () => {
        const applicationsUrl = `http://localhost:8000/api/applications/by_user/${user.id}`
        try {
            const response = await fetch(applicationsUrl)
            if (response.ok) {
                const data = await response.json()
                setApplications(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getTournamentsData = async () => {
        const tournamentsUrl = `http://localhost:8000/api/applications/by_user/${user.id}`
        try {
            const responses = await fetch(tournamentsUrl)
            if (responses.ok) {
                const data = await responses.json()
                const requests = []
                for (let tournament of data) {
                    const tourneyUrl = `http://localhost:8000/api/tournaments/${tournament.tournament_id}`
                    requests.push(await fetch(tourneyUrl))
                }
                const response = await Promise.all(requests)
                const details = []
                for (const tournamentResponse of response) {
                    details.push(await tournamentResponse.json())
                }
                setTournaments(details)
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log('tournaments')
    console.log(tournaments)
    console.log('applications')
    console.log(applications)
    useEffect(() => {
        getData(), getTournamentsData()
    }, [])
    if (!user) {
        return <div>user does not exist!</div>
    }
    return (
        <div>
            <h2>My Tournaments</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Event Start Time</th>
                        <th>Roster Size Limit</th>
                        <th>Entry Fee</th>
                        <th>Prize</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => {
                        const user = tournaments.find(
                            (u) => u.id === application.tournament_id
                        )
                        return (
                            <tr key={application.id}>
                                <td>{user?.event_name || 'N/A'}</td>
                                <td>{user?.event_start || 'N/A'}</td>
                                <td>{user?.roster_size}</td>
                                <td>{user?.entry_fee}</td>
                                <td>{user?.prize}</td>
                                <td>{application.status || 'N/A'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

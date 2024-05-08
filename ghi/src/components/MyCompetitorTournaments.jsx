import { useEffect, useState } from 'react';
import useAuthService from '../hooks/useAuthService';

export default function MyCompetitorTournaments() {
    const { user } = useAuthService();
    const [tournaments, setTournaments] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const applicationsUrl = `http://localhost:8000/api/applications/by_user/${user.id}`;
            try {
                const response = await fetch(applicationsUrl);
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                }
            } catch (e) {
                console.error('Failed to fetch applications:', e);
            }
        };

        const getTournamentsData = async () => {
            const tournamentsUrl = `http://localhost:8000/api/applications/by_user/${user.id}`;
            try {
                const response = await fetch(tournamentsUrl);
                if (response.ok) {
                    const data = await response.json();
                    const requests = data.map(tournament =>
                        fetch(`http://localhost:8000/api/tournaments/${tournament.tournament_id}`)
                    );
                    const responses = await Promise.all(requests);
                    const details = await Promise.all(responses.map(res => res.json()));
                    setTournaments(details);
                }
            } catch (e) {
                console.error('Failed to fetch tournament details:', e);
            }
        };

        if (user) {
            getData();
            getTournamentsData();
        }
    }, [user]);

    if (!user) {
        return <div>User does not exist!</div>;
    }

    return (
        <div className="page-wrapper">
            <div className="container-lg" style={{ marginTop: '5vh', paddingTop: '2vh', paddingBottom: '2vh' }}>
                <h2>My Tournaments</h2>
                <table>
                    <thead>
                        <tr>
                            <th className="table-head">Event Name</th>
                            <th className="table-head">Event Start Time</th>
                            <th className="table-head">Roster Size Limit</th>
                            <th className="table-head">Entry Fee</th>
                            <th className="table-head">Prize</th>
                            <th className="table-head">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => {
                            const tournament = tournaments.find(
                                t => t.id === application.tournament_id
                            );
                            return (
                                <tr className="table-row" key={application.id}>
                                    <td className="table-data">
                                        {tournament?.event_name || 'N/A'}
                                    </td>
                                    <td className="table-data">
                                        {tournament?.event_start || 'N/A'}
                                    </td>
                                    <td className="table-data">
                                        {tournament?.roster_size}
                                    </td>
                                    <td className="table-data">
                                        {tournament?.entry_fee}
                                    </td>
                                    <td className="table-data">{tournament?.prize}</td>
                                    <td className="table-data">
                                        {application.status || 'N/A'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

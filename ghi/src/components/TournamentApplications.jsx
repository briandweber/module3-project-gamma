import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ApplicationStatusDropdown from './TournamentApplicationUpdate'

function TournamentApplicationList() {
    const [applications, setApplications] = useState([])
    const [users , setUser] = useState([])
    const location = useLocation()
    const tournamentId = new URLSearchParams(location.search).get('id')

    const fetchApplications = async () => {
        const applicationsUrl = `http://localhost:8000/api/applications/by_tournament/${tournamentId}`
        try {
            const response = await fetch(applicationsUrl)
            if (response.ok) {
                const data = await response.json()
                setApplications(data)
            }
        } catch (error) {
            console.error('Error fetching applications:', error)
        }
    }

    const fetchUser = async () => {
        const applicationsUrl = `http://localhost:8000/api/applications/by_tournament/${tournamentId}`
        try {
            const response = await fetch(applicationsUrl)
            if (response.ok) {
                const data = await response.json()
                const requests = []
                const requestsApp = []

                for (let user of data){
                    const detailUrl = `http://localhost:8000/api/auth/users/${user.user_id}`
                    requests.push(fetch(detailUrl))
                }
                const responses = await Promise.all(requests)
                const details = []
                for (const userResponse of responses) {
                    details.push(await userResponse.json())
                }
                setUser(details)
            }
        } catch (error) {
            console.error('Error fetching applications:', error)
        }
    }


    useEffect(() => {
        fetchApplications();
        fetchUser()
    }, [tournamentId])

return (
    <div>
        <h2>Applicant</h2>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {applications
                    .filter((application) => application.status !== 'denied')
                    .map((application) => {
                        const user = users.find(
                            (u) => u.id === application.user_id
                        )
                        return (
                            <tr key={application.id}>
                                <td>{user?.username || 'N/A'}</td>
                                <td>{user?.phone_number || 'N/A'}</td>
                                <td>
                                    <ApplicationStatusDropdown
                                        applicationId={application.id}
                                    />
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
)
}

export default TournamentApplicationList

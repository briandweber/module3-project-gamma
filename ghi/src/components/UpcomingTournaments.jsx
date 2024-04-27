import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function TournamentsColumn(props) {
    return (
        <div className="col">
            {props.list.map((tournament) => {
                return (
                    <div key={tournament.id} className="card mb-3 shadow">
                        <img
                            src={tournament.picture_url}
                            className="card-img-top"
                            alt="Picture of Tournament"
                        />
                        <div className="card-body">
                            <h2 className="card-title mb-2 text-muted">
                                Tournament #{tournament.id}:{' '}
                                {tournament.event_name}
                            </h2>
                            <h4>Starts on: {tournament.event_start}</h4>
                            <h4>Duration: {tournament.duration}</h4>
                        </div>
                        <div className="text-center">
                            <Link
                                to={`/tournaments/${tournament.id}`}
                                className="btn btn-danger mb-3"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function UpcomingTournaments(props) {
    const [tournamentColumns, setTournamentColumns] = useState([[], [], []])

    async function getTournaments() {
        const url = `http://localhost:8000/api/tournaments`

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                const tournamentColumns = [[], [], []]

                data.forEach((tournament, index) => {
                    tournamentColumns[index % 3].push(tournament)
                })

                setTournamentColumns(tournamentColumns)
            } else {
                console.error('Failed to fetch tournaments')
            }
        } catch (error) {
            console.error('Error fetching tournaments:', error)
        }
    }

    useEffect(() => {
        getTournaments()
    }, [])

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                <h1 className="display-5 fw-bold">Upcoming Tournaments</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Get playing!</p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {tournamentColumns.map((tournamentList, index) => {
                        return (
                            <TournamentsColumn
                                key={index}
                                list={tournamentList}
                                getTournaments={getTournaments}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default UpcomingTournaments

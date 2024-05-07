import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TournamentsColumn(props) {
    return (
        <div className="col">
            {props.list.map((tournament) => (
                <div key={tournament.id} className="card mb-3 shadow card-translucent-grey">
                    <img
                        src={tournament.picture_url}
                        className="card-img-top"
                        alt={`Picture of Tournament ${tournament.event_name}`}
                        style={{ width: '200px', height: '200px' }}
                    />
                    <div className="card-body">
                        <h2 className="card-title mb-2">
                            Tournament #{tournament.id}: {tournament.event_name}
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
            ))}
        </div>
    );
}

function SidebarFilters({ onFilterChange, onClearFilters }) {
    const [filters, setFilters] = useState({
        eventName: '',
        rosterSizeFrom: '',
        rosterSizeTo: '',
        eventStartFrom: '',
        eventStartTo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        onFilterChange({ ...filters, [name]: value });
    };

    const handleClearFilters = () => {
        setFilters({
            eventName: '',
            rosterSizeFrom: '',
            rosterSizeTo: '',
            eventStartFrom: '',
            eventStartTo: ''
        });
        onClearFilters();
    };

    return (
        <div className="sidebar-filters">
            <div className="filter mb-3">
                <label>Event Name</label>
                <input
                    type="text"
                    name="eventName"
                    value={filters.eventName}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="filter mb-3">
                <label>Roster Size From</label>
                <input
                    type="number"
                    name="rosterSizeFrom"
                    value={filters.rosterSizeFrom}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="filter mb-3">
                <label>Roster Size To</label>
                <input
                    type="number"
                    name="rosterSizeTo"
                    value={filters.rosterSizeTo}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="filter mb-3">
                <label>Event Start Date From</label>
                <input
                    type="date"
                    name="eventStartFrom"
                    value={filters.eventStartFrom}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="filter mb-3">
                <label>Event Start Date To</label>
                <input
                    type="date"
                    name="eventStartTo"
                    value={filters.eventStartTo}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="filter mb-3">
                <button onClick={handleClearFilters} className="btn btn-secondary">
                    Clear Filters
                </button>
            </div>
        </div>
    );
}

function UpcomingTournaments(props) {
    const [tournamentColumns, setTournamentColumns] = useState([[], [], []]);

    const getTournaments = async (filters) => {
        const url = `http://localhost:8000/api/tournaments`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                let data = await response.json();
                data = data.filter(item => {
                    return (
                        (!filters.eventName || item.event_name.toLowerCase().includes(filters.eventName.toLowerCase())) &&
                        ((!filters.rosterSizeFrom && !filters.rosterSizeTo) ||
                            (parseInt(filters.rosterSizeFrom, 10) <= item.roster_size &&
                                item.roster_size <= parseInt(filters.rosterSizeTo, 10))) &&
                        (!filters.eventStartFrom || !filters.eventStartTo ||
                            (new Date(item.event_start) >= new Date(filters.eventStartFrom) &&
                                new Date(item.event_start) <= new Date(filters.eventStartTo)))
                    );
                });

                const columns = [[], [], []];
                data.forEach((tournament, index) => columns[index % 3].push(tournament));
                setTournamentColumns(columns);
            } else {
                console.error('Failed to fetch tournaments');
            }
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
    };


    const handleFilterChange = (filters) => {
        getTournaments(filters);
    };

    const handleClearFilters = () => {
        getTournaments({});
    };

    useEffect(() => {
        getTournaments({});
    }, []);

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-purple">
                <h1 className="display-5 fw-bold">Upcoming Tournaments</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Get playing!</p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <SidebarFilters onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
                    </div>
                    <div className="col-md-8">
                        {tournamentColumns.map((tournamentList, index) => (
                            <TournamentsColumn key={index} list={tournamentList} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpcomingTournaments;

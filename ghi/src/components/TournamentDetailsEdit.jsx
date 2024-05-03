// @ts-check
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams, Link } from 'react-router-dom'
import '../styles.css'
import useAuthService from '../hooks/useAuthService'

export default function TournamentDetailsEdit() {
    const [tournaments, setTournaments] = useState('')
    const [formData, setFormData] = useState({
        event_name: '',
        roster_size: '',
        event_start: '',
        duration: '',
        event_description: '',
        picture_url: '',
        entry_fee: '',
        prize: '',
        sponsors: '',
    })

    const { id } = useParams()

    const fetchData = async () => {
        const url = `http://localhost:8000/api/tournaments/${id}`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setTournaments(data)
            setFormData(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(tournaments)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:8000/api/tournaments/${id}`
        console.log(formData)
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
            } else {
                console.error('Error updating data:', response.status)
            }
        } catch (error) {
            console.error('Error updating data:', error)
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    return (
        <div className="container-lg">
            <h2>Edit Tournament Details</h2>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="event_name">Event Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="event_name"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="roster_size">Roster Size:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="roster_size"
                        name="roster_size"
                        value={formData.roster_size}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="event_start">Event Start:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="event_start"
                        name="event_start"
                        value={formData.event_start}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="duration">Duration(Hours):</label>
                    <input
                        className="form-control"
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleFormChange}
                        placeholder={formData.duration}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="event_description">
                        Event Description:
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="event_description"
                        name="event_description"
                        value={formData.event_description}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="picture_url">Picture Url:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="picture_url"
                        name="picture_url"
                        value={formData.picture_url}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="entry_fee">Entry Fee:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="entry_fee"
                        name="entry_fee"
                        value={formData.entry_fee}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="prize">Prize:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="prize"
                        name="prize"
                        value={formData.prize}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="sponsors">Sponsors:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="sponsors"
                        name="sponsors"
                        value={formData.sponsors}
                        onChange={handleFormChange}
                    />
                </div>
                <button className="btn btn-danger mt-3 mb-3" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

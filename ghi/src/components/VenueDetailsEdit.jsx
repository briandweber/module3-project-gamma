// @ts-check
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams, Link } from 'react-router-dom'
import '../styles.css'
import useAuthService from '../hooks/useAuthService'

export default function VenueDetailsEdit() {
    const [venues, setVenues] = useState('')
    const [formData, setFormData] = useState({
        venue_name: '',
        state: '',
        street_address: '',
        city: '',
        zip: '',
        photo_url: '',
        capacity: '',
        special_accommodations: '',
        venue_cost: '',
    })

    const { id } = useParams()

    const fetchData = async () => {
        const url = `http://localhost:8000/api/venues/${id}`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setVenues(data)
            setFormData(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:8000/api/venues/${id}`
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
            <h2>Edit Venue Details</h2>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="venue_name">Venue Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="venue_name"
                        name="venue_name"
                        value={formData.venue_name}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="street_address">Address:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="street_address"
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="zip">Zip:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="photo_url">Photo Url:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="photo_url"
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="capacity">
                        Capacity:
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="special_accommodations">Special Accommodations:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="special_accommodations"
                        name="special_accommodations"
                        value={formData.special_accommodations}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="venue_cost">Venue Cost:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="venue_cost"
                        name="venue_cost"
                        value={formData.venue_cost}
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

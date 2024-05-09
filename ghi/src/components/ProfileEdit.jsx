import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function ProfileEdit() {
    const { user } = useAuthService()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        user_type: '',
        first_name: '',
        last_name: '',
        photo_url: '',
        phone_number: '',
        address: '',
    })

    const fetchData = async () => {
        const url = `http://localhost:8000/api/auth/users/${user.id}`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setFormData(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:8000/api/auth/users/${user.id}`
        const d = await fetch(url)
        const data = await d.json()
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify({
                username: data.username,
                password: formData.password,
                user_type: data.user_type,
                first_name: formData.first_name,
                last_name: formData.last_name,
                photo_url: formData.photo_url,
                phone_number: formData.phone_number,
                address: formData.address,
            }),
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
            console.error('Error updating dat:', error)
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
        <div className="page-wrapper">
            <div className="homepage-background">
                <div className="container-lg">
                    <h2>Edit Profile</h2>
                    <form className="row" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="first_name">First Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
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
                            <label htmlFor="phone_number">Phone Number:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="address">Address:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                            />
                        </div>
                        <button className="btn btn-danger mb-3" type="submit">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

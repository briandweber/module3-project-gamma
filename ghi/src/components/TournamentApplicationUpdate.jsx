import React, { useState } from 'react'
function ApplicationStatusDropdown({ applicationId }) {
    const [selectedStatus, setSelectedStatus] = useState('')

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value)
    }

    const handleUpdateStatus = async () => {
        const url = `http://localhost:8000/api/applications/${applicationId}`
        try {
            const d = await fetch(url)
            const data = await d.json()
            const response = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                                        tournament_id: data.tournament_id,
                                        user_id: data.user_id,
                                        status: selectedStatus
                                    }),
            }
            fetch(url, response)
        } catch (error) {
            console.error('Error updating status:', error)
        }
        window.location.reload()
    }

    return (
        <div>
            <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="">Select status</option>
                <option value="approved">Approve</option>
                <option value="denied">Deny</option>
            </select>
            <button
                className="btn btn-danger mb-3"
                onClick={handleUpdateStatus}
            >
                Update Status
            </button>
        </div>
    )
}

export default ApplicationStatusDropdown

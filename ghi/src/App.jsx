// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// import ErrorNotification from './components/ErrorNotification'
// import Construct from './components/Construct'

import './App.css'

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

/**
 * This is an example of using JSDOC to define types for your component
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
 *
 * @returns {React.ReactNode}
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import ApplicationConstruct from 'components/ApplicationsConstruct'
// import useAuthService from 'hooks/useAuthService'
// import CompetitorDetails from 'components/CompetitorDetails'
// import ErrorNotification from './components/ErrorNotification'
// import MyCompetitorTournaments from './components/MyCompetitorTournaments'
// import ProfileConstruct from 'components/ProfileConstruct'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import SignOut from './components/SignOut'
import TournamentApplicationList from './components/TournamentApplications'
import gamesterImage from './images/gamesterImage.png'
// import ApplicationStatusDropdown from 'components/TournamentApplicationUpdate'
// import TournamentDetails from 'components/TournamentDetails'
// import TournamentManagerDetails from 'components/TournamentManagerDetails'
import TournamentList from './components/Tournaments'
import UpcomingTournaments from './components/UpcomingTournaments'

function App() {
    return (
        <BrowserRouter>
            {/* <ErrorNotification /> */}
            {/* <Nav /> */}
            <div className="container">
                <div>
                    <h1>Gamester</h1>
                    <img
                        className="gamester-image"
                        src={gamesterImage}
                        alt="gamester image"
                    />
                </div>
                <Routes>
                    <Route
                        path="applications"
                        element={<TournamentApplicationList />}
                    />
                    {/* <Route path='applications/edit' element={<ApplicationStatusDropdown />} /> */}
                    <Route path="tournaments" element={<TournamentList />} />
                    <Route
                        path="upcomingtournaments"
                        element={<UpcomingTournaments />}
                    />
                    <Route path="signin" element={<SignInForm />} />
                    <Route path="signout" element={<SignOut />} />
                    <Route path="signup" element={<SignUpForm />} />
                    {/* <Route
                        path="mycompetitortournaments"
                        element={<MyCompetitorTournaments />}
                    /> */}
                    <Route
                        path="applications"
                        element={<TournamentApplicationList />}
                    />
                    <Route
                        path="applications"
                        element={<TournamentApplicationList />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App

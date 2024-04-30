import './App.css'
import './index.css'

const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import useAuthService from './hooks/useAuthService'
import gamesterImage from './images/gamesterImage.png'

import ApplicationStatusDropdown from './components/TournamentApplicationUpdate'
import CompetitorDetails from './components/CompetitorDetails'
import LandingPage from './components/LandingPage'
import MyCompetitorTournaments from './components/MyCompetitorTournaments'
import SignInForm from './components/SignInForm'
import SignOut from './components/SignOut'
import SignUpForm from './components/SignUpForm'
import TournamentApplicationList from './components/TournamentApplications'
import TournamentDetails from './components/TournamentDetails'
import TournamentList from './components/Tournaments'
import TournamentManagerDetails from './components/TournamentManagerDetails'
import UpcomingTournaments from './components/UpcomingTournaments'
import ProfileConstruct from './components/ProfileConstruct'
import TournamentCreateForm from './components/TournamentCreateForm';

function App() {
    const { user } = useAuthService()
    return (
        <BrowserRouter>
            <div className="homepage-background">
                <div className="container-lg">
                    <div className="image-container"></div>
                    <div className="name-container">
                        <h1>Gamester</h1>
                    </div>
                    <div>
                        {user && (
                            <Link to="signout" className="btn btn-primary">
                                Sign Out
                            </Link>
                        )}
                    </div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="applications"
                        element={<TournamentApplicationList />}
                    />
                    <Route
                        path="applications/edit"
                        element={<ApplicationStatusDropdown />}
                    />
                    <Route
                        path="competitordetails"
                        element={<CompetitorDetails />}
                    />
                    <Route
                        path="mycompetitortournaments"
                        element={<MyCompetitorTournaments />}
                    />
                    <Route path="signin" element={<SignInForm />} />
                    <Route path="signout" element={<SignOut />} />
                    <Route path="signup" element={<SignUpForm />} />
                    <Route
                        path="tournaments/:id"
                        element={<TournamentDetails />}
                    />
                    <Route path="tournaments" element={<TournamentList />} />
                    <Route
                        path="tournamentmanagerdetails"
                        element={<TournamentManagerDetails />}
                    />
                    <Route
                        path="upcomingtournaments"
                        element={<UpcomingTournaments />}
                    />
                    <Route
                        path="tournament/create"
                        element={<TournamentCreateForm />}
                    />
                </Routes>
            </div>
            </div>
        </BrowserRouter>
    )
}

export default App

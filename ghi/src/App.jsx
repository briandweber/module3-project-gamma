import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import useAuthService from './hooks/useAuthService'
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
import TournamentCreateForm from './components/TournamentCreateForm'
import TournamentDetailsEdit from './components/TournamentDetailsEdit'
import ProfileEdit from './components/ProfileEdit'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import './App.css'
import './index.css'
import VenueList from './components/VenueHomePage'
import VenueCreateForm from './components/VenueCreateForm'
import VenueDetails from './components/VenueDetails'
import VenueDetailsEdit from './components/VenueDetailsEdit'

const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const { user } = useAuthService()
    return (
        <>
            <div className="page-wrapper">
                <div className="homepage-background">
                    <BrowserRouter>
                        <NavBar />

                        <div>
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
                                    path="profile/edit"
                                    element={<ProfileEdit />}
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
                                <Route
                                    path="tournaments"
                                    element={<TournamentList />}
                                />
                                <Route
                                    path="tournaments/:id/edit"
                                    element={<TournamentDetailsEdit />}
                                />
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
                                <Route path="venues" element={<VenueList />} />
                                <Route
                                    path="venue/create"
                                    element={<VenueCreateForm />}
                                />
                                <Route
                                    path="venue/:id"
                                    element={<VenueDetails />}
                                />
                                <Route
                                    path="venue/:id/edit"
                                    element={<VenueDetailsEdit />}
                                />
                            </Routes>
                        </div>
                    </BrowserRouter>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default App

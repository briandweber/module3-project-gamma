import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <>
            <div className="landing-page">
                <Link className="btn btn-primary" to="signup">
                    Sign Up
                </Link>
                <Link className="btn btn-primary" to="signin">
                    Sign In
                </Link>
            </div>
        </>
    )
}

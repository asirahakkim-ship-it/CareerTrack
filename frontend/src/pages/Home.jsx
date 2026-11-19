
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-5">

            <div className="text-center py-5">

                <h1 className="display-4 fw-bold">
                    Welcome to CareerTrack
                </h1>

                <p className="lead mt-3">
                    Track your job applications and manage your career journey
                    in one place.
                </p>

                <div className="mt-4">

                    <Link to="/login" className="btn btn-primary btn-lg me-3">
                        Login
                    </Link>

                    <Link to="/register" className="btn btn-outline-primary btn-lg">
                        Get Started
                    </Link>

                </div>

            </div>

            <div className="row mt-5 text-center">

                <div className="col-md-4 mb-3">
                    <div className="card p-4">
                        <h4>Track Applications</h4>
                        <p>Manage all your job applications in one place.</p>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-4">
                        <h4>Monitor Progress</h4>
                        <p>Track Applied, Interview, Selected and Rejected status.</p>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-4">
                        <h4>Dashboard</h4>
                        <p>View your job application statistics easily.</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;


import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    CareerTrack
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/add-application">
                        Add Application
                    </Link>

                    <Link className="nav-link" to="/my-applications">
                        My Applications
                    </Link>

                    <Link className="nav-link" to="/login">
                        Login
                    </Link>

                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>

                    <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;


import { useState, useEffect } from "react";
import API from "../api/axios";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const getDashboard = async () => {

            try {
                const response = await API.get("/dashboard/");

                setDashboard(response.data);

            } catch (error) {
                console.log("Dashboard Error:", error);
            }
        };

        getDashboard();

    }, []);

    if (!dashboard) {
        return <h3 className="container mt-5">Loading Dashboard...</h3>;
    }

    return (
        <div className="container mt-5">

            <h2>CareerTrack Dashboard</h2>

            <div className="row mt-4">

                <div className="col-md-4 mb-3">
                    <div className="card p-3">
                        <h5>Total Applications</h5>
                        <h2>{dashboard.total_application}</h2>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-3">
                        <h5>Applied</h5>
                        <h2>{dashboard.applied_count}</h2>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-3">
                        <h5>Shortlisted</h5>
                        <h2>{dashboard.shortlisted_count}</h2>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-3">
                        <h5>Interview</h5>
                        <h2>{dashboard.interview_count}</h2>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-3">
                        <h5>Selected</h5>
                        <h2>{dashboard.selected_count}</h2>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-3">
                        <h5>Rejected</h5>
                        <h2>{dashboard.rejected_count}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;

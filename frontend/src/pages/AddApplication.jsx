
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AddApplication() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [appliedDate, setAppliedDate] = useState("");
    const [status, setStatus] = useState("Applied");
    const [jobLink, setJobLink] = useState("");
    const [notes, setNotes] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                "/applications/",
                {
                    company: company,
                    role: role,
                    location: location,
                    applied_date: appliedDate,
                    status: status,
                    job_link: jobLink,
                    notes: notes
                }
            );

            alert("Application Added Successfully!");
            navigate("/dashboard");

        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                error.message ||
                "Failed to Add Application"
            );
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Job Application</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Job Role</label>
                    <input
                        type="text"
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Applied Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={appliedDate}
                        onChange={(e) => setAppliedDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Job Link</label>
                    <input
                        type="url"
                        className="form-control"
                        value={jobLink}
                        onChange={(e) => setJobLink(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Notes</label>
                    <textarea
                        className="form-control"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Application
                </button>

            </form>
        </div>
    );
}

export default AddApplication;

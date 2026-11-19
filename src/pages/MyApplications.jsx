
import { useEffect, useState } from "react";
import API from "../api/axios";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [searchCompany, setSearchCompany] = useState("");
    const [searchRole, setSearchRole] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const [editData, setEditData] = useState({
        company: "",
        role: "",
        location: "",
        applied_date: "",
        status: "Applied",
    });

    // Fetch Applications with Search and Filters
    const fetchApplications = async () => {
        try {
            const response = await API.get("/applications/", {
                params: {
                    company: searchCompany || undefined,
                    role: searchRole || undefined,
                    status: filterStatus || undefined,
                    applied_date: filterDate || undefined
                }
            });

            setApplications(response.data);

        } catch (error) {
            console.log(error.response?.data);
            alert("Failed to fetch applications");
        }
    };

    // Delete Application
    const handleDelete = async (applicationId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/applications/${applicationId}`);

            alert("Application Deleted Successfully!");

            fetchApplications();

        } catch (error) {
            console.log(error.response?.data);
            alert("Failed to delete application");
        }
    };

    // Start Editing
    const handleEdit = (app) => {

        setEditingId(app.id);

        setEditData({
            company: app.company,
            role: app.role,
            location: app.location || "",
            applied_date: app.applied_date,
            status: app.status,
        });
    };

    // Handle Input Changes
    const handleChange = (e) => {

        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    // Update Application
    const handleUpdate = async (applicationId) => {

        try {
            await API.put(
                `/applications/${applicationId}`,
                editData
            );

            alert("Application Updated Successfully!");

            setEditingId(null);

            fetchApplications();

        } catch (error) {
            console.log(error.response?.data);
            alert("Failed to update application");
        }
    };

    // Clear Search and Filters
    const handleClear = () => {

        setSearchCompany("");
        setSearchRole("");
        setFilterStatus("");
        setFilterDate("");

        fetchAllApplications();
    };

    // Fetch All Applications
    const fetchAllApplications = async () => {

        try {
            const response = await API.get("/applications/");
            setApplications(response.data);

        } catch (error) {
            console.log(error.response?.data);
            alert("Failed to fetch applications");
        }
    };

    useEffect(() => {
        fetchAllApplications();
    }, []);

    return (
        <div className="container mt-5">

            <h2>My Applications</h2>

            {/* Search and Filter */}
            <div className="row mt-4">

                <div className="col-md-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Company"
                        value={searchCompany}
                        onChange={(e) => setSearchCompany(e.target.value)}
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Role"
                        value={searchRole}
                        onChange={(e) => setSearchRole(e.target.value)}
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <select
                        className="form-control"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="col-md-3 mb-3">
                    <input
                        type="date"
                        className="form-control"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>

                <div className="col-md-12 mb-3">

                    <button
                        className="btn btn-primary me-2"
                        onClick={fetchApplications}
                    >
                        Search
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={handleClear}
                    >
                        Clear
                    </button>

                </div>

            </div>

            {/* Applications Table */}
            <table className="table table-bordered mt-3">

                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Location</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {applications.map((app) => (

                        <tr key={app.id}>

                            {editingId === app.id ? (

                                <>
                                    <td>
                                        <input
                                            className="form-control"
                                            name="company"
                                            value={editData.company}
                                            onChange={handleChange}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="form-control"
                                            name="role"
                                            value={editData.role}
                                            onChange={handleChange}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="form-control"
                                            name="location"
                                            value={editData.location}
                                            onChange={handleChange}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="applied_date"
                                            value={editData.applied_date}
                                            onChange={handleChange}
                                        />
                                    </td>

                                    <td>
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={editData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Applied">Applied</option>
                                            <option value="Shortlisted">Shortlisted</option>
                                            <option value="Interview">Interview</option>
                                            <option value="Selected">Selected</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>

                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleUpdate(app.id)}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </>

                            ) : (

                                <>
                                    <td>{app.company}</td>
                                    <td>{app.role}</td>
                                    <td>{app.location}</td>
                                    <td>{app.applied_date}</td>
                                    <td>{app.status}</td>

                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEdit(app)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(app.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>

                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

            {applications.length === 0 && (
                <p>No applications found.</p>
            )}

        </div>
    );
}

export default MyApplications;

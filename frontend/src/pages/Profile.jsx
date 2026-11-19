
import { useState, useEffect } from "react";
import API from "../api/axios";

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        const getProfile = async () => {
            try {
                const response = await API.get("/users/profile");
                setProfile(response.data);
            } catch (error) {
                console.log("Profile Error:", error);
            }
        };

        getProfile();

    }, []);

    if (!profile) {
        return <h3 className="container mt-5">Loading Profile...</h3>;
    }

    return (
        <div className="container mt-5">
            <h2>My Profile</h2>

            <div className="card p-4 mt-4" style={{ maxWidth: "500px" }}>

                <h4>{profile.name}</h4>

                <p>
                    <strong>User ID:</strong> {profile.id}
                </p>

                <p>
                    <strong>Email:</strong> {profile.email}
                </p>

            </div>
        </div>
    );
}

export default Profile;

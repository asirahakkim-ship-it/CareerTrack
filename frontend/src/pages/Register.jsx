
import { useState } from "react";
import API from "../api/axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/register", {
                name: name,
                email: email,
                password: password
            });

            alert("Registration Successful!");

        } catch (error) {
            alert(
                error.response?.data?.detail || "Registration Failed"
            );
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Your CareerTrack Account</h2>

            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

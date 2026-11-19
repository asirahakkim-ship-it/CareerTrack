
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/login", {
                email: email,
                password: password
            });

            // Store JWT token
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {
            console.log("Login Error:", error.response?.data);

            alert(
                error.response?.data?.detail ||
                error.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login to CareerTrack</h2>

            <form onSubmit={handleLogin}>
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
                        placeholder="Enter Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;

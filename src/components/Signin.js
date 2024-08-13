import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"; // Ensure that BACKEND_URL is correctly defined in your config file

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            await axios.post(
                `${BACKEND_URL}/signin`,
                {
                    username,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            alert("You are logged in");
        } catch (error) {
            console.error("Error logging in", error);
            alert("Failed to log in. Please try again.");
        }
    };

    return (
        <div>
            <input
                value={username} // Controlled component
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
            />
            <input
                value={password} // Controlled component
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <button onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};
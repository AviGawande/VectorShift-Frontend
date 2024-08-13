import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"; // Ensure that BACKEND_URL is correctly defined in your config file

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <input
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                type="text"
                placeholder="username"
            />
            <input
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                type="password"
                placeholder="password"
            />
            <button
                onClick={async () => {
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
                    alert("you are logged in");
                }}
            >
                Submit
            </button>
        </div>
    );
};

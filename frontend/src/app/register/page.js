'use client';
import React, { useState, useContext, use } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function RegisterPage(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {register} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(username, email, password);

        if(success) {console.log("Registration successful");}
        else {console.log("Registration failed");}
    }

    return(
        <>
            <div align="center">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />

                    <label htmlFor="email">Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />

                    <button type="submit">Submit</button>

                </form>
            </div>
        </>
    )
}
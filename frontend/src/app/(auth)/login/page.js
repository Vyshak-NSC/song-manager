'use client';
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function LoginPage(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const success = await login(username, password);
        if(success){ router.push("/"); }
        else { router.push("/login"); }
    }

    return(
        <div align="center">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input 
                    type="text" 
                    id="username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                />
                <br />
                <label htmlFor='password'>Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAuthenticated = !!(user && user.username);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/me', {
            credentials: 'include',
        })
            .then((response) => {
                if(!response.ok) throw new Error("Login Required");
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setError(null);
            })
            .catch((error) => {
                setUser(null);
                setError("Not logged in")
            })
            .finally(() => setIsLoading(false));
    },[])

    const login = async (username, password) => {
        try{
            const response = await fetch('http://localhost:5000/login',{
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            })
            if(!response.ok) throw new Error("Login failed")
            
            const data = await response.json();
            setUser(data);
            return true;
        }
        catch(error){
            console.log("Login failed:", JSON.stringify(error));
            return false;
        }
    }

    const logout = async () => {
        fetch('http://localhost:5000/logout',{
            method:'POST',
            credentials: 'include',
        })
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}
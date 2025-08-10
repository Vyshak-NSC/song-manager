"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);

    const getToken = () => localStorage.getItem('access_token');

    useEffect(() => {
        const token = getToken();

        if(!token){
            setIsLoading(false);
            setUser(null);
            setIsAuthenticated(false);
            return;
        }

        setIsLoading(true);
        fetch('http://localhost:5000/me', {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                if(!response.ok) throw new Error("Login Required");
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setIsAuthenticated(true);
                setError(null);
            })
            .catch((error) => {
                setUser(null);
                setIsAuthenticated(false);
                setError("Not logged in");
                localStorage.removeItem('access_token');
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
            localStorage.setItem('access_token', data.access_token);

            setUser(data);
            setIsAuthenticated(true);
            setError(null);

            return true;
        }
        catch(error){
            console.log("Login failed:", JSON.stringify(error));
            setUser(null);
            setIsAuthenticated(false);
            setError("Login failed");
            localStorage.removeItem('access_token');
            return false;
        }
    }

    const logout = async () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}
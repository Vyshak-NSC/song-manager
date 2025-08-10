"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);

    const getToken = () => localStorage.getItem('access_token');

    const refreshToken = async () => {
        try{
            const res = await fetch('http://localhost:5000/refresh', {
                method: 'GET',
                credentials: 'include',
            });
            if( !res.ok) throw new Error("faield to refresh token");

            const data = await res.json();
            localStorage.setItem('access_token', data.access_token);
            
            return data.access_token;
        }catch(error){
            logout();
            return null;
        }
    };

    const fetchUser = async (token) => {
        let accessToken = token;
        if(!accessToken){
            accessToken = getToken();
            if(!accessToken){ throw new Error("No token found"); }
        }

        let res = await fetch('http://localhost:5000/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}`},
        });
        if (res.status === 401) {
            accessToken = await refreshToken();
            if(!accessToken) throw new Error('Unauthorized');
            res = await fetch('http://localhost:5000/me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}`},
            });
        }
        if (!res.ok) throw new Error("Failed to fetch user");

        return await res.json();
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUser()
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
        },[]);

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
"use client";
import { createContext, useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

const url = "http://192.168.29.4:5000/auth";

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);

    const accessToken = "access_token";
    const router = useRouter();

    const logout = useCallback(async () => {
        try{
            await fetch(`${url}/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        }catch(error){
            console.error("Logout failed:", error);
        }
        localStorage.removeItem("access_token");
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
    },[router])

    const refreshToken = useCallback(async () => {
        try{
            const res = await fetch(`${url}/refresh`, {
                method: 'POST',
                credentials: 'include',
            });
            if(!res.ok){
                throw new Error("Failed to refresh token");
            }
            const data = await res.json();
            localStorage.setItem(accessToken, data.access_token);
            
            return data.access_token;

        }catch(error){
            console.error("Failed to refresh token:", error);
            await logout();
            return null;
        }
    }, [logout]);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem(accessToken);
        if (!token) {
            return null;
        }

        try{
            const res = await fetch(`${url}/me`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
                credentials: 'include',
            });
            console.log("Response status:", res.status);
            if (res.status === 401){
                console.log("Token expired, refreshing...");
                const newToken = await refreshToken();
                if (!newToken) {
                    console.log("Failed to refresh token, logging out...");
                    return null;
                }
                const retryToken = await fetch(`${url}/me`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Authorization': `Bearer ${newToken}` },
                });
                if (!retryToken.ok) {
                    return null;
                }
                return await retryToken.json();
            }
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            return await res.json();
        }catch{
            await logout();
            return null;
        }
    }, [logout, refreshToken]);
    
    const login = useCallback(async (username, password) => {
        setIsLoading(true);
        try{
            const response = await fetch(`${url}/login`,{
                method:'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed");
            }

            const data = await response.json();
            localStorage.setItem(accessToken, data.access_token);
            
            const userData = await fetchUser();
            if(userData){
                setUser(userData);
                setIsAuthenticated(true);
                setIsLoading(false);
                router.push("/");
            }else{
                throw new Error("Failed to fetch user data after login");
            }
            return true;

        }catch(error){
            console.error("Login failed:", error);
            setIsLoading(false);
            return false;
        }finally{
            setIsLoading(false);
        }
    })

    const register = useCallback(async (username, email, password) => {
        setIsLoading(true);
        try{
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || "Registration failed");
            }

            const loginSuccess = await login(username, password);
            if(!loginSuccess){
                throw new Error("Login after registration failed");
            }
            setIsLoading(false);
            router.push("/");
            return true;
        }catch(error){
            console.error("Registration failed:", error);
            return false;
        }
    }, [fetchUser, router]);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = await fetchUser();
            if(userData){
                setUser(userData);
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
                router.push("/login");
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [fetchUser]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
"use client";
import { createContext, useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);

    const accessToken = "access_token";
    const router = useRouter();

    const logout = useCallback(async () => {
        try{
            await fetch('http://localhost:5000/auth/logout', {
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
            const res = await fetch('http://localhost:5000/auth/refresh', {
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
            const res = await fetch('http://localhost:5000/auth/me', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            console.log("Response status:", res.status);
            if (res.status === 401){
                console.log("Token expired, refreshing...");
                const newToken = await refreshToken();
                if (!newToken) {
                    console.log("Failed to refresh token, logging out...");
                    return null;
                }
                const retryToken = await fetch('http://localhost:5000/auth/me', {
                    method: 'GET',
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
            const response = await fetch('http://localhost:5000/auth/login',{
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
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
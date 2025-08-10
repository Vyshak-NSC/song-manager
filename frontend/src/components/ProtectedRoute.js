import React, { useContext, useEffect, useState } from "react";
import { useRouter } from  "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({ children }){
    const { isAuthenticated, isLoading } = useContext(AuthContext);
        const router = useRouter();
    
        useEffect(() => {
            if (!isAuthenticated) {
                router.push("/");
            }
        }, [isAuthenticated, router]);
        
        if(!isAuthenticated){
            return null;
        }
        
        if (isLoading) {
            return(
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
            );
        }
        return <>{children}</>
}
'use client'
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <ProtectedRoute>
            <div align="center">
                <h1>My Profile</h1>
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </ProtectedRoute>
    );
}
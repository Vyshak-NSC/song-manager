'use client';

import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function NavBar() {
    const { user, logout, isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <div className="font-bold">Music Player</div>
            <div>
                {isAuthenticated ? (
                    <>
                        <span className="mr-4">Welcome, {user.username}</span>
                        <button 
                            onClick={logout}
                            className="bg-red-500 px-3 py-1 rounded"
                        >Logout</button>
                    </>
                ):(
                    <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">
                        Login
                    </Link>
                )}
            </div>       
        </nav>
    )
}
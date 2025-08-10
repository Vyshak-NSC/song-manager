'use client';

import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function NavBar() {
    const { user, logout, isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <div className="flex items-center">
                {/* Left */}
                <div className="font-bold text-xl mr-6"> 
                    NS Music
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link href="/playlists" className="hover:text-gray-300">Playlists</Link>
                    </li>
                    <li>
                        <Link href="/history" className="hover:text-gray-300">History</Link>
                    </li>
                </ul>
            </div>

            {/* Right */}
            <div>
                {isAuthenticated ? (
                    <div className="flex items-center">
                        <Link href="/profile" className="mr-4 hover:text-gray-30">Profile</Link>                        
                        <button 
                            onClick={logout}
                            className="bg-red-500 px-3 py-1 rounded"
                        >Logout</button>
                    </div>
                ):(
                    <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">
                        Login
                    </Link>
                )}
            </div>       
        </nav>
    )
}
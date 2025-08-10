'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

// Dummy data for demonstration
const dummyHistory = [
  { id: 1, title: 'Song Title 1', artist: 'Artist 1', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 2, title: 'Song Title 2', artist: 'Artist 2', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 3, title: 'Song Title 3', artist: 'Artist 3', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 4, title: 'Song Title 4', artist: 'Artist 4', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
];

const dummyPlaylists = [
  { id: 1, name: 'Playlist 1' },
  { id: 2, name: 'Playlist 2' },
  { id: 3, name: 'Playlist 3' },
  { id: 4, name: 'Playlist 4' },
];

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch data here
    // For now, we'll use dummy data
    setHistory(dummyHistory);
    setPlaylists(dummyPlaylists);
  }, []);

  return (
    <ProtectedRoute>
      <div className="bg-[#121212] min-h-screen text-white p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">User: {user?.username}</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-gray-400">Home</Link>
            <Link href="/search" className="hover:text-gray-400">Search</Link>
          </nav>
        </header>

        {/* History Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <div className="flex overflow-x-auto space-x-4">
            {history.map((song) => (
              <div key={song.id} className="w-[180px] flex-shrink-0">
                <div className="w-full h-[180px] bg-[#2a2a2a] rounded-lg overflow-hidden">
                  {song.imageUrl ? (
                    <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#2a2a2a] flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="font-semibold truncate">{song.title}</p>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Playlists Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-[#1e1e1e] rounded-lg p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm12 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <span className="font-medium truncate">{playlist.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
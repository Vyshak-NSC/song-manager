'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import PlaylistsSection from '@/components/PlaylistsSection';
import HistorySection from '@/components/HistorySection';


// Dummy data for demonstration
const dummyHistory = [
  { id: 1, title: 'Song Title 1', artist: 'Artist 1', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 2, title: 'Song Title 2', artist: 'Artist 2', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 3, title: 'Song Title 3', artist: 'Artist 3', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 4, title: 'Song Title 4', artist: 'Artist 4', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
];

const dummyPlaylists = [
    { id: 1, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 2, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 3, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 4, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 5, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 6, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
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
      <div className='bg-[#121212] min-h-screen text-white p-6'>
        <HistorySection history={history} />
        <PlaylistsSection />
      </div>
    </ProtectedRoute>
  );
}
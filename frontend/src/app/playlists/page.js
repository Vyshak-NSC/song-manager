'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import PlaylistsSection from '@/components/PlaylistsSection';

const dummyPlaylists = [
    { id: 1, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 2, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 3, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 4, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 5, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 6, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
];

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setPlaylists(dummyPlaylists);
  }, []);

  return (
    <ProtectedRoute>
      <PlaylistsSection />
    </ProtectedRoute>
  );
}
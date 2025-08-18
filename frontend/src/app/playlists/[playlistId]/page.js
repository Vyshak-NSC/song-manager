"use client";
import React, {use, useEffect, useState} from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link'; // Import Link if you'll link to song details

const dummyPlaylist = [
  { id: 1, title: 'Song Title 1', artist: 'Artist 1', album: 'Album Name 1', duration: '3:45', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 2, title: 'Song Title 2', artist: 'Artist 2', album: 'Album Name 2', duration: '4:12', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 3, title: 'Song Title 3', artist: 'Artist 3', album: 'Album Name 3', duration: '2:59', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
  { id: 4, title: 'Song Title 4', artist: 'Artist 4', album: 'Album Name 4', duration: '5:01', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
];

export default function PlaylistPage( {params} ) {
  const [playlist, setPlaylist] = useState(dummyPlaylist);

  const { playlistId } = React.use(params);
  return (
    <ProtectedRoute>
      <div className="bg-black min-h-screen text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Playlist : {playlistId}</h1>
        
        <section>
          <div className="flex flex-col gap-4">
            {playlist.map((song) => (
              <div key={song.id} className="flex items-center bg-[#1e1e1e] p-3 rounded-lg">
                {/* Left: Image */}
                <div className="w-16 h-16 flex-shrink-0 mr-4 rounded-lg overflow-hidden">
                  <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Right: Details */}
                <div className="flex-grow flex justify-between items-center">
                  <div>
                    <p className="font-semibold truncate">{song.title}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist} • {song.album}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">{song.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
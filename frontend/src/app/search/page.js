"use client";
import React, { useState } from 'react';

const dummySongs = [
  { id: 1, title: 'Song One', artist: 'Artist A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 2, title: 'Song Two', artist: 'Artist B', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 3, title: 'Another Track', artist: 'Artist C', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 4, title: 'Last One', artist: 'Artist D', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredSongs = dummySongs.filter(song =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded bg-[#1a1a1a] text-white border border-gray-700 mb-4 focus:outline-none focus:border-gray-500"
      />

      {/* Search results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#1a1a1a] rounded-lg p-4 flex items-center space-x-4"
            >
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{song.title}</h2>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
}

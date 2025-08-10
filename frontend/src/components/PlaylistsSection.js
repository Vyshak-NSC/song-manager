import React from 'react';

const dummyFavoriteArtists = [
  { id: 1, title: 'Playlist A', artist: 'Artist A', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 2, title: 'Playlist B', artist: 'Artist B', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 3, title: 'Playlist C', artist: 'Artist C', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 4, title: 'Playlist D', artist: 'Artist D', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 5, title: 'Playlist E', artist: 'Artist E', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
  { id: 6, title: 'Playlist F', artist: 'Artist F', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92' },
];

export default function PlaylistsPage({ playlists = dummyFavoriteArtists }) {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">My Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-[#1a1a1a] rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={playlist.image}
              alt={playlist.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h2 className="font-semibold">{playlist.title}</h2>
              <p className="text-gray-400 text-sm">{playlist.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

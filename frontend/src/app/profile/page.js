'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import PlaylistsSection from '@/components/PlaylistsSection';

// Dummy data for demonstration
const dummyStats = {
    songsPlayed: 2000,
    favoriteGenre: 'Pop',
    timePlayed: 10
};

const dummyFavoriteSongs = [
    { id: 1, name: 'Song Name', artist: 'Artist', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'}
];

const dummyFavoriteArtists = [
    { id: 1, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 2, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 3, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 4, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 5, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 6, name: 'A', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
];

const dummyPlaylists = [
    { id: 1, name: 'Song Name', artist: 'Artist', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 2, name: 'Favorite Artists', artist: 'Artist', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
    { id: 3, name: 'Favorite Gome', artist: 'Artist', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZCfDvITheGhtUM_VWWv7wGedzV4vaYrrwbIccFVj4CQ4OHd92'},
];

export default function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({});
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // In a real app, you would fetch user data from your API
        setStats(dummyStats);
        setFavoriteSongs(dummyFavoriteSongs);
        setFavoriteArtists(dummyFavoriteArtists);
        setPlaylists(dummyPlaylists);
    }, []);

    return (
        <ProtectedRoute>
            <div className="bg-[#121212] min-h-screen text-white p-6">
                
                {/* Profile Header and Stats */}
                <header className="flex items-center mb-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center mr-6">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-grow flex justify-around items-center space-x-8">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.songsPlayed}</p>
                            <p className="text-sm text-gray-400">Songs Played</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.favoriteGenre}</p>
                            <p className="text-sm text-gray-400">Favorite Genre</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.timePlayed}</p>
                            <p className="text-sm text-gray-400">min</p>
                        </div>
                    </div>
                </header>

                {/* Favorite Songs and Artists */}
                <section className="mb-10 flex space-x-6">
                    {/* Favorite Songs */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Favorite Songs</h2>
                        {favoriteSongs.map((song) => (
                            <div key={song.id} className="bg-[#1e1e1e] p-3 rounded-lg flex items-center">
                                <img src={song.imageUrl} alt={song.name} className="w-12 h-12 rounded-md object-cover mr-4"/>
                                <div>
                                    <p className="font-semibold">{song.name}</p>
                                    <p className="text-sm text-gray-400">{song.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Favorite Artists */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Favorite Artists</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {favoriteArtists.map((artist) => (
                                <div key={artist.id} className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold">
                                    {artist.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PlaylistsSection />
            </div>
        </ProtectedRoute>
    );
}
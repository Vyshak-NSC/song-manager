
import React from 'react';
import Link from 'next/link'; // Import Link if you'll link to song details

export default function HistorySection({ history }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">History</h2>
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
  );
}
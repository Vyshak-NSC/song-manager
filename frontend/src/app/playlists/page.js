'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import PlaylistsSection from '@/components/PlaylistsSection';

export default function PlaylistsPage() {
 
  return (
    <ProtectedRoute>
      <PlaylistsSection />
    </ProtectedRoute>
  );
}
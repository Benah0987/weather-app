'use client';

import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (cityName: string) => void;
  isLoading?: boolean;
}

export default function SearchBox({ onSearch, isLoading = false }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mb-6">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter city name (e.g., New York, London)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="btn btn-primary min-w-[100px]"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : 'Search'}
      </button>
    </form>
  );
}
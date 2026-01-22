import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import { UserRole, VerificationLevel } from '../../types';

// Mock Data for Discovery
const DISCOVER_PROFILES = [
  {
    id: 'd1',
    name: 'Elena Rossi',
    handle: 'elena_art',
    role: UserRole.CREATOR,
    location: 'Milan, Italy',
    category: 'Editorial',
    avatar: 'https://picsum.photos/200/200?random=101',
    badges: [VerificationLevel.ID_VERIFIED],
    rating: 5.0,
    reviewCount: 42
  },
  {
    id: 'd2',
    name: 'Studio Zenith',
    handle: 'zenith_official',
    role: UserRole.AGENCY,
    location: 'London, UK',
    category: 'Talent Mgmt',
    avatar: 'https://picsum.photos/200/200?random=102',
    badges: [VerificationLevel.PROFESSIONAL_VERIFIED, VerificationLevel.SAFE_SET_CERTIFIED],
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 'd3',
    name: 'James K.',
    handle: 'james_cam',
    role: UserRole.PHOTOGRAPHER,
    location: 'Los Angeles, CA',
    category: 'Fashion & Swim',
    avatar: 'https://picsum.photos/200/200?random=103',
    badges: [VerificationLevel.PROFESSIONAL_VERIFIED],
    rating: 4.9,
    reviewCount: 23
  },
  {
    id: 'd4',
    name: 'Sarah Jenkins',
    handle: 'sjenkins',
    role: UserRole.CREATOR,
    location: 'Austin, TX',
    category: 'Fitness',
    avatar: 'https://picsum.photos/200/200?random=104',
    badges: [VerificationLevel.ID_VERIFIED],
    rating: 4.6,
    reviewCount: 12
  },
   {
    id: 'd5',
    name: 'Marco V.',
    handle: 'marcoviz',
    role: UserRole.PHOTOGRAPHER,
    location: 'Berlin, Germany',
    category: 'Dark Art',
    avatar: 'https://picsum.photos/200/200?random=105',
    badges: [VerificationLevel.ID_VERIFIED],
    rating: 4.7,
    reviewCount: 30
  }
];

const FILTERS = ['All', 'Creators', 'Photographers', 'Agencies'];

export const DiscoverFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = DISCOVER_PROFILES.filter(profile => {
    const matchesFilter = activeFilter === 'All' || profile.role.toUpperCase() + 'S' === activeFilter.toUpperCase() || (activeFilter === 'Creators' && profile.role === UserRole.CREATOR);
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || profile.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Search Bar Section */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-frames-azure transition-colors" size={20} />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm font-medium text-frames-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-frames-azure/20 focus:border-frames-azure transition-all shadow-sm"
            placeholder="Search for creators, photographers, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              activeFilter === filter
                ? 'bg-frames-azure text-white border-frames-azure shadow-md shadow-sky-100'
                : 'bg-frames-ice text-slate-500 border-transparent hover:bg-blue-100 hover:text-frames-azure'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Discovery Grid */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
           <p>No professionals found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
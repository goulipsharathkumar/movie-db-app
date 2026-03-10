import React from 'react';
import { getImageUrl } from '../services/tmdbApi';

const CastCard = ({ cast }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <img src={getImageUrl(cast.profile_path, 'w185')} alt={cast.name} className="w-full h-64 object-cover" />
    <div className="p-3">
      <h4 className="text-white font-semibold text-sm mb-1">{cast.name}</h4>
      <p className="text-gray-400 text-xs">as {cast.character}</p>
    </div>
  </div>
);

export default CastCard;

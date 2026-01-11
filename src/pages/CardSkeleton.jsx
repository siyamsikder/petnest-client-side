import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-gray-700 animate-pulse">
      <div className="w-full h-56 bg-gray-700 rounded-t-2xl"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-10 bg-gray-700 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
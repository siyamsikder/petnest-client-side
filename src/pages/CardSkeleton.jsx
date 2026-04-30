import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm animate-pulse overflow-hidden h-[550px]">
      <div className="w-full h-64 bg-gray-200"></div>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
        </div>
        <div className="h-14 bg-gray-200 rounded-2xl mt-auto"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
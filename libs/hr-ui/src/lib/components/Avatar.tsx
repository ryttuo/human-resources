import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  fullName: string;
  status: string;
  imageUrl: string;
}

export const Avatar: React.FC<AvatarProps> = ({ fullName, status, imageUrl }) => {
  return (
    <div className="relative h-16 w-16">
      {status !== 'ACTIVE' && (
        <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          Inactive
        </div>
      )}
      <Image
        src={imageUrl}
        alt={fullName}
        fill
        sizes="(max-width: 64px) 100vw, 64px"
        className="rounded-full object-cover"
      />
    </div>
  );
};

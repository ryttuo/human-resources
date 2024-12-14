import React from 'react';
type TitleType = 'normal' | 'large' | 'small';

interface TitleProps {
  name: string; 
  type?: TitleType;
}

export const Title: React.FC<TitleProps> = ({ name, type = 'large' }) => {
  return (
    <>
      {type === 'large' && <h1 className="text-2xl capitalize font-bold mb-6">{name}</h1>}
      {type === 'normal' && <h2 className="text-2xl capitalize font-bold mb-6">{name}</h2>}
      {type === 'small' && <h3 className="text-2xl capitalize font-bold mb-6">{name}</h3>}
    </>
  );
};

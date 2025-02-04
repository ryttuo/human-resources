import React from 'react';

export interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick, 
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}) => {
  return (
    <button 
      onClick={onClick} 
      type={type}
      disabled={disabled}
      className={`${
        variant === 'primary'
          ? 'bg-green-200 text-green-700 hover:bg-green-300'
          : variant === 'secondary'
          ? 'bg-orange-200 text-orange-700 hover:bg-orange-300'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } font-semibold py-2 px-4 rounded border ${className}`}
    >
      {children}
    </button>
  );
};

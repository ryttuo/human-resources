import './global.css';
import React from 'react';
import RootLayoutClient from './RootLayoutClient';

export const metadata = {
  title: 'HR Web App',
  description: 'HR Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayoutClient>
      <div className="max-w-[768px] mx-auto">{children}</div>
    </RootLayoutClient>
  );
}

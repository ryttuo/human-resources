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
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
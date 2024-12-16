'use client';

import { Inter } from 'next/font/google';
import { AppStateProvider, useAppState } from './context/appStateContext';
import { useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] });

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

function AuthenticatedLayout({ children }: Readonly<AuthenticatedLayoutProps>) {
  return (
    <div
      className="w-full overflow-auto pb-12 md:pb-0"
      style={{ height: 'calc(100vh)' }}
    >
      {children}
    </div>
  );
}

interface RootLayoutClientProps {
  children: React.ReactNode;
}

function AppInitializer() {
  const { fetchDepartments } = useAppState();
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);
  return null;
}

export default function RootLayoutClient({
  children,
}: Readonly<RootLayoutClientProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateProvider>
          <AppInitializer />
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </AppStateProvider>
      </body>
    </html>
  );
}

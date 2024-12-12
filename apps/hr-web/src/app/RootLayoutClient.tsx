'use client';

import { Inter } from 'next/font/google';

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

export default function RootLayoutClient({
  children,
}: Readonly<RootLayoutClientProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </body>
    </html>
  );
}

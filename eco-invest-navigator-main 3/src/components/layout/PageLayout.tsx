
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { Toaster } from 'sonner';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6 min-h-[calc(100vh-4rem)] max-w-7xl mx-auto">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

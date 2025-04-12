
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { TopNav } from './top-nav';
import { useAuth } from '@/contexts/auth-context';

export const AppShell = () => {
  const { isAuthenticated } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isAuthenticated && <AppSidebar />}
        <div className="flex-1 flex flex-col">
          {isAuthenticated && <TopNav />}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

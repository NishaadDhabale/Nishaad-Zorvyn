import React from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full selection:bg-orange-200 selection:text-orange-500 h-screen overflow-hidden">
      
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden">

        <TopNav />


        <div className="flex-1 overflow-y-auto p-3 pt-4">{children}</div>
      </main>
    </div>
  );
};



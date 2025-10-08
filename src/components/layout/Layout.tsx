'use client';

import { useState, ReactNode } from 'react';
import { Header } from './Header';
import { Toaster } from '@/components/ui/Toaster';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Main layout component for the application
 * @param title - Main page title
 * @param subtitle - Optional page subtitle
 * @param children - Page content
 */
export function Layout({ children, title, subtitle }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="lg:pl-64">
        <Header 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={handleMenuClick} 
        />
        
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
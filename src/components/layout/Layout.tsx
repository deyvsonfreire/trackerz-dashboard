'use client';

import { useState, ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * Main layout component that wraps all pages
 * @param children - Page content to render
 * @param title - Page title for the header
 * @param subtitle - Optional page subtitle
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
    </div>
  );
}
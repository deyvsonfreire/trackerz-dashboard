'use client';

import { Menu, Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

/**
 * Header component for the main application layout
 * @param title - Main page title
 * @param subtitle - Optional page subtitle
 * @param onMenuClick - Function to handle menu button click
 */
export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <button className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <User className="h-5 w-5" />
            <span className="hidden md:block text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
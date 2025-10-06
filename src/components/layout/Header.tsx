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
    <header className="bg-white border-b border-gray-200 px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden flex-shrink-0"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
          {/* Search - Hidden on mobile, show on tablet+ */}
          <div className="hidden lg:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500 w-32"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <button className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:block text-xs sm:text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
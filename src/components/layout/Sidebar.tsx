'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Settings, 
  Users, 
  Target, 
  FileText, 
  UserCheck, 
  TrendingUp,
  X,
  Layers
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: 'Dashboard Executivo',
    href: '/',
    icon: BarChart3
  },
  {
    name: 'Plataformas',
    href: '/platforms',
    icon: Layers
  },
  {
    name: 'Contas',
    href: '/accounts',
    icon: Users
  },
  {
    name: 'Campanhas',
    href: '/campaigns',
    icon: Target
  },
  {
    name: 'Conteúdo Orgânico',
    href: '/organic',
    icon: FileText
  },
  {
    name: 'Audiência',
    href: '/audience',
    icon: UserCheck
  },
  {
    name: 'Perfil Unificado',
    href: '/customer-profile',
    icon: Users
  },
  {
    name: 'Indicadores Mensais',
    href: '/monthly-indicators',
    icon: TrendingUp
  },
  {
    name: 'Configurações',
    href: '/settings',
    icon: Settings
  }
];

/**
 * Sidebar component for main navigation
 * @param isOpen - Whether the sidebar is open (mobile)
 * @param onClose - Function to close the sidebar
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Trackerz</span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-blue-700' : 'text-gray-500'
                    )} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 text-center">
              Trackerz v1.0.0
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              © 2024 Palma Parafusos
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
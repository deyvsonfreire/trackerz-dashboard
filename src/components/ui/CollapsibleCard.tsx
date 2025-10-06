'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  expandOnMobile?: boolean;
  icon?: React.ReactNode;
}

/**
 * CollapsibleCard component for mobile-friendly expandable content
 * @param title - Card title
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param defaultExpanded - Whether the card starts expanded
 * @param expandOnMobile - Whether to show expand/collapse only on mobile
 * @param icon - Optional icon for the title
 */
export function CollapsibleCard({ 
  title, 
  children, 
  className = '', 
  defaultExpanded = false,
  expandOnMobile = true,
  icon
}: CollapsibleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200 shadow-sm',
      className
    )}>
      <div 
        className={cn(
          'flex items-center justify-between p-4',
          expandOnMobile && isMobile ? 'cursor-pointer' : expandOnMobile ? 'cursor-default' : 'cursor-pointer'
        )}
        onClick={expandOnMobile ? () => {
          // Only toggle on mobile
          if (isMobile) {
            toggleExpanded();
          }
        } : toggleExpanded}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            {title}
          </h3>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (expandOnMobile) {
              // Only show button on mobile
              if (isMobile) {
                toggleExpanded();
              }
            } else {
              toggleExpanded();
            }
          }}
          className={cn(
            'flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 transition-colors',
            expandOnMobile && !isMobile ? 'hidden' : ''
          )}
          aria-label={isExpanded ? 'Recolher' : 'Expandir'}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <div className={cn(
        'transition-all duration-300 ease-in-out overflow-hidden',
        isExpanded || (expandOnMobile && !isMobile) ? 'block' : 'hidden'
      )}>
        <div className="px-4 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
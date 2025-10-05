'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * Props for the Tooltip component
 */
export interface TooltipProps {
  /** Content to display in tooltip */
  content: React.ReactNode;
  /** Children element that triggers the tooltip */
  children: React.ReactNode;
  /** Tooltip position relative to trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Custom className for tooltip */
  className?: string;
  /** Whether to show arrow */
  showArrow?: boolean;
}

const positionClasses = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
};

const arrowClasses = {
  top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
  bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
  left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
  right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
};

/**
 * Tooltip component with intelligent positioning and smooth animations
 * 
 * @param props - Tooltip component props
 * @returns JSX element representing the tooltip
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled = false,
  className,
  showArrow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Calculate optimal position based on viewport
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return position;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let optimalPosition = position;

    // Check if tooltip would overflow viewport
    switch (position) {
      case 'top':
        if (triggerRect.top - tooltipRect.height < 0) {
          optimalPosition = 'bottom';
        }
        break;
      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height > viewport.height) {
          optimalPosition = 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width < 0) {
          optimalPosition = 'right';
        }
        break;
      case 'right':
        if (triggerRect.right + tooltipRect.width > viewport.width) {
          optimalPosition = 'left';
        }
        break;
    }

    setActualPosition(optimalPosition);
  };

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after tooltip is rendered
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      className={cn(
        'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        'max-w-xs break-words',
        positionClasses[actualPosition],
        className
      )}
      role="tooltip"
    >
      {content}
      {showArrow && (
        <div
          className={cn(
            'absolute w-0 h-0 border-4',
            arrowClasses[actualPosition]
          )}
        />
      )}
    </div>
  );

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {tooltipContent}
    </div>
  );
};

/**
 * Simple tooltip wrapper for common use cases
 */
export const SimpleTooltip: React.FC<{
  text: string;
  children: React.ReactNode;
  position?: TooltipProps['position'];
}> = ({ text, children, position = 'top' }) => (
  <Tooltip content={text} position={position}>
    {children}
  </Tooltip>
);
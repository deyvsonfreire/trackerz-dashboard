'use client';

import React from 'react';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Badge } from './badge';

/**
 * Progress bar variant types
 */
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Progress bar size types
 */
export type ProgressSize = 'sm' | 'md' | 'lg';

/**
 * Segment for multi-segment progress bars
 */
export interface ProgressSegment {
  /** Segment value */
  value: number;
  /** Segment label */
  label: string;
  /** Segment color */
  color: string;
  /** Segment description */
  description?: string;
}

/**
 * Props for ProgressBar component
 */
export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Target value for goal tracking */
  target?: number;
  /** Progress bar variant */
  variant?: ProgressVariant;
  /** Progress bar size */
  size?: ProgressSize;
  /** Label text */
  label?: string;
  /** Whether to show percentage */
  showPercentage?: boolean;
  /** Whether to show value */
  showValue?: boolean;
  /** Whether to show target indicator */
  showTarget?: boolean;
  /** Custom color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Whether to animate progress */
  animated?: boolean;
  /** Whether to show striped pattern */
  striped?: boolean;
  /** Custom className */
  className?: string;
  /** Additional info */
  description?: string;
  /** Segments for multi-segment progress */
  segments?: ProgressSegment[];
}

/**
 * Progress bar component for displaying progress and goals
 * 
 * @param props - ProgressBar component props
 * @returns JSX element representing the progress bar
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  target,
  variant = 'default',
  size = 'md',
  label,
  showPercentage = true,
  showValue = false,
  showTarget = true,
  color,
  backgroundColor,
  animated = false,
  striped = false,
  className,
  description,
  segments,
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const targetPercentage = target ? Math.min(Math.max((target / max) * 100, 0), 100) : undefined;

  // Variant configurations
  const variantConfigs = {
    default: {
      bgColor: 'bg-blue-500',
      lightBgColor: 'bg-blue-100',
    },
    success: {
      bgColor: 'bg-green-500',
      lightBgColor: 'bg-green-100',
    },
    warning: {
      bgColor: 'bg-yellow-500',
      lightBgColor: 'bg-yellow-100',
    },
    danger: {
      bgColor: 'bg-red-500',
      lightBgColor: 'bg-red-100',
    },
    info: {
      bgColor: 'bg-cyan-500',
      lightBgColor: 'bg-cyan-100',
    },
  };

  // Size configurations
  const sizeConfigs = {
    sm: {
      height: 'h-2',
      textSize: 'text-xs',
      padding: 'p-1',
    },
    md: {
      height: 'h-3',
      textSize: 'text-sm',
      padding: 'p-2',
    },
    lg: {
      height: 'h-4',
      textSize: 'text-base',
      padding: 'p-3',
    },
  };

  const config = variantConfigs[variant];
  const sizeConfig = sizeConfigs[size];

  // Determine progress color based on target achievement
  const getProgressColor = (): string => {
    if (color) return color;
    
    if (target && targetPercentage) {
      if (percentage >= targetPercentage) return variantConfigs.success.bgColor;
      if (percentage >= targetPercentage * 0.8) return variantConfigs.warning.bgColor;
      return variantConfigs.danger.bgColor;
    }
    
    return config.bgColor;
  };

  // Format value display
  const formatValue = (val: number): string => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  // Calculate trend vs target
  const getTrendVsTarget = (): { trend: 'up' | 'down' | 'neutral'; difference: number } | null => {
    if (!target) return null;
    
    const difference = ((value - target) / target) * 100;
    return {
      trend: difference > 0 ? 'up' : difference < 0 ? 'down' : 'neutral',
      difference: Math.abs(difference),
    };
  };

  const trendInfo = getTrendVsTarget();

  // Render multi-segment progress bar
  if (segments && segments.length > 0) {
    const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
    
    return (
      <div className={cn('space-y-2', className)}>
        {/* Label and values */}
        {(label || showPercentage || showValue) && (
          <div className="flex items-center justify-between">
            <div>
              {label && (
                <div className={cn('font-medium text-gray-900', sizeConfig.textSize)}>
                  {label}
                </div>
              )}
              {description && (
                <div className="text-xs text-gray-500 mt-1">
                  {description}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {showValue && (
                <span className={cn('font-medium text-gray-700', sizeConfig.textSize)}>
                  {formatValue(totalValue)}{max !== 100 && `/${formatValue(max)}`}
                </span>
              )}
              {showPercentage && (
                <span className={cn('font-medium text-gray-700', sizeConfig.textSize)}>
                  {((totalValue / max) * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        )}

        {/* Multi-segment progress bar */}
        <div className={cn(
          'w-full rounded-full overflow-hidden',
          backgroundColor || 'bg-gray-200',
          sizeConfig.height
        )}>
          <div className="flex h-full">
            {segments.map((segment, index) => {
              const segmentPercentage = (segment.value / max) * 100;
              return (
                <div
                  key={index}
                  className={cn(
                    'transition-all duration-500 ease-out',
                    animated && 'animate-pulse'
                  )}
                  style={{
                    width: `${segmentPercentage}%`,
                    backgroundColor: segment.color,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Segment legend */}
        <div className="flex flex-wrap gap-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-xs text-gray-600">
                {segment.label}: {formatValue(segment.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Single progress bar
  return (
    <div className={cn('space-y-2', className)}>
      {/* Label and values */}
      {(label || showPercentage || showValue || trendInfo) && (
        <div className="flex items-center justify-between">
          <div>
            {label && (
              <div className={cn('font-medium text-gray-900', sizeConfig.textSize)}>
                {label}
              </div>
            )}
            {description && (
              <div className="text-xs text-gray-500 mt-1">
                {description}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {showValue && (
              <span className={cn('font-medium text-gray-700', sizeConfig.textSize)}>
                {formatValue(value)}{max !== 100 && `/${formatValue(max)}`}
              </span>
            )}
            {showPercentage && (
              <span className={cn('font-medium text-gray-700', sizeConfig.textSize)}>
                {percentage.toFixed(1)}%
              </span>
            )}
            {trendInfo && (
              <Badge
                variant="secondary"
                className={cn(
                  'flex items-center space-x-1',
                  trendInfo.trend === 'up' ? 'text-green-600 bg-green-50' :
                  trendInfo.trend === 'down' ? 'text-red-600 bg-red-50' :
                  'text-gray-600 bg-gray-50'
                )}
              >
                {trendInfo.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                {trendInfo.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                <span className="text-xs">
                  {trendInfo.difference.toFixed(1)}%
                </span>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Progress bar container */}
      <div className="relative">
        <div className={cn(
          'w-full rounded-full overflow-hidden',
          backgroundColor || config.lightBgColor,
          sizeConfig.height
        )}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              striped && 'bg-stripes',
              animated && 'animate-pulse'
            )}
            style={{
              width: `${percentage}%`,
              backgroundColor: color || getProgressColor(),
            }}
          />
        </div>

        {/* Target indicator */}
        {showTarget && target && targetPercentage && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gray-800 flex items-center"
            style={{ left: `${targetPercentage}%` }}
          >
            <div className="absolute -top-1 -left-1">
              <Target className="h-3 w-3 text-gray-800" />
            </div>
          </div>
        )}
      </div>

      {/* Target info */}
      {target && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Meta: {formatValue(target)}</span>
          {trendInfo && (
            <span>
              {trendInfo.trend === 'up' ? 'Acima' : 'Abaixo'} da meta em {trendInfo.difference.toFixed(1)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Circular progress component
 */
export const CircularProgress: React.FC<{
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  className?: string;
}> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-900">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
};
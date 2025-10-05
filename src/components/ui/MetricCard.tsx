'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Card } from './Card';
import { Badge } from './badge';
import { Tooltip } from './Tooltip';

/**
 * Trend direction for metrics
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Metric status types
 */
export type MetricStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Props for MetricCard component
 */
export interface MetricCardProps {
  /** Metric title */
  title: string;
  /** Main metric value */
  value: string | number;
  /** Previous value for comparison */
  previousValue?: string | number;
  /** Percentage change */
  change?: number;
  /** Trend direction */
  trend?: TrendDirection;
  /** Metric status */
  status?: MetricStatus;
  /** Unit or currency symbol */
  unit?: string;
  /** Additional description */
  description?: string;
  /** Icon component */
  icon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Custom className */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show comparison */
  showComparison?: boolean;
  /** Custom comparison label */
  comparisonLabel?: string;
  /** Additional info tooltip */
  tooltip?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Metric card component for displaying KPIs and metrics
 * 
 * @param props - MetricCard component props
 * @returns JSX element representing the metric card
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  change,
  trend,
  status = 'neutral',
  unit,
  description,
  icon,
  loading = false,
  className,
  size = 'md',
  showComparison = true,
  comparisonLabel = 'vs período anterior',
  tooltip,
  onClick,
}) => {
  // Calculate trend if not provided but change is available
  const calculatedTrend = trend || (
    change !== undefined
      ? change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
      : 'neutral'
  );

  // Size classes
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const titleSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const valueSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  // Status colors
  const statusColors = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-blue-600',
    neutral: 'text-gray-600',
  };

  // Trend colors and icons
  const trendConfig = {
    up: {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: <TrendingUp className="h-4 w-4" />,
    },
    down: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: <TrendingDown className="h-4 w-4" />,
    },
    neutral: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: <Minus className="h-4 w-4" />,
    },
  };

  // Format value
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  // Format change percentage
  const formatChange = (changeValue: number): string => {
    const sign = changeValue > 0 ? '+' : '';
    return `${sign}${changeValue.toFixed(1)}%`;
  };

  const trendStyle = trendConfig[calculatedTrend];

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <div className={cn(sizeClasses[size])}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon && (
              <div className={cn('p-2 rounded-lg', trendStyle.bgColor)}>
                <div className={statusColors[status]}>
                  {icon}
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center space-x-1">
                <h3 className={cn(
                  'font-medium text-gray-900',
                  titleSizeClasses[size]
                )}>
                  {title}
                </h3>
                {tooltip && (
                  <Tooltip content={tooltip}>
                    <Info className="h-4 w-4 text-gray-400" />
                  </Tooltip>
                )}
              </div>
              {description && (
                <p className="text-sm text-gray-500 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>

          {status === 'warning' && (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
          {status === 'danger' && (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          )}
        </div>

        {/* Value */}
        <div className="mb-4">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          ) : (
            <div className="flex items-baseline space-x-1">
              <span className={cn(
                'font-bold text-gray-900',
                valueSizeClasses[size]
              )}>
                {formatValue(value)}
              </span>
              {unit && (
                <span className="text-sm text-gray-500 font-medium">
                  {unit}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Comparison */}
        {showComparison && (change !== undefined || previousValue !== undefined) && !loading && (
          <div className="flex items-center justify-between">
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                <Badge
                  variant="secondary"
                  className={cn(
                    'flex items-center space-x-1',
                    trendStyle.color,
                    trendStyle.bgColor
                  )}
                >
                  {trendStyle.icon}
                  <span className="font-medium">
                    {formatChange(change)}
                  </span>
                </Badge>
              </div>
            )}

            <div className="text-xs text-gray-500">
              {comparisonLabel}
            </div>
          </div>
        )}

        {/* Previous value comparison */}
        {previousValue !== undefined && !loading && (
          <div className="mt-2 text-xs text-gray-500">
            Anterior: {formatValue(previousValue)}{unit}
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * Compact metric card for smaller spaces
 */
export const CompactMetricCard: React.FC<Omit<MetricCardProps, 'size' | 'description' | 'showComparison'>> = (props) => (
  <MetricCard {...props} size="sm" showComparison={false} />
);

/**
 * Large metric card for featured metrics
 */
export const FeaturedMetricCard: React.FC<MetricCardProps> = (props) => (
  <MetricCard {...props} size="lg" />
);
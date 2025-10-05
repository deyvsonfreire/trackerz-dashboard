'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle, 
  X, 
  Bell,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Badge } from './badge';

/**
 * Alert types
 */
export type AlertType = 'success' | 'warning' | 'error' | 'info' | 'metric';

/**
 * Alert priority levels
 */
export type AlertPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Alert action definition
 */
export interface AlertAction {
  /** Action label */
  label: string;
  /** Action handler */
  onClick: () => void;
  /** Action variant */
  variant?: 'default' | 'outline' | 'secondary';
}

/**
 * Props for AlertBanner component
 */
export interface AlertBannerProps {
  /** Alert type */
  type: AlertType;
  /** Alert priority */
  priority?: AlertPriority;
  /** Alert title */
  title: string;
  /** Alert message */
  message?: string;
  /** Metric value (for metric alerts) */
  metricValue?: string | number;
  /** Metric change (for metric alerts) */
  metricChange?: number;
  /** Metric unit */
  metricUnit?: string;
  /** Whether alert is dismissible */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Alert actions */
  actions?: AlertAction[];
  /** Custom icon */
  icon?: React.ReactNode;
  /** Timestamp */
  timestamp?: Date;
  /** Whether to show timestamp */
  showTimestamp?: boolean;
  /** Custom className */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to animate entrance */
  animate?: boolean;
}

/**
 * Alert banner component for displaying notifications and alerts
 * 
 * @param props - AlertBanner component props
 * @returns JSX element representing the alert banner
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  priority = 'medium',
  title,
  message,
  metricValue,
  metricChange,
  metricUnit,
  dismissible = true,
  onDismiss,
  actions = [],
  icon,
  timestamp,
  showTimestamp = true,
  className,
  size = 'md',
  animate = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle dismiss
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Alert configurations
  const alertConfigs = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
      icon: <XCircle className="h-5 w-5" />,
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
      icon: <Info className="h-5 w-5" />,
    },
    metric: {
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      iconColor: 'text-purple-600',
      icon: <Bell className="h-5 w-5" />,
    },
  };

  // Priority configurations
  const priorityConfigs = {
    low: {
      badge: 'Baixa',
      badgeColor: 'bg-gray-100 text-gray-800',
    },
    medium: {
      badge: 'Média',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    high: {
      badge: 'Alta',
      badgeColor: 'bg-orange-100 text-orange-800',
    },
    critical: {
      badge: 'Crítica',
      badgeColor: 'bg-red-100 text-red-800',
    },
  };

  // Size configurations
  const sizeConfigs = {
    sm: {
      padding: 'p-3',
      titleSize: 'text-sm',
      messageSize: 'text-xs',
      iconSize: 'h-4 w-4',
    },
    md: {
      padding: 'p-4',
      titleSize: 'text-base',
      messageSize: 'text-sm',
      iconSize: 'h-5 w-5',
    },
    lg: {
      padding: 'p-6',
      titleSize: 'text-lg',
      messageSize: 'text-base',
      iconSize: 'h-6 w-6',
    },
  };

  const config = alertConfigs[type];
  const priorityConfig = priorityConfigs[priority];
  const sizeConfig = sizeConfigs[size];

  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'border rounded-lg transition-all duration-300',
        config.bgColor,
        config.borderColor,
        sizeConfig.padding,
        animate && 'animate-in slide-in-from-top-2',
        className
      )}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', config.iconColor)}>
          {icon || config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h3 className={cn(
                'font-medium',
                config.textColor,
                sizeConfig.titleSize
              )}>
                {title}
              </h3>
              
              {priority !== 'medium' && (
                <Badge className={priorityConfig.badgeColor}>
                  {priorityConfig.badge}
                </Badge>
              )}
            </div>

            {/* Timestamp and dismiss */}
            <div className="flex items-center space-x-2">
              {showTimestamp && timestamp && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(timestamp)}</span>
                </div>
              )}

              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className={cn(
                    'p-1 rounded-full hover:bg-black/10 transition-colors',
                    config.textColor
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Message */}
          {message && (
            <p className={cn(
              config.textColor,
              sizeConfig.messageSize,
              'mb-3'
            )}>
              {message}
            </p>
          )}

          {/* Metric display */}
          {type === 'metric' && metricValue !== undefined && (
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-purple-900">
                  {typeof metricValue === 'number' ? metricValue.toLocaleString() : metricValue}
                </span>
                {metricUnit && (
                  <span className="text-sm text-purple-700">{metricUnit}</span>
                )}
              </div>

              {metricChange !== undefined && (
                <div className="flex items-center space-x-1">
                  {metricChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : metricChange < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : null}
                  <span className={cn(
                    'text-sm font-medium',
                    metricChange > 0 ? 'text-green-600' : 
                    metricChange < 0 ? 'text-red-600' : 'text-gray-600'
                  )}>
                    {metricChange > 0 ? '+' : ''}{metricChange.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex items-center space-x-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={action.onClick}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Metric alert banner for displaying metric-based alerts
 */
export const MetricAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner {...props} type="metric" />
);

/**
 * Success alert banner
 */
export const SuccessAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner {...props} type="success" />
);

/**
 * Warning alert banner
 */
export const WarningAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner {...props} type="warning" />
);

/**
 * Error alert banner
 */
export const ErrorAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner {...props} type="error" />
);
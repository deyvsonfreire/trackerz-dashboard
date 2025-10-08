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
  /** Render prop for actions */
  renderActions?: () => React.ReactNode;
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
  renderActions,
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

            {dismissible && (
              <button
                onClick={handleDismiss}
                className={cn(
                  'ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center',
                  config.textColor,
                  'hover:bg-opacity-20 hover:bg-current'
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Message */}
          {message && (
            <p className={cn('text-sm', config.textColor)}>{message}</p>
          )}

          {/* Metric */}
          {type === 'metric' && (
            <div className="flex items-center mt-2">
              <span className={cn('text-2xl font-bold', config.textColor)}>
                {metricValue}
                {metricUnit && <span className="text-base ml-1">{metricUnit}</span>}
              </span>
              {metricChange !== undefined && (
                <span className={cn(
                  'ml-2 flex items-center text-sm',
                  metricChange >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {metricChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {Math.abs(metricChange)}%
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          {renderActions && (
            <div className="mt-4 flex space-x-3">
              {renderActions()}
            </div>
          )}

          {/* Timestamp */}
          {timestamp && showTimestamp && (
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1.5" />
              {formatTimestamp(timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Pre-styled alert banner for metric updates
 */
export const MetricAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner type="metric" {...props} />
);

/**
 * Pre-styled alert banner for success messages
 */
export const SuccessAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner type="success" {...props} />
);

/**
 * Pre-styled alert banner for warning messages
 */
export const WarningAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner type="warning" {...props} />
);

/**
 * Pre-styled alert banner for error messages
 */
export const ErrorAlertBanner: React.FC<Omit<AlertBannerProps, 'type'>> = (props) => (
  <AlertBanner type="error" {...props} />
);
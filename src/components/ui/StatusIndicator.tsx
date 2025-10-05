'use client';

import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Pause, 
  Play,
  Zap,
  Wifi,
  WifiOff,
  Database,
  Server,
  Activity
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Badge } from './badge';

/**
 * Status types
 */
export type StatusType = 
  | 'online' 
  | 'offline' 
  | 'active' 
  | 'inactive' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'pending' 
  | 'paused' 
  | 'running' 
  | 'stopped' 
  | 'connected' 
  | 'disconnected'
  | 'healthy'
  | 'unhealthy';

/**
 * Status indicator size types
 */
export type StatusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Status indicator variant types
 */
export type StatusVariant = 'dot' | 'badge' | 'pill' | 'icon' | 'detailed';

/**
 * Props for StatusIndicator component
 */
export interface StatusIndicatorProps {
  /** Status type */
  status: StatusType;
  /** Display label */
  label?: string;
  /** Additional description */
  description?: string;
  /** Indicator variant */
  variant?: StatusVariant;
  /** Indicator size */
  size?: StatusSize;
  /** Whether to show pulse animation */
  pulse?: boolean;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Timestamp for last update */
  lastUpdated?: Date;
  /** Whether to show last updated time */
  showLastUpdated?: boolean;
}

/**
 * Status indicator component for displaying various states and statuses
 * 
 * @param props - StatusIndicator component props
 * @returns JSX element representing the status indicator
 */
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  description,
  variant = 'badge',
  size = 'md',
  pulse = false,
  showIcon = true,
  icon,
  className,
  onClick,
  lastUpdated,
  showLastUpdated = false,
}) => {
  // Status configurations
  const statusConfigs = {
    online: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <Wifi className="h-4 w-4" />,
      label: 'Online',
    },
    offline: {
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <WifiOff className="h-4 w-4" />,
      label: 'Offline',
    },
    active: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <Activity className="h-4 w-4" />,
      label: 'Ativo',
    },
    inactive: {
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      icon: <Pause className="h-4 w-4" />,
      label: 'Inativo',
    },
    success: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <CheckCircle className="h-4 w-4" />,
      label: 'Sucesso',
    },
    error: {
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <XCircle className="h-4 w-4" />,
      label: 'Erro',
    },
    warning: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: <AlertCircle className="h-4 w-4" />,
      label: 'Aviso',
    },
    pending: {
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <Clock className="h-4 w-4" />,
      label: 'Pendente',
    },
    paused: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: <Pause className="h-4 w-4" />,
      label: 'Pausado',
    },
    running: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <Play className="h-4 w-4" />,
      label: 'Executando',
    },
    stopped: {
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <XCircle className="h-4 w-4" />,
      label: 'Parado',
    },
    connected: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <Zap className="h-4 w-4" />,
      label: 'Conectado',
    },
    disconnected: {
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <XCircle className="h-4 w-4" />,
      label: 'Desconectado',
    },
    healthy: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <CheckCircle className="h-4 w-4" />,
      label: 'Saudável',
    },
    unhealthy: {
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <AlertCircle className="h-4 w-4" />,
      label: 'Não saudável',
    },
  };

  // Size configurations
  const sizeConfigs = {
    xs: {
      dot: 'h-2 w-2',
      text: 'text-xs',
      padding: 'px-2 py-1',
      icon: 'h-3 w-3',
    },
    sm: {
      dot: 'h-3 w-3',
      text: 'text-sm',
      padding: 'px-2.5 py-1.5',
      icon: 'h-3.5 w-3.5',
    },
    md: {
      dot: 'h-4 w-4',
      text: 'text-sm',
      padding: 'px-3 py-2',
      icon: 'h-4 w-4',
    },
    lg: {
      dot: 'h-5 w-5',
      text: 'text-base',
      padding: 'px-4 py-2.5',
      icon: 'h-5 w-5',
    },
    xl: {
      dot: 'h-6 w-6',
      text: 'text-lg',
      padding: 'px-5 py-3',
      icon: 'h-6 w-6',
    },
  };

  const config = statusConfigs[status];
  const sizeConfig = sizeConfigs[size];

  // Format last updated time
  const formatLastUpdated = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString();
  };

  // Render based on variant
  const renderIndicator = () => {
    switch (variant) {
      case 'dot':
        return (
          <div className={cn('flex items-center space-x-2', className)}>
            <div
              className={cn(
                'rounded-full',
                config.color,
                sizeConfig.dot,
                pulse && 'animate-pulse'
              )}
            />
            {label && (
              <span className={cn('font-medium', config.textColor, sizeConfig.text)}>
                {label}
              </span>
            )}
          </div>
        );

      case 'badge':
        return (
          <Badge
            className={cn(
              'flex items-center space-x-1',
              config.bgColor,
              config.textColor,
              config.borderColor,
              'border',
              pulse && 'animate-pulse',
              onClick && 'cursor-pointer hover:opacity-80',
              className
            )}
            onClick={onClick}
          >
            {showIcon && (
              <div className={sizeConfig.icon}>
                {icon || config.icon}
              </div>
            )}
            <span className={sizeConfig.text}>
              {label || config.label}
            </span>
          </Badge>
        );

      case 'pill':
        return (
          <div
            className={cn(
              'inline-flex items-center space-x-2 rounded-full',
              config.bgColor,
              config.borderColor,
              'border',
              sizeConfig.padding,
              pulse && 'animate-pulse',
              onClick && 'cursor-pointer hover:opacity-80',
              className
            )}
            onClick={onClick}
          >
            <div
              className={cn(
                'rounded-full',
                config.color,
                sizeConfig.dot
              )}
            />
            <span className={cn('font-medium', config.textColor, sizeConfig.text)}>
              {label || config.label}
            </span>
          </div>
        );

      case 'icon':
        return (
          <div
            className={cn(
              'inline-flex items-center justify-center rounded-full',
              config.bgColor,
              config.textColor,
              sizeConfig.padding,
              pulse && 'animate-pulse',
              onClick && 'cursor-pointer hover:opacity-80',
              className
            )}
            onClick={onClick}
          >
            <div className={sizeConfig.icon}>
              {icon || config.icon}
            </div>
          </div>
        );

      case 'detailed':
        return (
          <div
            className={cn(
              'flex items-start space-x-3 p-4 rounded-lg border',
              config.bgColor,
              config.borderColor,
              onClick && 'cursor-pointer hover:opacity-80',
              className
            )}
            onClick={onClick}
          >
            <div className={cn('flex-shrink-0 mt-0.5', config.textColor)}>
              <div className={sizeConfig.icon}>
                {icon || config.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className={cn('font-medium', config.textColor, sizeConfig.text)}>
                  {label || config.label}
                </h4>
                {pulse && (
                  <div
                    className={cn(
                      'rounded-full animate-pulse',
                      config.color,
                      'h-2 w-2'
                    )}
                  />
                )}
              </div>
              {description && (
                <p className={cn('mt-1 text-xs', config.textColor, 'opacity-75')}>
                  {description}
                </p>
              )}
              {showLastUpdated && lastUpdated && (
                <p className="mt-1 text-xs text-gray-500">
                  Atualizado {formatLastUpdated(lastUpdated)}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderIndicator();
};

/**
 * Service status indicator for monitoring services
 */
export const ServiceStatus: React.FC<{
  serviceName: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  uptime?: string;
  responseTime?: number;
  className?: string;
}> = ({ serviceName, status, uptime, responseTime, className }) => (
  <div className={cn('space-y-2', className)}>
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-900">{serviceName}</span>
      <StatusIndicator
        status={status === 'unknown' ? 'pending' : status}
        variant="badge"
        size="sm"
      />
    </div>
    <div className="flex items-center space-x-4 text-xs text-gray-500">
      {uptime && <span>Uptime: {uptime}</span>}
      {responseTime && <span>Resposta: {responseTime}ms</span>}
    </div>
  </div>
);

/**
 * Connection status indicator for API connections
 */
export const ConnectionStatus: React.FC<{
  name: string;
  connected: boolean;
  lastSeen?: Date;
  className?: string;
}> = ({ name, connected, lastSeen, className }) => (
  <StatusIndicator
    status={connected ? 'connected' : 'disconnected'}
    label={name}
    description={lastSeen ? `Última conexão: ${lastSeen.toLocaleString()}` : undefined}
    variant="detailed"
    pulse={connected}
    showLastUpdated={!!lastSeen}
    lastUpdated={lastSeen}
    className={className}
  />
);
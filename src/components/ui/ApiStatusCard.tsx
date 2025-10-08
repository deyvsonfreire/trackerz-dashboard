import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';

/**
 * Interface for the ApiStatusCard component props
 * @interface ApiStatusCardProps
 * @property {string} apiName - The name of the API
 * @property {string} status - The current status of the API connection ('connected', 'error', 'pending')
 * @property {string} [lastSyncTime] - The timestamp of the last successful sync
 * @property {string} [description] - A short description of the API
 * @property {string} [errorMessage] - Error message if status is 'error'
 * @property {() => void} [onRefresh] - Callback function to refresh the API status
 * @property {() => void} [onConfigure] - Callback function to configure the API
 */
interface ApiStatusCardProps {
  apiName: string;
  status: 'connected' | 'error' | 'pending';
  lastSyncTime?: string;
  description?: string;
  errorMessage?: string;
  onRefresh?: () => void;
  onConfigure?: () => void;
}

/**
 * ApiStatusCard Component
 * 
 * A card component that displays the status of an API connection with options
 * to refresh the status or configure the API. It uses different visual indicators
 * based on the connection status.
 * 
 * @param {ApiStatusCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const ApiStatusCard: React.FC<ApiStatusCardProps> = ({
  apiName,
  status,
  lastSyncTime,
  description,
  errorMessage,
  onRefresh,
  onConfigure
}) => {
  // Status badge color mapping
  const statusConfig = {
    connected: { color: 'bg-green-100 text-green-800', text: 'Conectado' },
    error: { color: 'bg-red-100 text-red-800', text: 'Erro' },
    pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pendente' }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{apiName}</CardTitle>
          <Badge className={`${statusConfig[status].color} font-medium`}>
            {statusConfig[status].text}
          </Badge>
        </div>
        {description && (
          <CardDescription className="text-sm text-gray-500 mt-1">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        {status === 'error' && errorMessage && (
          <div className="p-3 bg-red-50 rounded-md mb-3">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}
        
        {lastSyncTime && (
          <div className="flex items-center text-sm text-gray-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span>Última sincronização: {lastSyncTime}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-end gap-2">
        {onRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            className="text-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Atualizar
          </Button>
        )}
        
        {onConfigure && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={onConfigure}
            className="text-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Configurar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApiStatusCard;
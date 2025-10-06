'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  MousePointer,
  ShoppingCart,
  Filter,
  BarChart3
} from 'lucide-react';

interface DeviceData {
  device: string;
  icon: React.ReactNode;
  users: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  revenue: number;
  growth: number;
  color: string;
}

interface DevicePerformanceProps {
  timeRange?: string;
  metric?: 'users' | 'sessions' | 'revenue' | 'conversion';
  className?: string;
}

/**
 * Componente de Performance por Dispositivo
 * Analisa métricas de performance segmentadas por tipo de dispositivo
 */
export const DevicePerformance: React.FC<DevicePerformanceProps> = ({
  timeRange = '30d',
  metric = 'users',
  className = ''
}) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Dados mock de performance por dispositivo
  const deviceData: DeviceData[] = [
    {
      device: 'Mobile',
      icon: <Smartphone className="w-5 h-5" />,
      users: 45230,
      sessions: 67845,
      bounceRate: 42.3,
      avgSessionDuration: 145,
      conversionRate: 3.2,
      revenue: 125000,
      growth: 8.5,
      color: '#10B981'
    },
    {
      device: 'Desktop',
      icon: <Monitor className="w-5 h-5" />,
      users: 32150,
      sessions: 48225,
      bounceRate: 35.7,
      avgSessionDuration: 285,
      conversionRate: 5.8,
      revenue: 185000,
      growth: -2.1,
      color: '#3B82F6'
    },
    {
      device: 'Tablet',
      icon: <Tablet className="w-5 h-5" />,
      users: 8920,
      sessions: 12380,
      bounceRate: 38.9,
      avgSessionDuration: 195,
      conversionRate: 4.1,
      revenue: 45000,
      growth: 12.3,
      color: '#F59E0B'
    }
  ];

  const totalUsers = deviceData.reduce((sum, device) => sum + device.users, 0);
  const totalRevenue = deviceData.reduce((sum, device) => sum + device.revenue, 0);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getMetricValue = (device: DeviceData): number => {
    switch (metric) {
      case 'sessions':
        return device.sessions;
      case 'revenue':
        return device.revenue;
      case 'conversion':
        return device.conversionRate;
      default:
        return device.users;
    }
  };

  const getMetricLabel = (): string => {
    switch (metric) {
      case 'sessions':
        return 'Sessões';
      case 'revenue':
        return 'Receita';
      case 'conversion':
        return 'Conversão';
      default:
        return 'Usuários';
    }
  };

  const getBarWidth = (device: DeviceData): number => {
    const maxValue = Math.max(...deviceData.map(d => getMetricValue(d)));
    return (getMetricValue(device) / maxValue) * 100;
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performance por Dispositivo</h3>
          <p className="text-sm text-gray-600">
            Análise de métricas segmentada por tipo de dispositivo
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={metric}
            onChange={(e) => setSelectedDevice(null)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="users">Usuários</option>
            <option value="sessions">Sessões</option>
            <option value="revenue">Receita</option>
            <option value="conversion">Conversão</option>
          </select>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'chart'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Usuários</p>
              <p className="text-2xl font-bold text-blue-900">{formatNumber(totalUsers)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Receita Total</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Dispositivo Líder</p>
              <p className="text-2xl font-bold text-purple-900">Mobile</p>
            </div>
            <Smartphone className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Melhor Conversão</p>
              <p className="text-2xl font-bold text-orange-900">Desktop</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {viewMode === 'chart' ? (
        // Visualização em Gráfico
        <div className="space-y-6">
          {deviceData.map(device => (
            <div
              key={device.device}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedDevice === device.device
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => setSelectedDevice(selectedDevice === device.device ? null : device.device)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: device.color }}
                  >
                    {device.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{device.device}</h4>
                    <p className="text-sm text-gray-600">
                      {((device.users / totalUsers) * 100).toFixed(1)}% do total
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {metric === 'revenue' ? formatCurrency(getMetricValue(device)) : formatNumber(getMetricValue(device))}
                    {metric === 'conversion' && '%'}
                  </div>
                  <div className={`text-sm flex items-center gap-1 ${
                    device.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {device.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {device.growth >= 0 ? '+' : ''}{device.growth}%
                  </div>
                </div>
              </div>
              
              {/* Barra de Progresso */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{getMetricLabel()}</span>
                  <span>{getBarWidth(device).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${getBarWidth(device)}%`,
                      backgroundColor: device.color
                    }}
                  />
                </div>
              </div>

              {/* Métricas Resumidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Bounce Rate</div>
                  <div className="font-medium text-gray-900">{device.bounceRate}%</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Duração Média</div>
                  <div className="font-medium text-gray-900">{formatDuration(device.avgSessionDuration)}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Conversão</div>
                  <div className="font-medium text-gray-900">{device.conversionRate}%</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Receita</div>
                  <div className="font-medium text-gray-900">{formatCurrency(device.revenue)}</div>
                </div>
              </div>

              {/* Detalhes Expandidos */}
              {selectedDevice === device.device && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Usuários Únicos</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {device.users.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointer className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Sessões</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {device.sessions.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Sessões/Usuário</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {(device.sessions / device.users).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Visualização em Tabela
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Dispositivo</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Usuários</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Sessões</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Bounce Rate</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Duração</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Conversão</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Receita</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Crescimento</th>
              </tr>
            </thead>
            <tbody>
              {deviceData.map(device => (
                <tr key={device.device} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: device.color }}
                      >
                        {device.icon}
                      </div>
                      <span className="font-medium text-gray-900">{device.device}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-medium text-gray-900">
                    {formatNumber(device.users)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatNumber(device.sessions)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {device.bounceRate}%
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatDuration(device.avgSessionDuration)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {device.conversionRate}%
                  </td>
                  <td className="text-right py-3 px-4 font-medium text-gray-900">
                    {formatCurrency(device.revenue)}
                  </td>
                  <td className={`text-right py-3 px-4 font-medium ${
                    device.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {device.growth >= 0 ? '+' : ''}{device.growth}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Insights Principais</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Mobile representa {((deviceData[0].users / totalUsers) * 100).toFixed(1)}% dos usuários, mas Desktop tem melhor conversão</li>
          <li>• Tablet mostra o maior crescimento ({deviceData[2].growth}%) no período</li>
          <li>• Desktop tem a maior duração média de sessão ({formatDuration(deviceData[1].avgSessionDuration)})</li>
          <li>• Mobile tem o maior volume de receita apesar da menor taxa de conversão</li>
        </ul>
      </div>
    </Card>
  );
};
'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

interface GeographicData {
  region: string;
  users: number;
  revenue: number;
  conversions: number;
  growth: number;
}

interface GeographicDistributionProps {
  /** Dados geográficos para exibir */
  data?: GeographicData[];
  /** Tipo de visualização */
  viewType?: 'states' | 'cities' | 'regions';
  /** Métrica principal a destacar */
  metric?: 'users' | 'revenue' | 'conversions';
  /** Classe CSS adicional */
  className?: string;
}

// Dados mock para demonstração
const mockStatesData: GeographicData[] = [
  { region: 'São Paulo', users: 450000, revenue: 2800000, conversions: 12500, growth: 15.3 },
  { region: 'Rio de Janeiro', users: 280000, revenue: 1650000, conversions: 8200, growth: 8.7 },
  { region: 'Minas Gerais', users: 220000, revenue: 1200000, conversions: 6800, growth: 12.1 },
  { region: 'Rio Grande do Sul', users: 180000, revenue: 980000, conversions: 5400, growth: 6.9 },
  { region: 'Paraná', users: 160000, revenue: 850000, conversions: 4900, growth: 9.2 },
  { region: 'Bahia', users: 140000, revenue: 720000, conversions: 4100, growth: 11.8 },
  { region: 'Santa Catarina', users: 120000, revenue: 680000, conversions: 3800, growth: 14.5 },
  { region: 'Goiás', users: 95000, revenue: 520000, conversions: 2900, growth: 7.3 },
  { region: 'Pernambuco', users: 85000, revenue: 450000, conversions: 2600, growth: 5.8 },
  { region: 'Ceará', users: 75000, revenue: 380000, conversions: 2200, growth: 8.1 },
];

const mockCitiesData: GeographicData[] = [
  { region: 'São Paulo - SP', users: 180000, revenue: 1200000, conversions: 5200, growth: 12.3 },
  { region: 'Rio de Janeiro - RJ', users: 120000, revenue: 850000, conversions: 3800, growth: 9.1 },
  { region: 'Belo Horizonte - MG', users: 95000, revenue: 620000, conversions: 2900, growth: 11.7 },
  { region: 'Brasília - DF', users: 85000, revenue: 580000, conversions: 2600, growth: 8.9 },
  { region: 'Curitiba - PR', users: 75000, revenue: 480000, conversions: 2300, growth: 10.2 },
  { region: 'Porto Alegre - RS', users: 68000, revenue: 420000, conversions: 2100, growth: 7.5 },
  { region: 'Salvador - BA', users: 62000, revenue: 380000, conversions: 1900, growth: 13.4 },
  { region: 'Fortaleza - CE', users: 55000, revenue: 320000, conversions: 1700, growth: 6.8 },
];

/**
 * Componente de Distribuição Geográfica
 * 
 * Exibe dados de performance por localização geográfica
 */
export function GeographicDistribution({ 
  data,
  viewType = 'states',
  metric = 'users',
  className 
}: GeographicDistributionProps) {
  const [selectedMetric, setSelectedMetric] = useState(metric);
  
  // Seleciona os dados baseado no tipo de visualização
  const displayData = data || (viewType === 'cities' ? mockCitiesData : mockStatesData);

  /**
   * Formata valores baseado na métrica
   */
  const formatValue = (value: number, metricType: string): string => {
    switch (metricType) {
      case 'users':
        return value.toLocaleString('pt-BR');
      case 'revenue':
        return `R$ ${(value / 1000).toLocaleString('pt-BR')}k`;
      case 'conversions':
        return value.toLocaleString('pt-BR');
      default:
        return value.toString();
    }
  };

  /**
   * Obtém o valor da métrica selecionada
   */
  const getMetricValue = (item: GeographicData): number => {
    switch (selectedMetric) {
      case 'revenue':
        return item.revenue;
      case 'conversions':
        return item.conversions;
      default:
        return item.users;
    }
  };

  /**
   * Calcula a largura da barra baseada no valor máximo
   */
  const getBarWidth = (value: number): number => {
    const maxValue = Math.max(...displayData.map(getMetricValue));
    return (value / maxValue) * 100;
  };

  /**
   * Obtém a cor da barra baseada na performance
   */
  const getBarColor = (value: number): string => {
    const maxValue = Math.max(...displayData.map(getMetricValue));
    const percentage = (value / maxValue) * 100;
    
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header com controles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="text-sm font-medium text-gray-700">
          Distribuição por {viewType === 'cities' ? 'Cidades' : 'Estados'}
        </h4>
        
        <div className="flex gap-2">
          <Select 
            value={selectedMetric}
            onValueChange={(value) => setSelectedMetric(value as any)}
          >
            <SelectTrigger className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Usuários</SelectItem>
              <SelectItem value="revenue">Receita</SelectItem>
              <SelectItem value="conversions">Conversões</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mapa simulado com barras */}
      <div className="space-y-2">
        {displayData.slice(0, 8).map((item, index) => {
          const metricValue = getMetricValue(item);
          const barWidth = getBarWidth(metricValue);
          const barColor = getBarColor(metricValue);
          
          return (
            <div key={item.region} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {item.region}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">
                    {formatValue(metricValue, selectedMetric)}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.growth > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={cn(
                      'text-xs font-medium',
                      item.growth > 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Barra de progresso */}
              <div className="w-full bg-gray-200 rounded-full h-2 group-hover:h-3 transition-all duration-200">
                <div 
                  className={cn(
                    'h-full rounded-full transition-all duration-300',
                    barColor
                  )}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              
              {/* Tooltip detalhado no hover */}
              <div className="hidden group-hover:block absolute z-10 bg-gray-900 text-white p-2 rounded shadow-lg text-xs mt-1">
                <div className="font-medium">{item.region}</div>
                <div>Usuários: {formatValue(item.users, 'users')}</div>
                <div>Receita: {formatValue(item.revenue, 'revenue')}</div>
                <div>Conversões: {formatValue(item.conversions, 'conversions')}</div>
                <div className={cn(
                  'font-medium',
                  item.growth > 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  Crescimento: {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo estatístico */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {displayData.reduce((sum, item) => sum + item.users, 0).toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-gray-600">Total de Usuários</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            R$ {(displayData.reduce((sum, item) => sum + item.revenue, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-600">Receita Total</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {displayData.reduce((sum, item) => sum + item.conversions, 0).toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-gray-600">Total de Conversões</div>
        </div>
      </div>
    </div>
  );
}
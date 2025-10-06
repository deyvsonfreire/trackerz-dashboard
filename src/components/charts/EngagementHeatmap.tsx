'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { Clock, TrendingUp, Filter, Info } from 'lucide-react';

interface HeatmapData {
  day: string;
  hour: number;
  value: number;
  sessions: number;
  conversions: number;
}

interface EngagementHeatmapProps {
  metric?: 'engagement' | 'sessions' | 'conversions' | 'revenue';
  timeRange?: string;
  className?: string;
}

/**
 * Componente de Heatmap de Engajamento por Horário
 * Visualiza padrões de atividade dos usuários ao longo da semana
 */
export const EngagementHeatmap: React.FC<EngagementHeatmapProps> = ({
  metric = 'engagement',
  timeRange = '7d',
  className = ''
}) => {
  const [selectedCell, setSelectedCell] = useState<HeatmapData | null>(null);
  const [hoveredCell, setHoveredCell] = useState<HeatmapData | null>(null);

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Dados mock do heatmap
  const generateHeatmapData = (): HeatmapData[] => {
    const data: HeatmapData[] = [];
    
    days.forEach((day, dayIndex) => {
      hours.forEach(hour => {
        // Simular padrões realistas de engajamento
        let baseValue = 0.3;
        
        // Horários comerciais têm mais atividade
        if (hour >= 9 && hour <= 18) {
          baseValue = 0.7;
        }
        
        // Horários de pico (almoço e final do dia)
        if (hour === 12 || hour === 18) {
          baseValue = 0.9;
        }
        
        // Fins de semana têm padrão diferente
        if (dayIndex === 0 || dayIndex === 6) {
          if (hour >= 10 && hour <= 16) {
            baseValue = 0.6;
          } else {
            baseValue = 0.2;
          }
        }
        
        // Adicionar variação aleatória
        const variation = (Math.random() - 0.5) * 0.3;
        const value = Math.max(0, Math.min(1, baseValue + variation));
        
        data.push({
          day,
          hour,
          value,
          sessions: Math.floor(value * 1000 + Math.random() * 200),
          conversions: Math.floor(value * 50 + Math.random() * 20)
        });
      });
    });
    
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getColorIntensity = (value: number): string => {
    const intensity = Math.floor(value * 9);
    const colors = [
      '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
      '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'
    ];
    return colors[intensity] || colors[0];
  };

  const getMetricValue = (data: HeatmapData): number => {
    switch (metric) {
      case 'sessions':
        return data.sessions;
      case 'conversions':
        return data.conversions;
      case 'revenue':
        return data.value * 5000;
      default:
        return data.value;
    }
  };

  const formatMetricValue = (data: HeatmapData): string => {
    const value = getMetricValue(data);
    
    switch (metric) {
      case 'sessions':
        return value.toLocaleString();
      case 'conversions':
        return value.toLocaleString();
      case 'revenue':
        return `R$ ${(value / 1000).toFixed(1)}K`;
      default:
        return `${(value * 100).toFixed(1)}%`;
    }
  };

  const getMetricLabel = (): string => {
    switch (metric) {
      case 'sessions':
        return 'Sessões';
      case 'conversions':
        return 'Conversões';
      case 'revenue':
        return 'Receita';
      default:
        return 'Engajamento';
    }
  };

  const getCellData = (day: string, hour: number): HeatmapData | undefined => {
    return heatmapData.find(d => d.day === day && d.hour === hour);
  };

  const getHourLabel = (hour: number): string => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Calcular estatísticas
  const maxValue = Math.max(...heatmapData.map(d => getMetricValue(d)));
  const avgValue = heatmapData.reduce((sum, d) => sum + getMetricValue(d), 0) / heatmapData.length;
  const peakHour = heatmapData.reduce((peak, current) => 
    getMetricValue(current) > getMetricValue(peak) ? current : peak
  );

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Heatmap de {getMetricLabel()}
          </h3>
          <p className="text-sm text-gray-600">
            Padrões de atividade por dia da semana e horário
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={metric}
            onChange={(e) => setSelectedCell(null)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="engagement">Engajamento</option>
            <option value="sessions">Sessões</option>
            <option value="conversions">Conversões</option>
            <option value="revenue">Receita</option>
          </select>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-25 gap-1 text-xs">
          {/* Header com horários */}
          <div></div>
          {hours.map(hour => (
            <div key={hour} className="text-center text-gray-500 py-1">
              {hour % 6 === 0 ? getHourLabel(hour) : ''}
            </div>
          ))}
          
          {/* Linhas dos dias */}
          {days.map(day => (
            <React.Fragment key={day}>
              <div className="text-right text-gray-700 font-medium py-2 pr-2">
                {day}
              </div>
              {hours.map(hour => {
                const cellData = getCellData(day, hour);
                if (!cellData) return null;
                
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="aspect-square rounded cursor-pointer transition-all hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50"
                    style={{ 
                      backgroundColor: getColorIntensity(cellData.value),
                      transform: hoveredCell === cellData ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onClick={() => setSelectedCell(cellData)}
                    onMouseEnter={() => setHoveredCell(cellData)}
                    onMouseLeave={() => setHoveredCell(null)}
                    title={`${day} ${getHourLabel(hour)}: ${formatMetricValue(cellData)}`}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Baixo</span>
          <div className="flex gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColorIntensity(i / 9) }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">Alto</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Pico: {getHourLabel(peakHour.hour)}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>Média: {formatMetricValue({ ...peakHour, value: avgValue / maxValue })}</span>
          </div>
        </div>
      </div>

      {/* Detalhes da célula selecionada */}
      {selectedCell && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">
              {selectedCell.day}, {getHourLabel(selectedCell.hour)}
            </h4>
            <button
              onClick={() => setSelectedCell(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Engajamento</div>
              <div className="text-lg font-semibold text-blue-600">
                {(selectedCell.value * 100).toFixed(1)}%
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Sessões</div>
              <div className="text-lg font-semibold text-gray-900">
                {selectedCell.sessions.toLocaleString()}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Conversões</div>
              <div className="text-lg font-semibold text-green-600">
                {selectedCell.conversions}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Taxa de Conversão</div>
              <div className="text-lg font-semibold text-purple-600">
                {((selectedCell.conversions / selectedCell.sessions) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h5 className="font-medium text-gray-900 mb-1">Insights</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Maior atividade entre 9h-18h nos dias úteis</li>
              <li>• Pico de engajamento às {getHourLabel(peakHour.hour)} ({peakHour.day})</li>
              <li>• Fins de semana mostram padrão de atividade mais tardio</li>
              <li>• Horário de almoço (12h) apresenta alta conversão</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
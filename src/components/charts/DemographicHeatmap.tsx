'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';

interface DemographicData {
  ageGroup: string;
  male: number;
  female: number;
  other: number;
}

interface DemographicHeatmapProps {
  /** Dados demográficos para exibir no heatmap */
  data?: DemographicData[];
  /** Métrica a ser exibida (CTR, conversions, etc.) */
  metric?: 'ctr' | 'conversions' | 'impressions' | 'revenue';
  /** Classe CSS adicional */
  className?: string;
}

// Dados mock para demonstração
const mockData: DemographicData[] = [
  { ageGroup: '18-24', male: 4.2, female: 5.8, other: 3.1 },
  { ageGroup: '25-34', male: 6.5, female: 7.2, other: 4.8 },
  { ageGroup: '35-44', male: 5.1, female: 6.9, other: 4.2 },
  { ageGroup: '45-54', male: 3.8, female: 4.5, other: 3.0 },
  { ageGroup: '55-64', male: 2.9, female: 3.2, other: 2.1 },
  { ageGroup: '65+', male: 1.8, female: 2.1, other: 1.5 },
];

const metricLabels = {
  ctr: 'CTR (%)',
  conversions: 'Conversões',
  impressions: 'Impressões (K)',
  revenue: 'Receita (R$)'
};

/**
 * Componente de Heatmap Demográfico
 * 
 * Exibe um heatmap interativo mostrando performance por idade e gênero
 */
export function DemographicHeatmap({ 
  data = mockData, 
  metric = 'ctr',
  className 
}: DemographicHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ age: string; gender: string; value: number } | null>(null);

  // Encontra os valores min e max para normalização das cores
  const allValues = data.flatMap(d => [d.male, d.female, d.other]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  /**
   * Calcula a intensidade da cor baseada no valor
   */
  const getColorIntensity = (value: number): string => {
    const normalized = (value - minValue) / (maxValue - minValue);
    
    if (normalized < 0.2) return 'bg-blue-100 text-blue-800';
    if (normalized < 0.4) return 'bg-blue-200 text-blue-900';
    if (normalized < 0.6) return 'bg-blue-300 text-blue-900';
    if (normalized < 0.8) return 'bg-blue-400 text-white';
    return 'bg-blue-500 text-white';
  };

  /**
   * Formata o valor baseado na métrica
   */
  const formatValue = (value: number): string => {
    switch (metric) {
      case 'ctr':
        return `${value.toFixed(1)}%`;
      case 'conversions':
        return value.toLocaleString('pt-BR');
      case 'impressions':
        return `${(value * 1000).toLocaleString('pt-BR')}`;
      case 'revenue':
        return `R$ ${(value * 1000).toLocaleString('pt-BR')}`;
      default:
        return value.toString();
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Header */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Performance por Idade e Gênero - {metricLabels[metric]}
        </h4>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-1 mb-2">
            <div className="text-xs font-medium text-gray-600 p-2"></div>
            <div className="text-xs font-medium text-gray-600 p-2 text-center">Masculino</div>
            <div className="text-xs font-medium text-gray-600 p-2 text-center">Feminino</div>
            <div className="text-xs font-medium text-gray-600 p-2 text-center">Outros</div>
          </div>

          {/* Data Rows */}
          {data.map((row) => (
            <div key={row.ageGroup} className="grid grid-cols-4 gap-1 mb-1">
              {/* Age Group Label */}
              <div className="text-xs font-medium text-gray-600 p-2 flex items-center">
                {row.ageGroup}
              </div>

              {/* Male Cell */}
              <div
                className={cn(
                  'p-2 rounded text-xs font-medium text-center cursor-pointer transition-all duration-200 hover:scale-105',
                  getColorIntensity(row.male)
                )}
                onMouseEnter={() => setHoveredCell({ age: row.ageGroup, gender: 'Masculino', value: row.male })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {formatValue(row.male)}
              </div>

              {/* Female Cell */}
              <div
                className={cn(
                  'p-2 rounded text-xs font-medium text-center cursor-pointer transition-all duration-200 hover:scale-105',
                  getColorIntensity(row.female)
                )}
                onMouseEnter={() => setHoveredCell({ age: row.ageGroup, gender: 'Feminino', value: row.female })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {formatValue(row.female)}
              </div>

              {/* Other Cell */}
              <div
                className={cn(
                  'p-2 rounded text-xs font-medium text-center cursor-pointer transition-all duration-200 hover:scale-105',
                  getColorIntensity(row.other)
                )}
                onMouseEnter={() => setHoveredCell({ age: row.ageGroup, gender: 'Outros', value: row.other })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {formatValue(row.other)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span>Menor</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
          </div>
          <span>Maior</span>
        </div>
        <div className="text-right">
          <div>Min: {formatValue(minValue)}</div>
          <div>Max: {formatValue(maxValue)}</div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div className="absolute top-0 right-0 bg-gray-900 text-white p-2 rounded shadow-lg text-xs z-10">
          <div className="font-medium">{hoveredCell.age} - {hoveredCell.gender}</div>
          <div>{metricLabels[metric]}: {formatValue(hoveredCell.value)}</div>
        </div>
      )}
    </div>
  );
}
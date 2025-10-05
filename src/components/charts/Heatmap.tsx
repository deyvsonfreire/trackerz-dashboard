'use client';

import React from 'react';
import { Card } from '@/components/ui';

/**
 * Props para o componente Heatmap
 */
interface HeatmapProps {
  /** Dados da matriz */
  data: Array<{
    x: string | number;
    y: string | number;
    value: number;
    label?: string;
    metadata?: Record<string, string | number | boolean>;
  }>;
  /** Título do heatmap */
  title: string;
  /** Labels do eixo X */
  xAxisLabel?: string;
  /** Labels do eixo Y */
  yAxisLabel?: string;
  /** Esquema de cores */
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'custom';
  /** Cores customizadas [min, mid, max] */
  customColors?: [string, string, string];
  /** Tamanho das células */
  cellSize?: number;
  /** Mostrar valores nas células */
  showValues?: boolean;
  /** Formato dos valores */
  valueFormatter?: (value: number) => string;
  /** Classe CSS adicional */
  className?: string;
  /** Callback ao clicar em uma célula */
  onCellClick?: (data: { x: string | number; y: string | number; value: number; label?: string; metadata?: Record<string, string | number | boolean> }) => void;
}

/**
 * Componente Heatmap para visualização de dados em matriz
 * Ideal para análise de correlações, padrões temporais e distribuições
 */
export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  colorScheme = 'blue',
  customColors,
  cellSize = 40,
  showValues = true,
  valueFormatter = (value) => value.toString(),
  className = '',
  onCellClick
}) => {
  // Esquemas de cores predefinidos
  const colorSchemes = {
    blue: ['#EFF6FF', '#3B82F6', '#1E40AF'],
    green: ['#F0FDF4', '#10B981', '#047857'],
    red: ['#FEF2F2', '#EF4444', '#DC2626'],
    purple: ['#FAF5FF', '#8B5CF6', '#7C3AED'],
    orange: ['#FFF7ED', '#F97316', '#EA580C'],
    custom: customColors || ['#F3F4F6', '#6B7280', '#374151']
  };

  const colors = colorSchemes[colorScheme];

  // Extrai valores únicos para os eixos
  const xValues = React.useMemo(() => {
    const values = [...new Set(data.map(d => d.x))];
    return values.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      return String(a).localeCompare(String(b));
    });
  }, [data]);

  const yValues = React.useMemo(() => {
    const values = [...new Set(data.map(d => d.y))];
    return values.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      return String(a).localeCompare(String(b));
    });
  }, [data]);

  // Calcula min e max para normalização
  const { minValue, maxValue } = React.useMemo(() => {
    const values = data.map(d => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values)
    };
  }, [data]);

  // Cria mapa de dados para acesso rápido
  const dataMap = React.useMemo(() => {
    const map = new Map();
    data.forEach(item => {
      map.set(`${item.x}-${item.y}`, item);
    });
    return map;
  }, [data]);

  // Função para obter cor baseada no valor
  const getColor = (value: number) => {
    if (maxValue === minValue) return colors[0];
    
    const normalized = (value - minValue) / (maxValue - minValue);
    
    if (normalized <= 0.5) {
      // Interpola entre cor mínima e média
      const ratio = normalized * 2;
      return interpolateColor(colors[0], colors[1], ratio);
    } else {
      // Interpola entre cor média e máxima
      const ratio = (normalized - 0.5) * 2;
      return interpolateColor(colors[1], colors[2], ratio);
    }
  };

  // Função para interpolar cores
  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Função para determinar cor do texto baseada no fundo
  const getTextColor = (backgroundColor: string) => {
    // Converte RGB para luminância
    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb) return '#000000';
    
    const [r, g, b] = rgb.map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-4 text-sm text-gray-500 mt-1">
          {xAxisLabel && <span>X: {xAxisLabel}</span>}
          {yAxisLabel && <span>Y: {yAxisLabel}</span>}
        </div>
      </div>

      <div className="overflow-auto">
        <div className="inline-block min-w-full">
          {/* Cabeçalho X */}
          <div className="flex">
            <div style={{ width: cellSize, height: cellSize }} /> {/* Espaço vazio */}
            {xValues.map(xValue => (
              <div
                key={xValue}
                className="flex items-center justify-center text-xs font-medium text-gray-700 border-b border-gray-200"
                style={{ width: cellSize, height: cellSize }}
              >
                <span className="transform -rotate-45 origin-center">
                  {String(xValue)}
                </span>
              </div>
            ))}
          </div>

          {/* Linhas do heatmap */}
          {yValues.map(yValue => (
            <div key={yValue} className="flex">
              {/* Label Y */}
              <div
                className="flex items-center justify-center text-xs font-medium text-gray-700 border-r border-gray-200"
                style={{ width: cellSize, height: cellSize }}
              >
                {String(yValue)}
              </div>

              {/* Células */}
              {xValues.map(xValue => {
                const cellData = dataMap.get(`${xValue}-${yValue}`);
                const value = cellData?.value || 0;
                const backgroundColor = getColor(value);
                const textColor = getTextColor(backgroundColor);

                return (
                  <div
                    key={`${xValue}-${yValue}`}
                    className={`flex items-center justify-center text-xs border border-gray-200 transition-all duration-200 ${
                      onCellClick ? 'cursor-pointer hover:scale-105 hover:z-10 hover:shadow-lg' : ''
                    }`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor,
                      color: textColor
                    }}
                    onClick={() => onCellClick && cellData && onCellClick(cellData)}
                    title={cellData ? 
                      `${xAxisLabel || 'X'}: ${xValue}\n${yAxisLabel || 'Y'}: ${yValue}\nValor: ${valueFormatter(value)}` : 
                      'Sem dados'
                    }
                  >
                    {cellData && showValues && (
                      <span className="font-medium">
                        {valueFormatter(value)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legenda de cores */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Intensidade:</span>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">{valueFormatter(minValue)}</span>
            <div className="flex">
              {Array.from({ length: 20 }, (_, i) => {
                const ratio = i / 19;
                const color = ratio <= 0.5 
                  ? interpolateColor(colors[0], colors[1], ratio * 2)
                  : interpolateColor(colors[1], colors[2], (ratio - 0.5) * 2);
                
                return (
                  <div
                    key={i}
                    className="w-3 h-4"
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </div>
            <span className="text-xs text-gray-500 ml-2">{valueFormatter(maxValue)}</span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="text-sm text-gray-600">
          {data.length} células • Média: {valueFormatter(data.reduce((sum, d) => sum + d.value, 0) / data.length)}
        </div>
      </div>

      {/* Insights automáticos */}
      {data.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">📊 Análise</h4>
          <div className="text-sm text-gray-700 space-y-1">
            {(() => {
              const maxData = data.reduce((max, current) => 
                current.value > max.value ? current : max
              );
              const minData = data.reduce((min, current) => 
                current.value < min.value ? current : min
              );
              
              return (
                <>
                  <p>• Maior valor: {valueFormatter(maxData.value)} em ({maxData.x}, {maxData.y})</p>
                  <p>• Menor valor: {valueFormatter(minData.value)} em ({minData.x}, {minData.y})</p>
                  <p>• Variação: {valueFormatter(maxValue - minValue)} ({((maxValue - minValue) / minValue * 100).toFixed(1)}%)</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </Card>
  );
};

export default Heatmap;
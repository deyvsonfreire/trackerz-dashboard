'use client';

import React from 'react';
import { Card } from '@/components/ui';

/**
 * Props para o componente BoxPlot
 */
interface BoxPlotProps {
  /** Dados para análise estatística */
  data: Array<{
    category: string;
    values: number[];
    color?: string;
  }>;
  /** Título do gráfico */
  title: string;
  /** Label do eixo Y */
  yAxisLabel?: string;
  /** Altura do gráfico */
  height?: number;
  /** Largura do gráfico */
  width?: number;
  /** Mostrar outliers */
  showOutliers?: boolean;
  /** Mostrar valores médios */
  showMean?: boolean;
  /** Formato dos valores */
  valueFormatter?: (value: number) => string;
  /** Classe CSS adicional */
  className?: string;
  /** Orientação do gráfico */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Interface para estatísticas calculadas
 */
interface BoxStats {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  mean: number;
  outliers: number[];
  iqr: number;
}

/**
 * Componente BoxPlot para análise estatística de distribuição
 * Ideal para identificar outliers, quartis e distribuição de dados
 */
export const BoxPlot: React.FC<BoxPlotProps> = ({
  data,
  title,
  yAxisLabel,
  height = 400,
  width = 600,
  showOutliers = true,
  showMean = true,
  valueFormatter = (value) => value.toFixed(2),
  className = '',
  orientation = 'vertical'
}) => {
  // Cores padrão
  const defaultColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Calcula estatísticas para cada categoria
  const boxStats = React.useMemo(() => {
    return data.map((item, index) => {
      const values = [...item.values].sort((a, b) => a - b);
      const n = values.length;
      
      if (n === 0) {
        return {
          category: item.category,
          color: item.color || defaultColors[index % defaultColors.length],
          stats: {
            min: 0, q1: 0, median: 0, q3: 0, max: 0, mean: 0, outliers: [], iqr: 0
          }
        };
      }
      
      // Quartis
      const q1Index = Math.floor(n * 0.25);
      const medianIndex = Math.floor(n * 0.5);
      const q3Index = Math.floor(n * 0.75);
      
      const q1 = values[q1Index];
      const median = n % 2 === 0 
        ? (values[medianIndex - 1] + values[medianIndex]) / 2 
        : values[medianIndex];
      const q3 = values[q3Index];
      
      const iqr = q3 - q1;
      const lowerFence = q1 - 1.5 * iqr;
      const upperFence = q3 + 1.5 * iqr;
      
      // Outliers
      const outliers = values.filter(v => v < lowerFence || v > upperFence);
      
      // Min e Max (excluindo outliers)
      const filteredValues = values.filter(v => v >= lowerFence && v <= upperFence);
      const min = filteredValues.length > 0 ? Math.min(...filteredValues) : q1;
      const max = filteredValues.length > 0 ? Math.max(...filteredValues) : q3;
      
      // Média
      const mean = values.reduce((sum, v) => sum + v, 0) / n;
      
      const stats: BoxStats = {
        min, q1, median, q3, max, mean, outliers, iqr
      };
      
      return {
        category: item.category,
        color: item.color || defaultColors[index % defaultColors.length],
        stats
      };
    });
  }, [data, defaultColors]);

  // Calcula escala
  const { minValue, maxValue } = React.useMemo(() => {
    const allValues = data.flatMap(item => item.values);
    return {
      minValue: Math.min(...allValues),
      maxValue: Math.max(...allValues)
    };
  }, [data]);

  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  // Função para converter valor para posição Y
  const valueToY = (value: number) => {
    return padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
  };

  // Largura de cada box
  const boxWidth = chartWidth / boxStats.length * 0.6;
  const boxSpacing = chartWidth / boxStats.length;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Análise estatística de distribuição por categoria
        </p>
      </div>

      <div className="overflow-auto">
        <svg width={width} height={height} className="border border-gray-200 rounded-lg">
          {/* Eixo Y */}
          <g>
            {/* Linha do eixo */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={height - padding}
              stroke="#6B7280"
              strokeWidth="1"
            />
            
            {/* Labels do eixo Y */}
            {Array.from({ length: 6 }, (_, i) => {
              const value = minValue + (maxValue - minValue) * (i / 5);
              const y = valueToY(value);
              
              return (
                <g key={i}>
                  <line
                    x1={padding - 5}
                    y1={y}
                    x2={padding}
                    y2={y}
                    stroke="#6B7280"
                    strokeWidth="1"
                  />
                  <text
                    x={padding - 10}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="text-xs fill-gray-600"
                  >
                    {valueFormatter(value)}
                  </text>
                  
                  {/* Grid lines */}
                  <line
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              );
            })}
            
            {/* Label do eixo Y */}
            {yAxisLabel && (
              <text
                x={20}
                y={height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm fill-gray-700"
                transform={`rotate(-90, 20, ${height / 2})`}
              >
                {yAxisLabel}
              </text>
            )}
          </g>

          {/* Box plots */}
          {boxStats.map((item, index) => {
            const centerX = padding + boxSpacing * index + boxSpacing / 2;
            const leftX = centerX - boxWidth / 2;
            const rightX = centerX + boxWidth / 2;
            
            const { stats } = item;
            
            return (
              <g key={item.category}>
                {/* Whiskers */}
                <line
                  x1={centerX}
                  y1={valueToY(stats.min)}
                  x2={centerX}
                  y2={valueToY(stats.q1)}
                  stroke={item.color}
                  strokeWidth="2"
                />
                <line
                  x1={centerX}
                  y1={valueToY(stats.q3)}
                  x2={centerX}
                  y2={valueToY(stats.max)}
                  stroke={item.color}
                  strokeWidth="2"
                />
                
                {/* Whisker caps */}
                <line
                  x1={leftX + boxWidth * 0.2}
                  y1={valueToY(stats.min)}
                  x2={rightX - boxWidth * 0.2}
                  y2={valueToY(stats.min)}
                  stroke={item.color}
                  strokeWidth="2"
                />
                <line
                  x1={leftX + boxWidth * 0.2}
                  y1={valueToY(stats.max)}
                  x2={rightX - boxWidth * 0.2}
                  y2={valueToY(stats.max)}
                  stroke={item.color}
                  strokeWidth="2"
                />
                
                {/* Box */}
                <rect
                  x={leftX}
                  y={valueToY(stats.q3)}
                  width={boxWidth}
                  height={valueToY(stats.q1) - valueToY(stats.q3)}
                  fill={item.color}
                  fillOpacity="0.3"
                  stroke={item.color}
                  strokeWidth="2"
                />
                
                {/* Median line */}
                <line
                  x1={leftX}
                  y1={valueToY(stats.median)}
                  x2={rightX}
                  y2={valueToY(stats.median)}
                  stroke={item.color}
                  strokeWidth="3"
                />
                
                {/* Mean point */}
                {showMean && (
                  <circle
                    cx={centerX}
                    cy={valueToY(stats.mean)}
                    r="4"
                    fill="white"
                    stroke={item.color}
                    strokeWidth="2"
                  />
                )}
                
                {/* Outliers */}
                {showOutliers && stats.outliers.map((outlier, outlierIndex) => (
                  <circle
                    key={outlierIndex}
                    cx={centerX + (Math.random() - 0.5) * boxWidth * 0.3}
                    cy={valueToY(outlier)}
                    r="3"
                    fill={item.color}
                    fillOpacity="0.7"
                  />
                ))}
                
                {/* Category label */}
                <text
                  x={centerX}
                  y={height - padding + 20}
                  textAnchor="middle"
                  className="text-sm fill-gray-700"
                >
                  {item.category}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Estatísticas detalhadas */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 font-semibold text-gray-900">Categoria</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Min</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Q1</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Mediana</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Q3</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Max</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Média</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-900">Outliers</th>
            </tr>
          </thead>
          <tbody>
            {boxStats.map((item, index) => (
              <tr key={item.category} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.category}
                  </div>
                </td>
                <td className="text-right py-2 px-3">{valueFormatter(item.stats.min)}</td>
                <td className="text-right py-2 px-3">{valueFormatter(item.stats.q1)}</td>
                <td className="text-right py-2 px-3 font-semibold">{valueFormatter(item.stats.median)}</td>
                <td className="text-right py-2 px-3">{valueFormatter(item.stats.q3)}</td>
                <td className="text-right py-2 px-3">{valueFormatter(item.stats.max)}</td>
                <td className="text-right py-2 px-3">{valueFormatter(item.stats.mean)}</td>
                <td className="text-right py-2 px-3">{item.stats.outliers.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      {boxStats.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <h4 className="text-sm font-semibold text-green-900 mb-2">📈 Insights Estatísticos</h4>
          <div className="text-sm text-green-800 space-y-1">
            {(() => {
              const mostVariableCategory = boxStats.reduce((max, current) => 
                current.stats.iqr > max.stats.iqr ? current : max
              );
              
              const mostOutliers = boxStats.reduce((max, current) => 
                current.stats.outliers.length > max.stats.outliers.length ? current : max
              );
              
              return (
                <>
                  <p>• Maior variabilidade: {mostVariableCategory.category} (IQR: {valueFormatter(mostVariableCategory.stats.iqr)})</p>
                  <p>• Mais outliers: {mostOutliers.category} ({mostOutliers.stats.outliers.length} valores atípicos)</p>
                  <p>• Amplitude total: {valueFormatter(maxValue - minValue)}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </Card>
  );
};

export default BoxPlot;
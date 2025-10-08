'use client';

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui';

/**
 * Props para o componente ScatterPlot
 */
interface ScatterPlotProps {
  /** Dados para o gráfico de dispersão */
  data: Array<{
    x: number;
    y: number;
    name?: string;
    category?: string;
    [key: string]: unknown;
  }>;
  /** Título do gráfico */
  title: string;
  /** Label do eixo X */
  xAxisLabel: string;
  /** Label do eixo Y */
  yAxisLabel: string;
  /** Altura do gráfico */
  height?: number;
  /** Cores personalizadas para diferentes categorias */
  colors?: string[];
  /** Mostrar linha de tendência */
  showTrendLine?: boolean;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente ScatterPlot para análise de correlação entre métricas
 * Útil para identificar padrões e relações entre diferentes indicadores
 */
export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  height = 400,
  colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
  showTrendLine = false,
  className = ''
}) => {
  // Agrupa dados por categoria se existir
  const groupedData = React.useMemo(() => {
    if (!data.length || !data[0].category) {
      return [{ name: 'default', data }];
    }

    const groups = data.reduce((acc, item) => {
      const category = item.category || 'default';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, typeof data>);

    return Object.entries(groups).map(([name, groupData]) => ({
      name,
      data: groupData
    }));
  }, [data]);

  // Calcula linha de tendência usando regressão linear simples
  const trendLineData = React.useMemo(() => {
    if (!showTrendLine || !data.length) return [];

    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...data.map(p => p.x));
    const maxX = Math.max(...data.map(p => p.x));

    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept }
    ];
  }, [data, showTrendLine]);

  // Tooltip customizado removido para evitar problemas de tipagem

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Análise de correlação entre {xAxisLabel.toLowerCase()} e {yAxisLabel.toLowerCase()}
        </p>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name={xAxisLabel}
              tick={{ fontSize: 12 }}
              label={{ value: xAxisLabel, position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name={yAxisLabel}
              tick={{ fontSize: 12 }}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            
            {groupedData.map((group, index) => (
              <Scatter
                key={group.name}
                name={group.name}
                data={group.data}
                fill={colors[index % colors.length]}
                fillOpacity={0.7}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
              />
            ))}

            {/* Linha de tendência */}
            {showTrendLine && trendLineData.length > 0 && (
              <Scatter
                data={trendLineData}
                line={{ stroke: '#6B7280', strokeWidth: 2, strokeDasharray: '5 5' }}
                shape={<></>}
                name="Tendência"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda personalizada para categorias */}
      {groupedData.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {groupedData.map((group, index) => (
            <div key={group.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600 capitalize">{group.name}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ScatterPlot;
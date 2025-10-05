'use client';

import React, { useMemo } from 'react';

/**
 * Props para o componente MapChart
 */
export interface MapChartProps {
  /** Dados para exibir no mapa */
  data: MapDataPoint[];
  /** Largura do mapa */
  width?: number;
  /** Altura do mapa */
  height?: number;
  /** Tipo de mapa */
  mapType?: 'world' | 'brazil' | 'usa' | 'europe';
  /** Esquema de cores */
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  /** Mostrar legenda */
  showLegend?: boolean;
  /** Mostrar tooltip */
  showTooltip?: boolean;
  /** Título do mapa */
  title?: string;
  /** Callback quando uma região é clicada */
  onRegionClick?: (region: MapDataPoint) => void;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Interface para pontos de dados do mapa
 */
export interface MapDataPoint {
  /** Código da região (ISO, estado, etc.) */
  code: string;
  /** Nome da região */
  name: string;
  /** Valor numérico */
  value: number;
  /** Dados adicionais para tooltip */
  metadata?: Record<string, unknown>;
}

/**
 * Dados de exemplo para diferentes tipos de mapa
 */
const SAMPLE_DATA = {
  brazil: [
    { code: 'SP', name: 'São Paulo', value: 45000000 },
    { code: 'RJ', name: 'Rio de Janeiro', value: 17000000 },
    { code: 'MG', name: 'Minas Gerais', value: 21000000 },
    { code: 'RS', name: 'Rio Grande do Sul', value: 11000000 },
    { code: 'PR', name: 'Paraná', value: 11500000 },
  ],
  world: [
    { code: 'US', name: 'Estados Unidos', value: 330000000 },
    { code: 'BR', name: 'Brasil', value: 215000000 },
    { code: 'DE', name: 'Alemanha', value: 83000000 },
    { code: 'FR', name: 'França', value: 67000000 },
    { code: 'UK', name: 'Reino Unido', value: 67000000 },
  ],
};

/**
 * Componente MapChart para visualização de dados geográficos
 * 
 * @param props - Propriedades do componente
 * @returns Elemento JSX do mapa
 */
export const MapChart: React.FC<MapChartProps> = ({
  data,
  width = 800,
  height = 500,
  mapType = 'brazil',
  colorScheme = 'blue',
  showLegend = true,
  showTooltip = true,
  title,
  onRegionClick,
  className,
}) => {
  // Calcular valores mínimo e máximo para escala de cores
  const { minValue, maxValue } = useMemo(() => {
    const values = data.map(d => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    };
  }, [data]);

  // Função para obter cor baseada no valor
  const getColor = (value: number): string => {
    const intensity = (value - minValue) / (maxValue - minValue);
    
    const colorMaps = {
      blue: {
        light: `rgba(59, 130, 246, ${0.2 + intensity * 0.6})`,
        dark: `rgba(29, 78, 216, ${0.2 + intensity * 0.6})`,
      },
      green: {
        light: `rgba(34, 197, 94, ${0.2 + intensity * 0.6})`,
        dark: `rgba(21, 128, 61, ${0.2 + intensity * 0.6})`,
      },
      red: {
        light: `rgba(239, 68, 68, ${0.2 + intensity * 0.6})`,
        dark: `rgba(185, 28, 28, ${0.2 + intensity * 0.6})`,
      },
      purple: {
        light: `rgba(168, 85, 247, ${0.2 + intensity * 0.6})`,
        dark: `rgba(124, 58, 237, ${0.2 + intensity * 0.6})`,
      },
      orange: {
        light: `rgba(251, 146, 60, ${0.2 + intensity * 0.6})`,
        dark: `rgba(234, 88, 12, ${0.2 + intensity * 0.6})`,
      },
    };

    return colorMaps[colorScheme].light;
  };

  // Renderizar mapa simplificado do Brasil
  const renderBrazilMap = () => (
    <svg width={width} height={height} viewBox="0 0 800 600">
      {/* Contorno simplificado do Brasil */}
      <path
        d="M200,100 L600,100 L650,200 L600,500 L200,480 L150,300 Z"
        fill="rgba(156, 163, 175, 0.1)"
        stroke="rgba(156, 163, 175, 0.3)"
        strokeWidth="1"
      />
      
      {/* Regiões dos estados */}
      {data.map((region, index) => {
        const positions = {
          SP: { x: 450, y: 350, width: 80, height: 60 },
          RJ: { x: 500, y: 380, width: 50, height: 40 },
          MG: { x: 400, y: 300, width: 100, height: 80 },
          RS: { x: 350, y: 450, width: 70, height: 50 },
          PR: { x: 380, y: 400, width: 60, height: 50 },
        };

        const pos = positions[region.code as keyof typeof positions] || 
                   { x: 300 + index * 50, y: 250 + index * 30, width: 60, height: 40 };

        return (
          <g key={region.code}>
            <rect
              x={pos.x}
              y={pos.y}
              width={pos.width}
              height={pos.height}
              fill={getColor(region.value)}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="2"
              rx="4"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onRegionClick?.(region)}
            />
            <text
              x={pos.x + pos.width / 2}
              y={pos.y + pos.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-700 pointer-events-none"
            >
              {region.code}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // Renderizar mapa mundial simplificado
  const renderWorldMap = () => (
    <svg width={width} height={height} viewBox="0 0 800 400">
      {/* Continentes simplificados */}
      <rect x="50" y="150" width="200" height="100" fill="rgba(156, 163, 175, 0.1)" stroke="rgba(156, 163, 175, 0.3)" rx="10" />
      <rect x="300" y="120" width="150" height="120" fill="rgba(156, 163, 175, 0.1)" stroke="rgba(156, 163, 175, 0.3)" rx="10" />
      <rect x="500" y="100" width="180" height="140" fill="rgba(156, 163, 175, 0.1)" stroke="rgba(156, 163, 175, 0.3)" rx="10" />
      
      {/* Países */}
      {data.map((region, index) => {
        const positions = {
          US: { x: 100, y: 170, width: 100, height: 60 },
          BR: { x: 150, y: 250, width: 80, height: 70 },
          DE: { x: 350, y: 140, width: 50, height: 40 },
          FR: { x: 320, y: 160, width: 45, height: 40 },
          UK: { x: 330, y: 120, width: 40, height: 35 },
        };

        const pos = positions[region.code as keyof typeof positions] || 
                   { x: 400 + index * 60, y: 180 + index * 20, width: 50, height: 40 };

        return (
          <g key={region.code}>
            <rect
              x={pos.x}
              y={pos.y}
              width={pos.width}
              height={pos.height}
              fill={getColor(region.value)}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="2"
              rx="4"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onRegionClick?.(region)}
            />
            <text
              x={pos.x + pos.width / 2}
              y={pos.y + pos.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-700 pointer-events-none"
            >
              {region.code}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // Renderizar legenda
  const renderLegend = () => {
    if (!showLegend) return null;

    const steps = 5;
    const stepSize = (maxValue - minValue) / steps;

    return (
      <div className="flex items-center gap-4 mt-4">
        <span className="text-sm text-gray-600">Legenda:</span>
        <div className="flex items-center gap-2">
          {Array.from({ length: steps + 1 }, (_, i) => {
            const value = minValue + i * stepSize;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: getColor(value) }}
                />
                <span className="text-xs text-gray-500">
                  {value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg border p-6 ${className || ''}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div className="flex justify-center">
        {mapType === 'brazil' ? renderBrazilMap() : renderWorldMap()}
      </div>
      
      {renderLegend()}
      
      {/* Estatísticas resumidas */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {data.length}
          </div>
          <div className="text-sm text-gray-600">Regiões</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {maxValue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Máximo</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {data.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente de mapa interativo com dados de exemplo
 */
export const InteractiveMapChart: React.FC<Omit<MapChartProps, 'data'> & { 
  sampleData?: keyof typeof SAMPLE_DATA 
}> = ({ 
  sampleData = 'brazil', 
  ...props 
}) => {
  const data = SAMPLE_DATA[sampleData].map(item => ({
    ...item,
    metadata: { population: item.value },
  }));

  return (
    <MapChart
      {...props}
      data={data}
      onRegionClick={(region) => {
        console.log('Região clicada:', region);
        props.onRegionClick?.(region);
      }}
    />
  );
};

export default MapChart;
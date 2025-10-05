'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target } from 'lucide-react';

/**
 * Props para o componente GaugeChart
 */
interface GaugeChartProps {
  /** Valor atual */
  value: number;
  /** Valor mínimo */
  min?: number;
  /** Valor máximo */
  max?: number;
  /** Título do gauge */
  title: string;
  /** Unidade de medida */
  unit?: string;
  /** Zonas de performance com cores */
  zones?: Array<{
    min: number;
    max: number;
    color: string;
    label: string;
  }>;
  /** Tamanho do gauge */
  size?: number;
  /** Mostrar valor numérico */
  showValue?: boolean;
  /** Valor alvo/meta */
  target?: number;
  /** Classe CSS adicional */
  className?: string;
  /** Formato personalizado para o valor */
  valueFormatter?: (value: number) => string;
  /** Descrição adicional */
  description?: string;
}

/**
 * Componente GaugeChart para exibir métricas em formato de velocímetro
 * Ideal para KPIs, metas e indicadores de performance
 */
export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  title,
  unit = '%',
  zones,
  size = 200,
  showValue = true,
  target,
  className = '',
  valueFormatter,
  description
}) => {
  // Zonas padrão se não fornecidas
  const defaultZones = [
    { min: 0, max: 30, color: '#EF4444', label: 'Crítico' },
    { min: 30, max: 70, color: '#F59E0B', label: 'Atenção' },
    { min: 70, max: 100, color: '#10B981', label: 'Bom' }
  ];

  const gaugeZones = zones || defaultZones;

  // Calcula o ângulo baseado no valor
  const normalizedValue = Math.max(min, Math.min(max, value));
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180; // 180 graus para semicírculo

  // Determina a zona atual
  const currentZone = gaugeZones.find(zone => 
    normalizedValue >= zone.min && normalizedValue <= zone.max
  ) || gaugeZones[0];

  // Calcula posição da agulha
  const needleAngle = angle - 90; // Ajusta para começar do lado esquerdo
  const needleLength = size * 0.35;
  const centerX = size / 2;
  const centerY = size / 2;

  // Coordenadas da ponta da agulha
  const needleX = centerX + needleLength * Math.cos((needleAngle * Math.PI) / 180);
  const needleY = centerY + needleLength * Math.sin((needleAngle * Math.PI) / 180);

  // Gera o path do arco para cada zona
  const generateArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = startAngle * (Math.PI / 180);
    const end = endAngle * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(start);
    const y1 = centerY + radius * Math.sin(start);
    const x2 = centerX + radius * Math.cos(end);
    const y2 = centerY + radius * Math.sin(end);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Formata o valor
  const formatValue = (val: number) => {
    if (valueFormatter) return valueFormatter(val);
    return `${val.toFixed(1)}${unit}`;
  };

  // Determina o ícone de status
  const getStatusIcon = () => {
    if (target && value >= target) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (currentZone.label === 'Crítico') {
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
    if (currentZone.label === 'Atenção') {
      return <TrendingDown className="w-5 h-5 text-yellow-600" />;
    }
    return <TrendingUp className="w-5 h-5 text-green-600" />;
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        {description && (
          <p className="text-sm text-gray-500 mb-4">{description}</p>
        )}

        {/* SVG Gauge */}
        <div className="flex justify-center mb-4">
          <svg width={size} height={size * 0.6} className="overflow-visible">
            {/* Fundo do gauge */}
            <path
              d={generateArcPath(-90, 90, size * 0.4)}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Zonas coloridas */}
            {gaugeZones.map((zone, index) => {
              const zoneStartAngle = -90 + ((zone.min - min) / (max - min)) * 180;
              const zoneEndAngle = -90 + ((zone.max - min) / (max - min)) * 180;
              
              return (
                <path
                  key={index}
                  d={generateArcPath(zoneStartAngle, zoneEndAngle, size * 0.4)}
                  fill="none"
                  stroke={zone.color}
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity={0.3}
                />
              );
            })}

            {/* Arco do valor atual */}
            <path
              d={generateArcPath(-90, needleAngle + 90, size * 0.4)}
              fill="none"
              stroke={currentZone.color}
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Agulha */}
            <line
              x1={centerX}
              y1={centerY}
              x2={needleX}
              y2={needleY}
              stroke="#374151"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Centro da agulha */}
            <circle
              cx={centerX}
              cy={centerY}
              r="8"
              fill="#374151"
            />

            {/* Marcador de meta (se fornecido) */}
            {target && (
              <>
                {(() => {
                  const targetAngle = -90 + ((target - min) / (max - min)) * 180;
                  const targetX = centerX + (size * 0.45) * Math.cos((targetAngle * Math.PI) / 180);
                  const targetY = centerY + (size * 0.45) * Math.sin((targetAngle * Math.PI) / 180);
                  
                  return (
                    <g>
                      <line
                        x1={centerX + (size * 0.35) * Math.cos((targetAngle * Math.PI) / 180)}
                        y1={centerY + (size * 0.35) * Math.sin((targetAngle * Math.PI) / 180)}
                        x2={targetX}
                        y2={targetY}
                        stroke="#6366F1"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                      />
                      <Target 
                        x={targetX - 8} 
                        y={targetY - 8} 
                        width="16" 
                        height="16" 
                        className="text-indigo-600"
                      />
                    </g>
                  );
                })()}
              </>
            )}

            {/* Labels dos valores min e max */}
            <text
              x={centerX - size * 0.35}
              y={centerY + 20}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {min}{unit}
            </text>
            <text
              x={centerX + size * 0.35}
              y={centerY + 20}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {max}{unit}
            </text>
          </svg>
        </div>

        {/* Valor atual */}
        {showValue && (
          <div className="mb-4">
            <div className="text-3xl font-bold" style={{ color: currentZone.color }}>
              {formatValue(value)}
            </div>
            <div className="text-sm text-gray-500">
              Status: <span style={{ color: currentZone.color }}>{currentZone.label}</span>
            </div>
          </div>
        )}

        {/* Meta e progresso */}
        {target && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Meta:</span>
              <span className="font-semibold">{formatValue(target)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Progresso:</span>
              <span className={`font-semibold ${value >= target ? 'text-green-600' : 'text-gray-900'}`}>
                {((value / target) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {/* Legenda das zonas */}
        <div className="flex justify-center gap-4 text-xs">
          {gaugeZones.map((zone, index) => (
            <div key={index} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: zone.color }}
              />
              <span className="text-gray-600">{zone.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GaugeChart;
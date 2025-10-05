'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { TrendingDown, Users, Target, ShoppingCart, CreditCard } from 'lucide-react';

/**
 * Props para o componente FunnelChart
 */
interface FunnelChartProps {
  /** Dados do funil */
  data: Array<{
    stage: string;
    value: number;
    color?: string;
    icon?: React.ReactNode;
    description?: string;
  }>;
  /** Título do gráfico */
  title: string;
  /** Mostrar percentuais de conversão */
  showConversionRates?: boolean;
  /** Mostrar valores absolutos */
  showValues?: boolean;
  /** Altura do gráfico */
  height?: number;
  /** Classe CSS adicional */
  className?: string;
  /** Formato de exibição dos valores */
  valueFormatter?: (value: number) => string;
}

/**
 * Componente FunnelChart para visualização de funis de conversão
 * Ideal para análise de jornadas de clientes e processos de vendas
 */
export const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  title,
  showConversionRates = true,
  showValues = true,
  height = 400,
  className = '',
  valueFormatter = (value) => value.toLocaleString()
}) => {
  // Cores padrão para os estágios
  const defaultColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Calcula as taxas de conversão
  const dataWithConversion = React.useMemo(() => {
    return data.map((item, index) => {
      const conversionRate = index === 0 
        ? 100 
        : ((item.value / data[0].value) * 100);
      
      const stepConversionRate = index === 0 
        ? 100 
        : ((item.value / data[index - 1].value) * 100);

      return {
        ...item,
        color: item.color || defaultColors[index % defaultColors.length],
        conversionRate,
        stepConversionRate,
        width: (item.value / data[0].value) * 100
      };
    });
  }, [data]);

  // Ícones padrão para estágios comuns
  const getDefaultIcon = (stage: string, index: number) => {
    const iconMap: Record<string, React.ReactNode> = {
      'visitantes': <Users className="w-4 h-4" />,
      'leads': <Target className="w-4 h-4" />,
      'oportunidades': <ShoppingCart className="w-4 h-4" />,
      'vendas': <CreditCard className="w-4 h-4" />,
      'clientes': <Users className="w-4 h-4" />
    };

    const lowerStage = stage.toLowerCase();
    return iconMap[lowerStage] || <TrendingDown className="w-4 h-4" />;
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Análise de conversão por estágio do funil
        </p>
      </div>

      <div className="space-y-4" style={{ minHeight: height }}>
        {dataWithConversion.map((item, index) => (
          <div key={item.stage} className="relative">
            {/* Barra do funil */}
            <div className="relative">
              {/* Fundo da barra */}
              <div className="w-full h-16 bg-gray-100 rounded-lg relative overflow-hidden">
                {/* Barra preenchida */}
                <div
                  className="h-full rounded-lg transition-all duration-500 ease-out flex items-center justify-between px-4"
                  style={{
                    width: `${item.width}%`,
                    backgroundColor: item.color,
                    minWidth: '120px'
                  }}
                >
                  {/* Lado esquerdo - Ícone e nome */}
                  <div className="flex items-center gap-3 text-white">
                    {item.icon || getDefaultIcon(item.stage, index)}
                    <div>
                      <div className="font-semibold text-sm">{item.stage}</div>
                      {item.description && (
                        <div className="text-xs opacity-90">{item.description}</div>
                      )}
                    </div>
                  </div>

                  {/* Lado direito - Valores */}
                  {showValues && (
                    <div className="text-white text-right">
                      <div className="font-bold text-lg">
                        {valueFormatter(item.value)}
                      </div>
                      {showConversionRates && (
                        <div className="text-xs opacity-90">
                          {item.conversionRate.toFixed(1)}% do total
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Seta de conexão para o próximo estágio */}
              {index < dataWithConversion.length - 1 && (
                <div className="flex justify-center mt-2 mb-2">
                  <div className="flex flex-col items-center">
                    <TrendingDown className="w-5 h-5 text-gray-400" />
                    {showConversionRates && (
                      <span className="text-xs text-gray-500 mt-1">
                        {dataWithConversion[index + 1].stepConversionRate.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resumo estatístico */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {valueFormatter(data[0]?.value || 0)}
            </div>
            <div className="text-sm text-gray-500">Total Inicial</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {valueFormatter(data[data.length - 1]?.value || 0)}
            </div>
            <div className="text-sm text-gray-500">Conversões Finais</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {data.length > 0 ? 
                ((data[data.length - 1].value / data[0].value) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-500">Taxa Global</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {data.length}
            </div>
            <div className="text-sm text-gray-500">Estágios</div>
          </div>
        </div>
      </div>

      {/* Insights automáticos */}
      {data.length > 1 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Insights</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {(() => {
              const worstConversion = dataWithConversion
                .slice(1)
                .reduce((worst, current, index) => 
                  current.stepConversionRate < worst.stepConversionRate ? current : worst
                );
              
              const bestConversion = dataWithConversion
                .slice(1)
                .reduce((best, current, index) => 
                  current.stepConversionRate > best.stepConversionRate ? current : best
                );

              return (
                <>
                  <p>• Maior gargalo: {worstConversion.stage} ({worstConversion.stepConversionRate.toFixed(1)}% de conversão)</p>
                  <p>• Melhor conversão: {bestConversion.stage} ({bestConversion.stepConversionRate.toFixed(1)}% de conversão)</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FunnelChart;
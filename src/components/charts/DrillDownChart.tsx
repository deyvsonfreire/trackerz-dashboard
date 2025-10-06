'use client';

import React, { useState, useCallback } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { ArrowLeft, TrendingUp, Eye, MousePointer } from 'lucide-react';

/**
 * Interface para dados de drill-down
 */
export interface DrillDownData {
  id: string;
  name: string;
  value: number;
  children?: DrillDownData[];
  metadata?: Record<string, any>;
  color?: string;
}

/**
 * Interface para configuração do drill-down
 */
export interface DrillDownConfig {
  title: string;
  type: 'bar' | 'pie' | 'line';
  dataKey: string;
  nameKey: string;
  colors?: string[];
  formatValue?: (value: number) => string;
  onDrillDown?: (item: DrillDownData, level: number) => void;
  onDrillUp?: (level: number) => void;
}

/**
 * Props do componente DrillDownChart
 */
interface DrillDownChartProps {
  /** Dados para o gráfico */
  data: DrillDownData[];
  /** Configuração do drill-down */
  config: DrillDownConfig;
  /** Altura do gráfico */
  height?: number;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Cores padrão para os gráficos
 */
const DEFAULT_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
  '#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1'
];

/**
 * Componente de gráfico com funcionalidade de drill-down
 */
export const DrillDownChart: React.FC<DrillDownChartProps> = ({
  data,
  config,
  height = 300,
  className = ''
}) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [breadcrumb, setBreadcrumb] = useState<DrillDownData[]>([]);
  const [currentData, setCurrentData] = useState<DrillDownData[]>(data);

  /**
   * Manipula o clique em um elemento do gráfico para drill-down
   */
  const handleDrillDown = useCallback((item: any) => {
    const dataItem = currentData.find(d => d.name === item.name || d.id === item.id);
    
    if (dataItem && dataItem.children && dataItem.children.length > 0) {
      setBreadcrumb(prev => [...prev, dataItem]);
      setCurrentData(dataItem.children!);
      setCurrentLevel(prev => prev + 1);
      
      if (config.onDrillDown) {
        config.onDrillDown(dataItem, currentLevel + 1);
      }
    }
  }, [currentData, currentLevel, config]);

  /**
   * Manipula o drill-up (voltar ao nível anterior)
   */
  const handleDrillUp = useCallback(() => {
    if (currentLevel > 0) {
      const newBreadcrumb = [...breadcrumb];
      newBreadcrumb.pop();
      setBreadcrumb(newBreadcrumb);
      
      if (newBreadcrumb.length === 0) {
        setCurrentData(data);
      } else {
        const parent = newBreadcrumb[newBreadcrumb.length - 1];
        setCurrentData(parent.children || data);
      }
      
      setCurrentLevel(prev => prev - 1);
      
      if (config.onDrillUp) {
        config.onDrillUp(currentLevel - 1);
      }
    }
  }, [currentLevel, breadcrumb, data, config]);

  /**
   * Navega para um nível específico do breadcrumb
   */
  const navigateToLevel = useCallback((level: number) => {
    if (level === 0) {
      setBreadcrumb([]);
      setCurrentData(data);
      setCurrentLevel(0);
    } else if (level < breadcrumb.length) {
      const newBreadcrumb = breadcrumb.slice(0, level);
      setBreadcrumb(newBreadcrumb);
      
      const parent = newBreadcrumb[newBreadcrumb.length - 1];
      setCurrentData(parent.children || data);
      setCurrentLevel(level);
    }
  }, [breadcrumb, data]);

  /**
   * Formata o valor usando a função personalizada ou padrão
   */
  const formatValue = useCallback((value: number) => {
    if (config.formatValue) {
      return config.formatValue(value);
    }
    return value.toLocaleString('pt-BR');
  }, [config.formatValue]);

  /**
   * Renderiza o gráfico de barras
   */
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={config.nameKey} 
          tick={{ fontSize: 12 }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          formatter={(value: number) => [formatValue(value), config.title]}
          labelStyle={{ color: '#374151' }}
          contentStyle={{ 
            backgroundColor: '#f9fafb', 
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}
        />
        <Bar 
          dataKey={config.dataKey} 
          fill={config.colors?.[0] || DEFAULT_COLORS[0]}
          cursor="pointer"
          onClick={handleDrillDown}
        >
          {currentData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || config.colors?.[index % (config.colors?.length || DEFAULT_COLORS.length)] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  /**
   * Renderiza o gráfico de pizza
   */
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={currentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={config.dataKey}
          onClick={handleDrillDown}
          cursor="pointer"
        >
          {currentData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || config.colors?.[index % (config.colors?.length || DEFAULT_COLORS.length)] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [formatValue(value), config.title]}
          contentStyle={{ 
            backgroundColor: '#f9fafb', 
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  /**
   * Renderiza o gráfico de linha
   */
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={config.nameKey} 
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          formatter={(value: number) => [formatValue(value), config.title]}
          labelStyle={{ color: '#374151' }}
          contentStyle={{ 
            backgroundColor: '#f9fafb', 
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey={config.dataKey} 
          stroke={config.colors?.[0] || DEFAULT_COLORS[0]}
          strokeWidth={2}
          dot={{ cursor: 'pointer', onClick: handleDrillDown }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  /**
   * Renderiza o gráfico baseado no tipo
   */
  const renderChart = () => {
    switch (config.type) {
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      case 'line':
        return renderLineChart();
      default:
        return renderBarChart();
    }
  };

  /**
   * Verifica se há dados filhos para drill-down
   */
  const hasChildren = currentData.some(item => item.children && item.children.length > 0);

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header com título e navegação */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
          {currentLevel > 0 && (
            <Badge variant="secondary" className="text-xs">
              Nível {currentLevel + 1}
            </Badge>
          )}
        </div>
        
        {currentLevel > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDrillUp}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        )}
      </div>

      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <button
            onClick={() => navigateToLevel(0)}
            className="hover:text-blue-600 transition-colors"
          >
            Início
          </button>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={item.id}>
              <span className="text-gray-400">/</span>
              <button
                onClick={() => navigateToLevel(index + 1)}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Indicador de drill-down disponível */}
      {hasChildren && currentLevel === 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm text-blue-600">
          <MousePointer className="w-4 h-4" />
          <span>Clique nos elementos para ver detalhes</span>
        </div>
      )}

      {/* Gráfico */}
      <div className="relative">
        {renderChart()}
      </div>

      {/* Estatísticas do nível atual */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {currentData.length}
            </div>
            <div className="text-sm text-gray-500">Itens</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatValue(currentData.reduce((sum, item) => sum + item.value, 0))}
            </div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatValue(currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length)}
            </div>
            <div className="text-sm text-gray-500">Média</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DrillDownChart;
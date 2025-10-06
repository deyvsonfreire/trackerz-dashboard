'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  BarChart3,
  Info,
  Download,
  Filter
} from 'lucide-react';

interface CohortData {
  cohort: string;
  size: number;
  periods: number[];
}

interface CohortAnalysisProps {
  timeRange?: string;
  metric?: 'retention' | 'revenue' | 'activity';
  className?: string;
}

/**
 * Componente de Análise de Coorte
 * Analisa a retenção e comportamento de usuários ao longo do tempo
 */
export const CohortAnalysis: React.FC<CohortAnalysisProps> = ({
  timeRange = '12w',
  metric = 'retention',
  className = ''
}) => {
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'heatmap' | 'chart'>('heatmap');

  // Dados mock de coorte (retenção por semana)
  const cohortData: CohortData[] = [
    {
      cohort: 'Jan 2024',
      size: 1250,
      periods: [100, 68, 52, 41, 35, 31, 28, 26, 24, 22, 21, 20]
    },
    {
      cohort: 'Fev 2024',
      size: 1180,
      periods: [100, 72, 58, 46, 39, 34, 31, 29, 27, 25, 24, 23]
    },
    {
      cohort: 'Mar 2024',
      size: 1420,
      periods: [100, 75, 61, 49, 42, 37, 34, 32, 30, 28, 27, 26]
    },
    {
      cohort: 'Abr 2024',
      size: 1350,
      periods: [100, 78, 65, 53, 46, 41, 38, 36, 34, 32, 31, 30]
    },
    {
      cohort: 'Mai 2024',
      size: 1580,
      periods: [100, 81, 69, 58, 51, 46, 43, 41, 39, 37, 36, 35]
    },
    {
      cohort: 'Jun 2024',
      size: 1720,
      periods: [100, 84, 73, 62, 56, 51, 48, 46, 44, 42, 41, 40]
    },
    {
      cohort: 'Jul 2024',
      size: 1650,
      periods: [100, 87, 76, 66, 60, 55, 52, 50, 48, 46, 45, 44]
    },
    {
      cohort: 'Ago 2024',
      size: 1890,
      periods: [100, 89, 79, 70, 64, 59, 56, 54, 52, 50, 49, 48]
    },
    {
      cohort: 'Set 2024',
      size: 2100,
      periods: [100, 92, 82, 74, 68, 63, 60, 58, 56, 54, 53, 52]
    },
    {
      cohort: 'Out 2024',
      size: 2250,
      periods: [100, 94, 85, 77, 71, 66, 63, 61, 59, 57, 56, 55]
    },
    {
      cohort: 'Nov 2024',
      size: 2180,
      periods: [100, 96, 88, 80, 74, 69, 66, 64, 62, 60, 59, 58]
    },
    {
      cohort: 'Dez 2024',
      size: 2350,
      periods: [100, 98, 91, 83, 77, 72, 69, 67, 65, 63, 62, 61]
    }
  ];

  const periods = ['Semana 0', 'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 
                  'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9', 
                  'Semana 10', 'Semana 11'];

  const getColorIntensity = (value: number): string => {
    if (value >= 80) return 'bg-green-600';
    if (value >= 60) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    if (value >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTextColor = (value: number): string => {
    return value >= 40 ? 'text-white' : 'text-gray-900';
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const calculateAverageRetention = (periodIndex: number): number => {
    const total = cohortData.reduce((sum, cohort) => sum + (cohort.periods[periodIndex] || 0), 0);
    return total / cohortData.length;
  };

  const getTrendDirection = (cohortIndex: number): 'up' | 'down' | 'stable' => {
    if (cohortIndex === 0) return 'stable';
    const current = cohortData[cohortIndex].periods[4] || 0; // Semana 4
    const previous = cohortData[cohortIndex - 1].periods[4] || 0;
    
    if (current > previous + 2) return 'up';
    if (current < previous - 2) return 'down';
    return 'stable';
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Análise de Coorte</h3>
          <p className="text-sm text-gray-600">
            Retenção de usuários por coorte ao longo do tempo
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={metric}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="retention">Retenção</option>
            <option value="revenue">Receita</option>
            <option value="activity">Atividade</option>
          </select>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'heatmap'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'chart'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Retenção Semana 1</p>
              <p className="text-2xl font-bold text-blue-900">
                {calculateAverageRetention(1).toFixed(1)}%
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Retenção Semana 4</p>
              <p className="text-2xl font-bold text-green-900">
                {calculateAverageRetention(4).toFixed(1)}%
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Melhor Coorte</p>
              <p className="text-2xl font-bold text-purple-900">Dez 2024</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Total Usuários</p>
              <p className="text-2xl font-bold text-orange-900">
                {formatNumber(cohortData.reduce((sum, c) => sum + c.size, 0))}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {viewMode === 'heatmap' ? (
        // Visualização Heatmap
        <div className="space-y-4">
          {/* Cabeçalho da Tabela */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-13 gap-1 mb-2">
                <div className="p-2 text-sm font-medium text-gray-900">Coorte</div>
                {periods.map((period, index) => (
                  <div key={period} className="p-2 text-xs font-medium text-gray-600 text-center">
                    {index === 0 ? 'Tamanho' : `S${index}`}
                  </div>
                ))}
              </div>

              {/* Dados da Coorte */}
              {cohortData.map((cohort, cohortIndex) => (
                <div
                  key={cohort.cohort}
                  className={`grid grid-cols-13 gap-1 mb-1 p-1 rounded-lg transition-all cursor-pointer ${
                    selectedCohort === cohort.cohort
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCohort(selectedCohort === cohort.cohort ? null : cohort.cohort)}
                >
                  <div className="p-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                    {cohort.cohort}
                    {getTrendDirection(cohortIndex) === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
                    {getTrendDirection(cohortIndex) === 'down' && <TrendingDown className="w-3 h-3 text-red-600" />}
                  </div>
                  
                  <div className="p-2 text-xs text-center font-medium text-gray-900">
                    {formatNumber(cohort.size)}
                  </div>
                  
                  {cohort.periods.slice(1).map((value, periodIndex) => (
                    <div
                      key={periodIndex}
                      className={`p-2 text-xs text-center font-medium rounded ${getColorIntensity(value)} ${getTextColor(value)}`}
                      title={`${value}% retenção na semana ${periodIndex + 1}`}
                    >
                      {value}%
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legenda */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">Retenção:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs text-gray-600">0-20%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-xs text-gray-600">20-40%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-xs text-gray-600">40-60%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-600">60-80%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span className="text-xs text-gray-600">80-100%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Clique em uma coorte para ver detalhes</span>
            </div>
          </div>
        </div>
      ) : (
        // Visualização em Gráfico
        <div className="space-y-6">
          <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Gráfico de linha da retenção por período</p>
              <p className="text-sm text-gray-500">Comparação entre coortes selecionadas</p>
            </div>
          </div>
          
          {/* Seletor de Coortes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cohortData.slice(-4).map(cohort => (
              <div
                key={cohort.cohort}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCohort === cohort.cohort
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCohort(selectedCohort === cohort.cohort ? null : cohort.cohort)}
              >
                <div className="text-sm font-medium text-gray-900">{cohort.cohort}</div>
                <div className="text-xs text-gray-600">{formatNumber(cohort.size)} usuários</div>
                <div className="text-xs text-gray-600">
                  Retenção S4: {cohort.periods[4]}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detalhes da Coorte Selecionada */}
      {selectedCohort && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-medium text-blue-900 mb-3">
            Detalhes da Coorte: {selectedCohort}
          </h5>
          
          {(() => {
            const cohort = cohortData.find(c => c.cohort === selectedCohort);
            if (!cohort) return null;
            
            return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-blue-600">Tamanho Inicial</div>
                  <div className="font-semibold text-blue-900">{cohort.size.toLocaleString()} usuários</div>
                </div>
                
                <div>
                  <div className="text-sm text-blue-600">Retenção Semana 1</div>
                  <div className="font-semibold text-blue-900">{cohort.periods[1]}%</div>
                </div>
                
                <div>
                  <div className="text-sm text-blue-600">Retenção Semana 4</div>
                  <div className="font-semibold text-blue-900">{cohort.periods[4]}%</div>
                </div>
                
                <div>
                  <div className="text-sm text-blue-600">Retenção Semana 11</div>
                  <div className="font-semibold text-blue-900">{cohort.periods[11]}%</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Insights da Análise de Coorte</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Coortes mais recentes mostram melhor retenção inicial (Dez 2024: {cohortData[cohortData.length-1].periods[1]}%)</li>
          <li>• Retenção média na semana 4 é de {calculateAverageRetention(4).toFixed(1)}%</li>
          <li>• Tendência de melhoria na retenção ao longo dos meses</li>
          <li>• Maior queda de retenção ocorre entre semana 0 e semana 1</li>
        </ul>
      </div>
    </Card>
  );
};
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  ArrowRight, 
  Users, 
  MousePointer, 
  ShoppingCart, 
  CreditCard,
  Eye,
  Filter
} from 'lucide-react';

interface JourneyStep {
  id: string;
  name: string;
  icon: React.ReactNode;
  users: number;
  conversionRate?: number;
  color: string;
}

interface JourneyFlow {
  from: string;
  to: string;
  users: number;
  percentage: number;
}

interface CustomerJourneyProps {
  timeRange?: string;
  segment?: string;
  className?: string;
}

/**
 * Componente de Jornada do Cliente com visualização Sankey
 * Mostra o fluxo de usuários através das etapas do funil de conversão
 */
export const CustomerJourney: React.FC<CustomerJourneyProps> = ({
  timeRange = '30d',
  segment = 'all',
  className = ''
}) => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'funnel'>('flow');

  // Dados mock das etapas da jornada
  const journeySteps: JourneyStep[] = [
    {
      id: 'awareness',
      name: 'Consciência',
      icon: <Eye className="w-5 h-5" />,
      users: 10000,
      color: '#3B82F6'
    },
    {
      id: 'interest',
      name: 'Interesse',
      icon: <MousePointer className="w-5 h-5" />,
      users: 6500,
      conversionRate: 65,
      color: '#10B981'
    },
    {
      id: 'consideration',
      name: 'Consideração',
      icon: <Users className="w-5 h-5" />,
      users: 3200,
      conversionRate: 49.2,
      color: '#F59E0B'
    },
    {
      id: 'intent',
      name: 'Intenção',
      icon: <ShoppingCart className="w-5 h-5" />,
      users: 1800,
      conversionRate: 56.3,
      color: '#EF4444'
    },
    {
      id: 'purchase',
      name: 'Compra',
      icon: <CreditCard className="w-5 h-5" />,
      users: 850,
      conversionRate: 47.2,
      color: '#8B5CF6'
    }
  ];

  // Fluxos entre etapas
  const journeyFlows: JourneyFlow[] = [
    { from: 'awareness', to: 'interest', users: 6500, percentage: 65 },
    { from: 'interest', to: 'consideration', users: 3200, percentage: 49.2 },
    { from: 'consideration', to: 'intent', users: 1800, percentage: 56.3 },
    { from: 'intent', to: 'purchase', users: 850, percentage: 47.2 }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStepWidth = (users: number): number => {
    const maxUsers = Math.max(...journeySteps.map(step => step.users));
    return Math.max((users / maxUsers) * 100, 20);
  };

  const getFlowHeight = (users: number): number => {
    const maxFlow = Math.max(...journeyFlows.map(flow => flow.users));
    return Math.max((users / maxFlow) * 60, 8);
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Jornada do Cliente</h3>
          <p className="text-sm text-gray-600">Fluxo de conversão por etapa</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('flow')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'flow'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Fluxo
            </button>
            <button
              onClick={() => setViewMode('funnel')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'funnel'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Funil
            </button>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'flow' ? (
        // Visualização de Fluxo (Sankey-like)
        <div className="space-y-8">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Etapa */}
              <div
                className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedStep === step.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                style={{ width: `${getStepWidth(step.users)}%` }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-4"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{step.name}</h4>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatNumber(step.users)}
                    </span>
                  </div>
                  
                  {step.conversionRate && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">Taxa de conversão</span>
                      <span className="text-sm font-medium text-green-600">
                        {step.conversionRate}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fluxo para próxima etapa */}
              {index < journeySteps.length - 1 && (
                <div className="flex items-center mt-4 mb-4">
                  <div className="flex-1 flex items-center">
                    <div 
                      className="bg-gray-300 rounded-full transition-all"
                      style={{ 
                        height: `${getFlowHeight(journeyFlows[index].users)}px`,
                        width: '60%'
                      }}
                    />
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatNumber(journeyFlows[index].users)}
                    </div>
                    <div className="text-xs text-gray-600">
                      {journeyFlows[index].percentage}%
                    </div>
                  </div>
                </div>
              )}

              {/* Detalhes expandidos */}
              {selectedStep === step.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Usuários únicos</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {step.users.toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Tempo médio</div>
                      <div className="text-lg font-semibold text-gray-900">2.5min</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Bounce rate</div>
                      <div className="text-lg font-semibold text-red-600">
                        {100 - (step.conversionRate || 100)}%
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Valor médio</div>
                      <div className="text-lg font-semibold text-green-600">R$ 125</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Visualização de Funil
        <div className="space-y-4">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div 
                className="flex items-center p-4 rounded-lg transition-all"
                style={{ 
                  backgroundColor: `${step.color}20`,
                  borderLeft: `4px solid ${step.color}`,
                  width: `${getStepWidth(step.users)}%`,
                  marginLeft: `${(100 - getStepWidth(step.users)) / 2}%`
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{step.name}</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(step.users)}
                    </span>
                  </div>
                  
                  {step.conversionRate && (
                    <div className="text-sm text-gray-600">
                      {step.conversionRate}% do anterior
                    </div>
                  )}
                </div>
              </div>
              
              {/* Perda entre etapas */}
              {index < journeySteps.length - 1 && (
                <div className="text-center py-2">
                  <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                    -{formatNumber(step.users - journeySteps[index + 1].users)} usuários
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resumo */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(journeySteps[0].users)}
            </div>
            <div className="text-sm text-gray-600">Visitantes</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(journeySteps[journeySteps.length - 1].users)}
            </div>
            <div className="text-sm text-gray-600">Conversões</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {((journeySteps[journeySteps.length - 1].users / journeySteps[0].users) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Taxa Global</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">R$ 106K</div>
            <div className="text-sm text-gray-600">Receita Total</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
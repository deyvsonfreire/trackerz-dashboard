'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Eye,
  Filter,
  MoreVertical,
  Copy,
  Download
} from 'lucide-react';

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria[];
  users: number;
  growth: number;
  revenue: number;
  conversionRate: number;
  isActive: boolean;
  createdAt: string;
  color: string;
}

interface SegmentCriteria {
  id: string;
  field: string;
  operator: string;
  value: string | number;
  type: 'demographic' | 'behavioral' | 'geographic' | 'transactional';
}

interface CustomSegmentsProps {
  className?: string;
}

/**
 * Componente de Segmentos Personalizados
 * Permite criar, editar e gerenciar segmentos de audiência
 */
export const CustomSegments: React.FC<CustomSegmentsProps> = ({
  className = ''
}) => {
  const [segments, setSegments] = useState<Segment[]>([
    {
      id: '1',
      name: 'High-Value Customers',
      description: 'Clientes com alto valor de compra e engajamento',
      criteria: [
        { id: '1', field: 'revenue', operator: '>', value: 1000, type: 'transactional' },
        { id: '2', field: 'sessions', operator: '>', value: 10, type: 'behavioral' }
      ],
      users: 2450,
      growth: 12.5,
      revenue: 125000,
      conversionRate: 8.5,
      isActive: true,
      createdAt: '2024-01-15',
      color: '#10B981'
    },
    {
      id: '2',
      name: 'Mobile Users SP',
      description: 'Usuários mobile de São Paulo',
      criteria: [
        { id: '3', field: 'device', operator: '=', value: 'mobile', type: 'behavioral' },
        { id: '4', field: 'location', operator: '=', value: 'São Paulo', type: 'geographic' }
      ],
      users: 8750,
      growth: -2.3,
      revenue: 45000,
      conversionRate: 3.2,
      isActive: true,
      createdAt: '2024-01-10',
      color: '#3B82F6'
    },
    {
      id: '3',
      name: 'Abandoned Cart',
      description: 'Usuários que abandonaram carrinho nos últimos 7 dias',
      criteria: [
        { id: '5', field: 'cart_abandoned', operator: '=', value: 'true', type: 'behavioral' },
        { id: '6', field: 'days_since', operator: '<=', value: 7, type: 'behavioral' }
      ],
      users: 1250,
      growth: 5.8,
      revenue: 0,
      conversionRate: 0,
      isActive: false,
      createdAt: '2024-01-12',
      color: '#F59E0B'
    }
  ]);

  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getCriteriaText = (criteria: SegmentCriteria[]): string => {
    return criteria.map(c => {
      const operatorText = {
        '>': 'maior que',
        '<': 'menor que',
        '=': 'igual a',
        '>=': 'maior ou igual a',
        '<=': 'menor ou igual a',
        '!=': 'diferente de'
      }[c.operator] || c.operator;
      
      return `${c.field} ${operatorText} ${c.value}`;
    }).join(' E ');
  };

  const toggleSegmentStatus = (segmentId: string) => {
    setSegments(prev => prev.map(segment => 
      segment.id === segmentId 
        ? { ...segment, isActive: !segment.isActive }
        : segment
    ));
  };

  const duplicateSegment = (segment: Segment) => {
    const newSegment: Segment = {
      ...segment,
      id: Date.now().toString(),
      name: `${segment.name} (Cópia)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSegments(prev => [...prev, newSegment]);
  };

  const deleteSegment = (segmentId: string) => {
    setSegments(prev => prev.filter(segment => segment.id !== segmentId));
  };

  const totalUsers = segments.reduce((sum, segment) => sum + segment.users, 0);
  const activeSegments = segments.filter(segment => segment.isActive).length;
  const totalRevenue = segments.reduce((sum, segment) => sum + segment.revenue, 0);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Segmentos Personalizados</h3>
          <p className="text-sm text-gray-600">
            Gerencie e analise segmentos de audiência customizados
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lista
            </button>
          </div>
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Segmento
          </button>
        </div>
      </div>

      {/* Estatísticas Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total de Usuários</p>
              <p className="text-2xl font-bold text-blue-900">{formatNumber(totalUsers)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Segmentos Ativos</p>
              <p className="text-2xl font-bold text-green-900">{activeSegments}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Receita Total</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Taxa Média</p>
              <p className="text-2xl font-bold text-orange-900">
                {(segments.reduce((sum, s) => sum + s.conversionRate, 0) / segments.length).toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Lista/Grid de Segmentos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map(segment => (
            <div
              key={segment.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                segment.isActive
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              onClick={() => setSelectedSegment(segment)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <h4 className="font-medium text-gray-900">{segment.name}</h4>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSegmentStatus(segment.id);
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      segment.isActive
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  
                  <div className="relative group">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSegment(segment);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSegment(segment.id);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{segment.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Usuários</span>
                  <span className="text-sm font-medium">{formatNumber(segment.users)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Crescimento</span>
                  <span className={`text-sm font-medium ${
                    segment.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Conversão</span>
                  <span className="text-sm font-medium">{segment.conversionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {segments.map(segment => (
            <div
              key={segment.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                segment.isActive
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => setSelectedSegment(segment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{segment.name}</h4>
                    <p className="text-sm text-gray-600">{getCriteriaText(segment.criteria)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatNumber(segment.users)}</div>
                    <div className="text-xs text-gray-500">usuários</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      segment.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                    </div>
                    <div className="text-xs text-gray-500">crescimento</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">{segment.conversionRate}%</div>
                    <div className="text-xs text-gray-500">conversão</div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSegmentStatus(segment.id);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      segment.isActive
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalhes do Segmento */}
      {selectedSegment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedSegment.name}
              </h3>
              <button
                onClick={() => setSelectedSegment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                <p className="text-gray-600">{selectedSegment.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Critérios</h4>
                <div className="space-y-2">
                  {selectedSegment.criteria.map(criteria => (
                    <div key={criteria.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{criteria.field}</span>
                      <span className="text-sm text-gray-600">{criteria.operator}</span>
                      <span className="text-sm font-medium">{criteria.value}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        criteria.type === 'demographic' ? 'bg-blue-100 text-blue-800' :
                        criteria.type === 'behavioral' ? 'bg-green-100 text-green-800' :
                        criteria.type === 'geographic' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {criteria.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(selectedSegment.users)}
                  </div>
                  <div className="text-sm text-gray-600">Usuários</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(selectedSegment.revenue)}
                  </div>
                  <div className="text-sm text-gray-600">Receita</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Editar Segmento
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 inline mr-2" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
'use client';

import React, { useState } from 'react';
import { Card, Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
import { 
  Calendar, 
  Filter, 
  X, 
  ChevronDown, 
  Download,
  Users,
  MapPin,
  Smartphone,
  TrendingUp,
  Plus,
  Search,
  BarChart3,
  RefreshCw
} from 'lucide-react';

/**
 * Interface para o estado dos filtros avançados
 */
export interface AdvancedFiltersState {
  dateRange: {
    start: string;
    end: string;
    preset: string;
  };
  compareRange?: {
    start: string;
    end: string;
    preset: string;
  } | null;
  channels: string[];
  regions: string[];
  metrics: string[];
  segments: string[];
  devices: string[];
  customFilters: Array<{
    id: string;
    field: string;
    operator: string;
    value: string;
  }>;
}

/**
 * Props do componente AdvancedFilters
 */
interface AdvancedFiltersProps {
  filters: AdvancedFiltersState;
  onFiltersChange: (filters: AdvancedFiltersState) => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
  onExport?: (format: 'csv' | 'xlsx' | 'pdf') => void;
  className?: string;
}

// Constantes para opções pré-definidas
const DATE_PRESETS = [
  { label: 'Últimos 7 dias', value: '7d' },
  { label: 'Últimos 30 dias', value: '30d' },
  { label: 'Últimos 90 dias', value: '90d' },
  { label: 'Este mês', value: 'this_month' },
  { label: 'Mês passado', value: 'last_month' },
  { label: 'Este trimestre', value: 'this_quarter' },
  { label: 'Este ano', value: 'this_year' },
  { label: 'Personalizado', value: 'custom' }
];

const AVAILABLE_CHANNELS = [
  'Meta Ads',
  'Google Ads',
  'LinkedIn Ads',
  'TikTok Ads',
  'YouTube Ads',
  'Twitter Ads',
  'Organic Search',
  'Direct Traffic',
  'Email Marketing',
  'Referral',
  'Display',
  'Affiliate'
];

const AVAILABLE_REGIONS = [
  'Norte',
  'Nordeste',
  'Centro-Oeste',
  'Sudeste',
  'Sul',
  'São Paulo',
  'Rio de Janeiro',
  'Minas Gerais',
  'Paraná',
  'Rio Grande do Sul',
  'Bahia',
  'Ceará',
  'Pernambuco'
];

const AVAILABLE_METRICS = [
  'Revenue',
  'ROAS',
  'CAC',
  'LTV',
  'Conversions',
  'Clicks',
  'Impressions',
  'CTR',
  'CPC',
  'CPM'
];

const AVAILABLE_SEGMENTS = [
  'Novos Usuários',
  'Usuários Recorrentes',
  'Alto Valor',
  'Mobile First',
  'Desktop Users',
  'Convertidos',
  'Abandonaram Carrinho',
  'Primeira Compra',
  'Compradores Frequentes',
  'Inativos'
];

const AVAILABLE_DEVICES = [
  'Mobile',
  'Desktop',
  'Tablet'
];

const CUSTOM_FILTER_FIELDS = [
  { value: 'age', label: 'Idade' },
  { value: 'gender', label: 'Gênero' },
  { value: 'income', label: 'Renda' },
  { value: 'education', label: 'Escolaridade' },
  { value: 'location', label: 'Localização' },
  { value: 'device', label: 'Dispositivo' },
  { value: 'browser', label: 'Navegador' },
  { value: 'os', label: 'Sistema Operacional' }
];

const CUSTOM_FILTER_OPERATORS = [
  { value: 'equals', label: 'Igual a' },
  { value: 'not_equals', label: 'Diferente de' },
  { value: 'contains', label: 'Contém' },
  { value: 'not_contains', label: 'Não contém' },
  { value: 'greater_than', label: 'Maior que' },
  { value: 'less_than', label: 'Menor que' },
  { value: 'between', label: 'Entre' }
];

/**
 * Componente de filtros avançados para análise de audiência
 */
export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  isVisible,
  onToggleVisibility,
  onExport,
  className = ''
}) => {
  const [showComparison, setShowComparison] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Funções auxiliares
  const handleDateRangeChange = (preset: string, start?: string, end?: string) => {
    const updatedFilters = {
      ...filters,
      dateRange: { preset, start: start || '', end: end || '' }
    };
    onFiltersChange(updatedFilters);
  };

  const handleChannelToggle = (channel: string) => {
    const updatedChannels = filters.channels.includes(channel)
      ? filters.channels.filter(c => c !== channel)
      : [...filters.channels, channel];
    
    onFiltersChange({
      ...filters,
      channels: updatedChannels
    });
  };

  const handleRegionToggle = (region: string) => {
    const updatedRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    
    onFiltersChange({
      ...filters,
      regions: updatedRegions
    });
  };

  const handleMetricToggle = (metric: string) => {
    const updatedMetrics = filters.metrics.includes(metric)
      ? filters.metrics.filter(m => m !== metric)
      : [...filters.metrics, metric];
    
    onFiltersChange({
      ...filters,
      metrics: updatedMetrics
    });
  };

  const removeFilter = (type: keyof AdvancedFiltersState, value: string) => {
    if (type === 'channels' || type === 'regions' || type === 'metrics' || type === 'segments' || type === 'devices') {
      const updatedFilters = {
        ...filters,
        [type]: filters[type].filter(item => item !== value)
      };
      onFiltersChange(updatedFilters);
    }
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
    if (!showComparison) {
      const updatedFilters = {
        ...filters,
        compareRange: {
          start: '',
          end: '',
          preset: 'previous_period'
        }
      };
      onFiltersChange(updatedFilters);
    } else {
      const updatedFilters = {
        ...filters,
        compareRange: null
      };
      onFiltersChange(updatedFilters);
    }
  };

  const addCustomFilter = () => {
    const newFilter = {
      id: Date.now().toString(),
      field: '',
      operator: '',
      value: ''
    };
    const updatedFilters = {
      ...filters,
      customFilters: [...filters.customFilters, newFilter]
    };
    onFiltersChange(updatedFilters);
  };

  const removeCustomFilter = (id: string) => {
    const updatedFilters = {
      ...filters,
      customFilters: filters.customFilters.filter(filter => filter.id !== id)
    };
    onFiltersChange(updatedFilters);
  };

  const updateCustomFilter = (id: string, field: string, value: string) => {
    const updatedFilters = {
      ...filters,
      customFilters: filters.customFilters.map(filter =>
        filter.id === id ? { ...filter, [field]: value } : filter
      )
    };
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: AdvancedFiltersState = {
      dateRange: { start: '', end: '', preset: '30d' },
      compareRange: null,
      channels: [],
      regions: [],
      metrics: [],
      segments: [],
      devices: [],
      customFilters: []
    };
    onFiltersChange(clearedFilters);
    setShowComparison(false);
  };

  const getActiveFiltersCount = () => {
    return filters.channels.length + filters.regions.length + filters.metrics.length + 
           filters.segments.length + filters.devices.length + filters.customFilters.length;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros Avançados</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {getActiveFiltersCount()} ativo{getActiveFiltersCount() > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Comparação Temporal */}
            <Button
              variant={showComparison ? "default" : "outline"}
              size="sm"
              onClick={toggleComparison}
              className="text-sm"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Comparar
            </Button>

            {/* Exportação */}
            {onExport && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button
                      onClick={() => {
                        onExport('csv');
                        setShowExportMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Exportar CSV
                    </button>
                    <button
                      onClick={() => {
                        onExport('xlsx');
                        setShowExportMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Exportar Excel
                    </button>
                    <button
                      onClick={() => {
                        onExport('pdf');
                        setShowExportMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Exportar PDF
                    </button>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpar
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleVisibility}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Conteúdo dos filtros */}
        <div className="space-y-6">
          {/* Filtro de Período */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Período</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {DATE_PRESETS.map((preset) => (
                <Button
                  key={preset.value}
                  variant={filters.dateRange.preset === preset.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDateRangeChange(preset.value)}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            {filters.dateRange.preset === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Data Inicial</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange('custom', e.target.value, filters.dateRange.end)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Data Final</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange('custom', filters.dateRange.start, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Comparação Temporal */}
          {showComparison && (
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-700">Comparar com</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {DATE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      const updatedFilters = {
                        ...filters,
                        compareRange: {
                          start: '',
                          end: '',
                          preset: preset.value
                        }
                      };
                      onFiltersChange(updatedFilters);
                    }}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      filters.compareRange?.preset === preset.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtro de Canais */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Canais</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CHANNELS.map((channel) => (
                <Button
                  key={channel}
                  variant={filters.channels.includes(channel) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChannelToggle(channel)}
                  className="text-xs justify-start"
                >
                  {channel}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro de Regiões */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Regiões</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_REGIONS.map((region) => (
                <Button
                  key={region}
                  variant={filters.regions.includes(region) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRegionToggle(region)}
                  className="text-xs"
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro de Métricas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Métricas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_METRICS.map((metric) => (
                <Button
                  key={metric}
                  variant={filters.metrics.includes(metric) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMetricToggle(metric)}
                  className="text-xs"
                >
                  {metric}
                </Button>
              ))}
            </div>
          </div>

          {/* Segmentação por Audiência */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Segmentação</h3>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'segments' ? null : 'segments')}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left text-sm"
              >
                <span>
                  {filters.segments.length > 0 
                    ? `${filters.segments.length} segmento${filters.segments.length > 1 ? 's' : ''} selecionado${filters.segments.length > 1 ? 's' : ''}`
                    : 'Selecionar segmentos'
                  }
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'segments' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar segmentos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    {AVAILABLE_SEGMENTS
                      .filter(segment => segment.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((segment) => (
                        <label key={segment} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.segments.includes(segment)}
                            onChange={(e) => {
                              const updatedSegments = e.target.checked
                                ? [...filters.segments, segment]
                                : filters.segments.filter(s => s !== segment);
                              onFiltersChange({ ...filters, segments: updatedSegments });
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm">{segment}</span>
                        </label>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags dos segmentos selecionados */}
            {filters.segments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.segments.map((segment) => (
                  <Badge
                    key={segment}
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 flex items-center gap-1"
                  >
                    {segment}
                    <button
                      onClick={() => removeFilter('segments', segment)}
                      className="ml-1 hover:text-purple-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por Dispositivos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Dispositivos</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_DEVICES.map((device) => (
                <button
                  key={device}
                  onClick={() => {
                    const updatedDevices = filters.devices.includes(device)
                      ? filters.devices.filter(d => d !== device)
                      : [...filters.devices, device];
                    onFiltersChange({ ...filters, devices: updatedDevices });
                  }}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    filters.devices.includes(device)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
                  }`}
                >
                  {device}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros Personalizados */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-700">Filtros Personalizados</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addCustomFilter}
                className="text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Filtro
              </Button>
            </div>

            {filters.customFilters.map((filter, index) => (
              <div key={filter.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-lg bg-gray-50">
                {/* Campo */}
                <div className="col-span-1">
                  <label className="block text-xs text-gray-600 mb-1">Campo</label>
                  <Select
                    value={filter.field}
                    onValueChange={(value) => updateCustomFilter(filter.id, 'field', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CUSTOM_FILTER_FIELDS.map(field => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Operador */}
                <div className="col-span-1">
                  <label className="block text-xs text-gray-600 mb-1">Operador</label>
                  <Select
                    value={filter.operator}
                    onValueChange={(value) => updateCustomFilter(filter.id, 'operator', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CUSTOM_FILTER_OPERATORS.map(op => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Valor */}
                <div className="col-span-1">
                  <label className="block text-xs text-gray-600 mb-1">Valor</label>
                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) => updateCustomFilter(filter.id, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Digite o valor"
                  />
                </div>

                {/* Ações */}
                <div className="col-span-1 flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => removeCustomFilter(filter.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedFilters;
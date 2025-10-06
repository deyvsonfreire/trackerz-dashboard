'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, MetricCard, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { 
  DemographicHeatmap, 
  GeographicDistribution, 
  CustomerJourney, 
  EngagementHeatmap,
  CustomSegments,
  DevicePerformance,
  CohortAnalysis
} from '@/components/charts';
import { AdvancedFilters, AdvancedFiltersState } from '@/components/filters';
import { 
  Users, 
  MapPin, 
  Activity, 
  Clock, 
  Target, 
  TrendingUp,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

/**
 * Dashboard de Audiência e Segmentação
 * 
 * Este dashboard fornece análises detalhadas sobre a audiência,
 * incluindo dados demográficos, comportamentais e de segmentação.
 */
export default function AudiencePage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<AdvancedFiltersState>({
    dateRange: { start: '', end: '', preset: 'last_30_days' },
    compareRange: null,
    channels: [],
    regions: [],
    metrics: [],
    segments: [],
    devices: [],
    customFilters: []
  });

  /**
   * Função para exportar dados
   */
  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    console.log(`Exportando dados em formato ${format}...`);
    // Aqui seria implementada a lógica real de exportação
    alert(`Exportação em ${format.toUpperCase()} iniciada!`);
  };

  return (
    <Layout title="Audiência" subtitle="Análise de crescimento, demografia e comportamento da audiência.">
      <div className="space-y-6 sm:space-y-8">


        {/* Filtros Avançados */}
        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          isVisible={showFilters}
          onToggleVisibility={() => setShowFilters(!showFilters)}
          onExport={handleExport}
        />

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            title="Audiência Total"
            value="2.4M"
            trend="up"
            change={12.5}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-blue-100 text-blue-800"
          />

          <MetricCard
            title="Segmentos Ativos"
            value="18"
            trend="up"
            change={3}
            icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-green-100 text-green-800"
          />

          <MetricCard
            title="Taxa de Engajamento"
            value="4.8%"
            trend="up"
            change={0.3}
            icon={<Activity className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-purple-100 text-purple-800"
          />

          <MetricCard
            title="LTV Médio"
            value="R$ 850"
            trend="up"
            change={5.2}
            icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-orange-100 text-orange-800"
          />
        </div>

        {/* Análise Demográfica */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Análise Demográfica</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os canais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os canais</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Heatmap Idade x Gênero */}
            <DemographicHeatmap 
              metric="ctr"
              className="h-64"
            />
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Distribuição Geográfica</h3>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Brasil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brasil">Brasil</SelectItem>
                    <SelectItem value="estados">Estados</SelectItem>
                    <SelectItem value="cidades">Cidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Distribuição Geográfica */}
            <GeographicDistribution 
              viewType="states"
              metric="users"
              className="h-64 overflow-y-auto"
            />
          </Card>
        </div>

        {/* Análise Comportamental */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Jornada do Cliente */}
          <CustomerJourney 
            timeRange={selectedTimeRange}
            segment={selectedSegment}
            className="h-auto"
          />

          {/* Engajamento por Horário */}
          <EngagementHeatmap 
            metric="engagement"
            timeRange={selectedTimeRange}
            className="h-auto"
          />
        </div>

        {/* Performance por Dispositivo e Análise de Coorte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Performance por Dispositivo */}
          <DevicePerformance 
            timeRange={selectedTimeRange}
            metric="users"
            className="h-auto"
          />

          {/* Análise de Coorte */}
          <CohortAnalysis 
            timeRange={selectedTimeRange}
            metric="retention"
            className="h-auto"
          />
        </div>

        {/* Seção de Segmentos Personalizados */}
        <CustomSegments className="col-span-full" />
      </div>
    </Layout>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CollapsibleCard,
  MetricCard, 
  AlertBanner,
  ProgressBar,
  StatusIndicator,
  DataTable,
  Button
} from '@/components/ui';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { MapChart } from '@/components/charts/MapChart';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as ReBarChart, Bar } from 'recharts';
import { 
  mockAlerts,
  mockAttributionData,
  mockCohortData,
  mockGeographicData,
  mockTimeAnalysis,
  mockMLPredictions,
  mockCompetitorData
} from '@/data/mockData';
import { useHydrated } from '@/hooks/useHydrated';
import { useAdvancedFilters } from '@/hooks/useAdvancedFilters';
import { AdvancedFilters } from '@/components/filters/AdvancedFilters';
import { ExportManager } from '@/components/export/ExportManager';
import { useExport } from '@/hooks/useExport';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Target,
  BarChart3,
  MapPin,
  Activity,
  RefreshCw
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  spent: number;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  platformId?: string;
  channel?: string;
  region?: string;
}

interface DailyMetric {
  id: string;
  date: string;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  channel?: string;
  region?: string;
}

interface DashboardClientProps {
  campaigns: Campaign[] | null;
  dailyMetrics: DailyMetric[] | null;
}

export function DashboardClient({ campaigns: initialCampaigns, dailyMetrics: initialDailyMetrics }: DashboardClientProps) {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(initialCampaigns);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[] | null>(initialDailyMetrics);
  const hydrated = useHydrated();
  const {
    filters,
    isFiltersVisible,
    updateFilters,
    toggleFiltersVisibility,
    filterData,
    hasActiveFilters
  } = useAdvancedFilters();

  const { exportReport } = useExport();

  useEffect(() => {
    if (campaigns) {
      setCampaigns(campaigns);
    }
    if (dailyMetrics) {
      setDailyMetrics(dailyMetrics);
    }
  }, [campaigns, dailyMetrics]);

  // Data processing and calculations previously in the component
  const revenueData = filterData(dailyMetrics || [], {
    channelField: 'channel',
    regionField: 'region'
  });

  const campaignData = filterData(campaigns || [], {
    channelField: 'channel',
    regionField: 'region'
  });

  const funnelData = [
    { stage: 'Visitantes', value: 10000 },
    { stage: 'Leads', value: 2500 },
    { stage: 'Oportunidades', value: 750 },
    { stage: 'Vendas', value: 150 }
  ];

  const hourlyData = mockTimeAnalysis.hourlyPerformance.map(hour => ({
    hour: `${hour.hour}h`,
    conversions: hour.conversions,
    revenue: hour.revenue,
    clicks: hour.clicks
  }));

  const rawGeographicData = mockGeographicData.salesByRegion.map(region => ({
    code: region.region.substring(0, 2).toUpperCase(),
    name: region.region,
    value: region.sales,
    metadata: {
      leads: region.leads,
      conversion: region.conversion
    }
  }));

  const geographicData = filterData(rawGeographicData, {
    regionField: 'name'
  });

  const totalSpent = (campaigns || []).reduce((sum: number, campaign: Campaign) => sum + campaign.spent, 0);
  const totalRevenue = (dailyMetrics || []).reduce((sum: number, metric: DailyMetric) => sum + metric.revenue, 0);
  const totalConversions = (campaigns || []).reduce((sum: number, campaign: Campaign) => sum + (campaign.metrics?.conversions || 0), 0);
  const avgROAS = totalSpent > 0 ? totalRevenue / totalSpent : 0;

  const rawCampaignTableData = (campaigns || []).map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    impressions: campaign.metrics.impressions.toLocaleString(),
    clicks: campaign.metrics.clicks.toLocaleString(),
    conversions: campaign.metrics.conversions,
    cost: `R$ ${campaign.spent.toLocaleString()}`,
    roas: `${(campaign.spent > 0 ? (campaign.spent * 2) / campaign.spent : 0).toFixed(2)}x`,
    channel: campaign.platformId || 'Meta Ads',
    region: ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'][Math.floor(Math.random() * 5)]
  }));

  const campaignTableData = filterData(rawCampaignTableData, {
    channelField: 'channel',
    regionField: 'region'
  });

  const tableColumns = [
    { key: 'name', label: 'Campanha', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'impressions', label: 'Impressões', sortable: false },
    { key: 'clicks', label: 'Cliques', sortable: false },
    { key: 'conversions', label: 'Conversões', sortable: true },
    { key: 'cost', label: 'Investimento', sortable: false },
    { key: 'roas', label: 'ROAS', sortable: false }
  ];

  if (!hydrated) {
    return (
      <Layout title="Dashboard Executivo" subtitle="Visão geral dos indicadores principais">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`Dashboard Executivo${hasActiveFilters ? ' (Filtrado)' : ''}`} 
      subtitle={hasActiveFilters ? 
        `Visão filtrada dos indicadores principais` : 
        "Visão geral dos indicadores principais"
      }
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Dados
          </Button>
          <div className="w-full sm:w-auto">
            <ExportManager onExport={exportReport} />
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 order-first sm:order-last">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      <AdvancedFilters
        filters={filters}
        onFiltersChange={updateFilters}
        isVisible={isFiltersVisible}
        onToggleVisibility={toggleFiltersVisibility}
        className="mb-4 sm:mb-6"
      />

      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        {mockAlerts.filter(alert => !alert.isRead).slice(0, 2).map(alert => (
          <AlertBanner
            key={alert.id}
            type={alert.severity === 'critical' ? 'error' : alert.severity === 'warning' ? 'warning' : 'info'}
            title={alert.title}
            message={alert.message}
            priority={alert.severity === 'critical' ? 'high' : 'medium'}
            dismissible
            renderActions={() => (
              <>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Ver Detalhes
                </Button>
                <Button variant="default" size="sm" onClick={() => {}}>
                  Resolver
                </Button>
              </>
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          title="Investimento Total"
          value={totalSpent}
          unit="R$"
          trend="up"
          change={12.5}
          icon={<TrendingUp className="h-5 w-5" />}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        />

        <MetricCard
          title="Receita Gerada"
          value={totalRevenue}
          unit="R$"
          trend="up"
          change={18.3}
          icon={<DollarSign className="h-5 w-5" />}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white"
        />

        <MetricCard
          title="Conversões"
          value={totalConversions}
          trend="up"
          change={8.7}
          icon={<Target className="h-5 w-5" />}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
        />

        <MetricCard
          title="ROAS Médio"
          value={avgROAS}
          unit="x"
          trend="down"
          change={-2.1}
          icon={<BarChart3 className="h-5 w-5" />}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card title="Meta Mensal de Receita" className="p-4 sm:p-6">
          <ProgressBar
            value={78}
            target={100}
            label={`R$ ${totalRevenue.toLocaleString('pt-BR')} / R$ 160.000`}
            variant="success"
            showTarget
            animated
          />
        </Card>
        <Card title="Meta de Conversões" className="p-4 sm:p-6">
          <ProgressBar
            value={65}
            target={100}
            label={`${totalConversions} / 1.920`}
            variant="warning"
            showTarget
            animated
          />
        </Card>
        <Card title="Eficiência de Budget" className="p-4 sm:p-6">
          <ProgressBar
            value={92}
            target={100}
            label={`R$ ${totalSpent.toLocaleString('pt-BR')} / R$ 97.000`}
            variant="success"
            showTarget
            animated
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card title="Receita dos Últimos 30 Dias" className="p-4 sm:p-6">
          <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'value' ? `R$ ${value.toLocaleString('pt-BR')}` : value,
                name === 'value' ? 'Receita' : name === 'conversions' ? 'Conversões' : 'Leads'
              ]} />
              <Area type="monotone" dataKey="value" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="conversions" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Funil de Conversão" className="p-4 sm:p-6">
          <FunnelChart
            data={funnelData}
            title="Jornada do Cliente"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card title="Performance de ROI" className="p-4 sm:p-6">
          <GaugeChart
            value={85}
            title="ROI Geral"
            unit="%"
            target={80}
          />
        </Card>
        
        <Card title="Status das APIs" className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meta Ads</span>
              <StatusIndicator status="online" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Google Analytics</span>
              <StatusIndicator status="warning" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">RD Station</span>
              <StatusIndicator status="online" size="sm" />
            </div>
          </div>
        </Card>

        <Card title="Conversões por Canal" className="p-4 sm:p-6">
          <div className="h-[250px] sm:h-[300px]">
            <ReBarChart data={campaignData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </ReBarChart>
          </div>
        </Card>

        <Card title="Resumo do Dia" className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Receita</span>
              <span className="font-semibold text-green-600">R$ 4.250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Conversões</span>
              <span className="font-semibold">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Investimento</span>
              <span className="font-semibold text-red-600">R$ 1.120</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">ROAS</span>
              <span className="font-semibold text-blue-600">3.8x</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <CollapsibleCard 
          title="Performance por Hora do Dia" 
          defaultExpanded={true}
          expandOnMobile={true}
          icon={<Activity className="h-4 w-4 text-blue-600" />}
        >
          <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
            <AreaChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="conversions" name="Conversões" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="revenue" name="Receita" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </CollapsibleCard>

        <CollapsibleCard 
          title="Análise Geográfica de Vendas" 
          defaultExpanded={true}
          expandOnMobile={true}
          icon={<MapPin className="h-4 w-4 text-green-600" />}
        >
          <MapChart data={geographicData} />
        </CollapsibleCard>
      </div>

      <Card title="Performance Detalhada das Campanhas" className="p-4 sm:p-6">
        <DataTable
          columns={tableColumns}
          data={campaignTableData}
          searchable
          paginated
        />
      </Card>
    </Layout>
  );
}
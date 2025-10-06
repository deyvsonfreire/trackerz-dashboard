'use client';

import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CollapsibleCard,
  KPICard, 
  MetricCard, 
  FeaturedMetricCard,
  AlertBanner,
  ProgressBar,
  StatusIndicator,
  DataTable,
  ExportButton,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { Heatmap } from '@/components/charts/Heatmap';
import { MapChart } from '@/components/charts/MapChart';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import { 
  mockExecutiveKPIs, 
  mockDailyMetrics, 
  mockCampaigns, 
  mockAlerts,
  mockMLPredictions,
  mockAttributionData,
  mockCohortData,
  mockGeographicData,
  mockTimeAnalysis,
  mockReports,
  mockCompetitorData
} from '@/data/mockData';
import { useHydrated } from '@/hooks/useHydrated';
import { useAdvancedFilters } from '@/hooks/useAdvancedFilters';
import { AdvancedFilters } from '@/components/filters/AdvancedFilters';
import { DrillDownChart } from '@/components/charts/DrillDownChart';
import { channelDrillDownData, regionDrillDownData, productDrillDownData } from '@/data/drillDownData';
import { ExportManager } from '@/components/export/ExportManager';
import { useExport } from '@/hooks/useExport';
import { AlertManager } from '@/components/alerts/AlertManager';
import { useAlerts } from '@/hooks/useAlerts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  Brain,
  MapPin,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Award,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

/**
 * Dashboard Executivo - Página principal com visão geral completa
 * 
 * Funcionalidades implementadas:
 * - KPIs principais e métricas de performance
 * - Alertas e notificações em tempo real
 * - Análises temporais (performance por hora/dia)
 * - Análises geográficas (vendas por região)
 * - Análise de atribuição multi-touch
 * - Análise de coorte e retenção
 * - Predições de Machine Learning
 * - Relatórios automatizados
 * - Análise competitiva
 * - Funil de conversão avançado
 * - Status das integrações
 */
export default function Home() {
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
  
  const {
    alerts,
    history,
    createAlert,
    updateAlert,
    deleteAlert,
    testAlert,
    getAlertStats
  } = useAlerts();

  // Preparar dados para os gráficos com informações de canal e região
  const rawRevenueData = [
    { name: 'Jan', value: 45000, channel: 'Meta Ads', region: 'Sudeste' },
    { name: 'Fev', value: 52000, channel: 'Google Ads', region: 'Sul' },
    { name: 'Mar', value: 48000, channel: 'Meta Ads', region: 'Nordeste' },
    { name: 'Abr', value: 61000, channel: 'LinkedIn Ads', region: 'Sudeste' },
    { name: 'Mai', value: 55000, channel: 'Google Ads', region: 'Centro-Oeste' },
    { name: 'Jun', value: 67000, channel: 'Meta Ads', region: 'Sul' }
  ];

  const rawCampaignData = [
    { name: 'Meta Ads', value: 35000, channel: 'Meta Ads', region: 'Sudeste' },
    { name: 'Google Ads', value: 28000, channel: 'Google Ads', region: 'Sul' },
    { name: 'LinkedIn', value: 15000, channel: 'LinkedIn Ads', region: 'Nordeste' },
    { name: 'TikTok', value: 12000, channel: 'TikTok Ads', region: 'Centro-Oeste' }
  ];

  // Aplicar filtros aos dados
  const revenueData = filterData(rawRevenueData, {
    channelField: 'channel',
    regionField: 'region'
  });

  const campaignData = filterData(rawCampaignData, {
    channelField: 'channel',
    regionField: 'region'
  });

  // Dados para o funil de conversão expandido
  const funnelData = [
    { stage: 'Visitantes', value: 10000 },
    { stage: 'Leads', value: 2500 },
    { stage: 'Oportunidades', value: 750 },
    { stage: 'Vendas', value: 150 }
  ];

  // Dados de atribuição para gráfico de pizza
  const attributionData = Object.entries(mockAttributionData.models.linear).map(([channel, value]) => ({
    name: channel,
    value: value,
    color: {
      'Meta Ads': '#1877F2',
      'Google Ads': '#4285F4',
      'Organic': '#34A853',
      'Direct': '#9AA0A6',
      'Email': '#EA4335'
    }[channel] || '#6B7280'
  }));

  // Dados de coorte para análise de retenção
  const cohortRetentionData = mockCohortData.acquisitionCohorts.map(cohort => ({
    cohort: cohort.cohort,
    month0: cohort.month0,
    month1: cohort.month1,
    month2: cohort.month2,
    month3: cohort.month3,
    ltv: cohort.ltv
  }));

  // Dados de performance temporal
  const hourlyData = mockTimeAnalysis.hourlyPerformance.map(hour => ({
    hour: `${hour.hour}h`,
    conversions: hour.conversions,
    revenue: hour.revenue,
    clicks: hour.clicks
  }));

  const weeklyData = mockTimeAnalysis.dayOfWeekPerformance.map(day => ({
    day: day.day,
    performance: day.performance
  }));

  // Dados geográficos com filtros aplicados
  const rawGeographicData = mockGeographicData.salesByRegion.map(region => ({
    name: region.region,
    sales: region.sales,
    leads: region.leads,
    conversion: region.conversion,
    region: region.region
  }));

  const geographicData = filterData(rawGeographicData, {
    regionField: 'region'
  });

  // Dados de predições ML
  const mlPredictionsData = mockMLPredictions.campaignPerformance.map(pred => ({
    campaign: `Campanha ${pred.campaignId}`,
    currentROAS: Math.random() * 2 + 2, // Simular ROAS atual
    predictedROAS: pred.predictedROAS,
    confidence: pred.confidence,
    recommendedBudget: pred.recommendedBudget
  }));

  // Dados de competidores
  const competitorData = mockCompetitorData.competitors.map(comp => ({
    name: comp.name,
    marketShare: comp.marketShare,
    adSpend: comp.adSpend,
    position: comp.avgPosition
  }));

  // Dados para tabela de campanhas com filtros aplicados
  const rawCampaignTableData = mockCampaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    impressions: campaign.metrics.impressions.toLocaleString(),
    clicks: campaign.metrics.clicks.toLocaleString(),
    conversions: campaign.metrics.conversions,
    cost: `R$ ${campaign.spent.toLocaleString()}`,
    roas: `${(campaign.spent > 0 ? (campaign.spent * 2) / campaign.spent : 0).toFixed(2)}x`,
    channel: campaign.platformId || 'Meta Ads', // Assumindo que platformId é o canal
    region: ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'][Math.floor(Math.random() * 5)] // Região aleatória para demo
  }));

  const campaignTableData = filterData(rawCampaignTableData, {
    channelField: 'channel',
    regionField: 'region'
  });

  // Colunas da tabela
  const tableColumns = [
    { key: 'name', label: 'Campanha', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'impressions', label: 'Impressões', sortable: false },
    { key: 'clicks', label: 'Cliques', sortable: false },
    { key: 'conversions', label: 'Conversões', sortable: true },
    { key: 'cost', label: 'Investimento', sortable: false },
    { key: 'roas', label: 'ROAS', sortable: false }
  ];

  // Calcular métricas principais
  const totalSpent = mockCampaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalRevenue = mockDailyMetrics.reduce((sum, metric) => sum + metric.revenue, 0);
  const totalConversions = mockCampaigns.reduce((sum, campaign) => sum + campaign.metrics.conversions, 0);
  const avgROAS = totalRevenue / totalSpent;
  const avgCAC = totalSpent / totalConversions;

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
      {/* Header com ações rápidas */}
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

      {/* Filtros Avançados */}
      <AdvancedFilters
        filters={filters}
        onFiltersChange={updateFilters}
        isVisible={isFiltersVisible}
        onToggleVisibility={toggleFiltersVisibility}
        className="mb-4 sm:mb-6"
      />

      {/* Alertas Importantes */}
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        {mockAlerts.filter(alert => !alert.isRead).slice(0, 2).map(alert => (
          <AlertBanner
            key={alert.id}
            type={alert.severity === 'critical' ? 'error' : alert.severity === 'warning' ? 'warning' : 'info'}
            title={alert.title}
            message={alert.message}
            priority={alert.severity === 'critical' ? 'high' : 'medium'}
            dismissible
            actions={[
              { label: 'Ver Detalhes', onClick: () => console.log('Ver detalhes', alert.id) },
              { label: 'Resolver', onClick: () => console.log('Resolver', alert.id) }
            ]}
          />
        ))}
      </div>

      {/* KPIs Principais */}
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

      {/* Progresso das Metas */}
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

      {/* Gráficos Principais */}
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

      {/* Indicadores de Performance */}
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
            <BarChart 
              data={campaignData}
              dataKey="value"
              xAxisKey="name"
              height={250}
            />
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

      {/* Análises Avançadas */}
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
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="conversions" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CollapsibleCard>

        <CollapsibleCard 
          title="Vendas por Região" 
          defaultExpanded={true}
          expandOnMobile={true}
          icon={<MapPin className="h-4 w-4 text-green-600" />}
        >
          <BarChart 
            data={geographicData} 
            dataKey="sales" 
            xAxisKey="name"
            height={250}
          />
        </CollapsibleCard>
      </div>

      {/* Análise de Atribuição e ML */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card title="Análise Preditiva de ROAS" className="p-4 sm:p-6">
          <BarChart 
            data={[
              { name: 'Campanha A', value: 4.2 },
              { name: 'Campanha B', value: 3.8 },
              { name: 'Campanha C', value: 5.1 },
              { name: 'Campanha D', value: 2.9 }
            ]}
            dataKey="value" 
            xAxisKey="name"
            height={250}
          />
        </Card>

        <Card title="Campanhas Ativas" className="p-4 sm:p-6">
          <ExportButton 
            data={campaignTableData}
            filename="campanhas-ativas"
            formats={['csv', 'xlsx']}
            onExport={(format) => console.log(`Exportando em ${format}`)}
          />
          
          <DataTable
            data={campaignTableData}
            columns={tableColumns}
            searchable={true}
            pageSize={10}
            paginated={true}
          />
        </Card>
      </div>

      {/* Análises com Drill-Down */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          Análises Interativas com Drill-Down
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <CollapsibleCard 
            title="Performance por Canal" 
            defaultExpanded={false}
            expandOnMobile={true}
            icon={<BarChart3 className="h-4 w-4 text-blue-600" />}
          >
            <DrillDownChart
              data={channelDrillDownData}
              config={{
                title: "Receita por Canal de Marketing",
                type: 'bar',
                dataKey: 'value',
                nameKey: 'name',
                formatValue: (value) => `R$ ${value.toLocaleString('pt-BR')}`
              }}
            />
          </CollapsibleCard>

          <CollapsibleCard 
            title="Vendas por Região" 
            defaultExpanded={false}
            expandOnMobile={true}
            icon={<MapPin className="h-4 w-4 text-green-600" />}
          >
            <DrillDownChart
              data={regionDrillDownData}
              config={{
                title: "Distribuição Geográfica",
                type: 'pie',
                dataKey: 'value',
                nameKey: 'name',
                formatValue: (value: number) => `R$ ${value.toLocaleString('pt-BR')}`
              }}
            />
          </CollapsibleCard>

          <CollapsibleCard 
            title="Performance por Produto" 
            defaultExpanded={false}
            expandOnMobile={true}
            icon={<Award className="h-4 w-4 text-purple-600" />}
          >
            <DrillDownChart
              data={productDrillDownData}
              config={{
                title: "Vendas por Categoria",
                type: 'line',
                dataKey: 'value',
                nameKey: 'name',
                formatValue: (value: number) => `R$ ${value.toLocaleString('pt-BR')}`
              }}
            />
          </CollapsibleCard>
        </div>
      </div>

      {/* Sistema de Alertas Personalizados */}
      <div className="mb-6 sm:mb-8">
        <AlertManager
          alerts={alerts}
          history={history}
          onCreateAlert={createAlert}
          onUpdateAlert={updateAlert}
          onDeleteAlert={deleteAlert}
          onTestAlert={testAlert}
        />
      </div>

      {/* Sistema de Exportação Avançada */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          <Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          Exportação de Relatórios
        </h2>
        
        <Card className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Gerar Relatórios Personalizados</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Configure e exporte relatórios detalhados em PDF ou Excel com gráficos, tabelas e análises personalizadas.
            </p>
          </div>
          
          <ExportManager onExport={exportReport} />
        </Card>
      </div>

    </Layout>
  );
}

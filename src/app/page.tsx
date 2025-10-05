'use client';

import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
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

  // Preparar dados para os gráficos
  const revenueData = mockDailyMetrics.map(metric => ({
    name: new Date(metric.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    value: metric.revenue,
    conversions: metric.conversions,
    leads: metric.leads
  }));

  const campaignData = mockCampaigns.map(campaign => ({
    name: campaign.name.substring(0, 15) + '...',
    value: campaign.metrics.conversions,
    roas: campaign.metrics.roas,
    cost: campaign.metrics.cost
  }));

  // Dados para o funil de conversão expandido
  const funnelData = [
    { name: 'Visitantes', value: 10000, color: '#3B82F6', percentage: 100 },
    { name: 'Leads', value: 2500, color: '#10B981', percentage: 25 },
    { name: 'Qualificados', value: 1200, color: '#F59E0B', percentage: 12 },
    { name: 'Oportunidades', value: 800, color: '#EF4444', percentage: 8 },
    { name: 'Propostas', value: 400, color: '#8B5CF6', percentage: 4 },
    { name: 'Vendas', value: 150, color: '#06B6D4', percentage: 1.5 },
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

  // Dados geográficos
  const geographicData = mockGeographicData.salesByRegion.map(region => ({
    name: region.region,
    sales: region.sales,
    leads: region.leads,
    conversion: region.conversion
  }));

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

  // Dados para tabela de campanhas
  const campaignTableData = mockCampaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    impressions: campaign.metrics.impressions.toLocaleString(),
    clicks: campaign.metrics.clicks.toLocaleString(),
    conversions: campaign.metrics.conversions,
    cost: `R$ ${campaign.metrics.cost.toLocaleString()}`,
    roas: `${campaign.metrics.roas.toFixed(2)}x`,
  }));

  const tableColumns = [
    { key: 'name', label: 'Campanha', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'impressions', label: 'Impressões', sortable: true },
    { key: 'clicks', label: 'Clicks', sortable: true },
    { key: 'conversions', label: 'Conversões', sortable: true },
    { key: 'cost', label: 'Investimento', sortable: true },
    { key: 'roas', label: 'ROAS', sortable: true },
  ];

  // Calcular métricas principais
  const totalRevenue = mockDailyMetrics.reduce((sum, metric) => sum + metric.revenue, 0);
  const totalConversions = mockDailyMetrics.reduce((sum, metric) => sum + metric.conversions, 0);
  const totalSpend = mockCampaigns.reduce((sum, campaign) => sum + campaign.metrics.cost, 0);
  const avgROAS = totalRevenue / totalSpend;

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
    <Layout title="Dashboard Executivo" subtitle="Visão geral dos indicadores principais">
      {/* Header com ações rápidas */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Dados
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Alertas Importantes */}
      <div className="mb-6 space-y-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <FeaturedMetricCard
          title="Receita Total"
          value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`}
          trend={{ direction: 'up', percentage: 12.5 }}
          comparison={{ period: 'vs mês anterior', value: `R$ ${(totalRevenue * 0.9).toLocaleString('pt-BR')}` }}
          status="success"
          size="lg"
        />
        <MetricCard
          title="Conversões"
          value={totalConversions.toString()}
          trend={{ direction: 'up', percentage: 8.3 }}
          status="success"
        />
        <MetricCard
          title="ROAS Médio"
          value={`${avgROAS.toFixed(1)}x`}
          trend={{ direction: avgROAS > 4 ? 'up' : 'down', percentage: 2.1 }}
          status={avgROAS > 4 ? 'success' : 'warning'}
        />
        <MetricCard
          title="CAC Médio"
          value={`R$ ${(totalSpend / totalConversions).toFixed(0)}`}
          trend={{ direction: 'down', percentage: 5.7 }}
          status="success"
        />
      </div>

      {/* Progresso das Metas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Meta Mensal de Receita" className="p-6">
          <ProgressBar
            value={78}
            target={100}
            label={`R$ ${totalRevenue.toLocaleString('pt-BR')} / R$ 160.000`}
            variant="success"
            showTarget
            animated
          />
        </Card>
        <Card title="Meta de Conversões" className="p-6">
          <ProgressBar
            value={65}
            target={100}
            label={`${totalConversions} / 1.920`}
            variant="warning"
            showTarget
            animated
          />
        </Card>
        <Card title="Eficiência de Budget" className="p-6">
          <ProgressBar
            value={92}
            target={100}
            label={`R$ ${totalSpend.toLocaleString('pt-BR')} / R$ 97.000`}
            variant="success"
            showTarget
            animated
          />
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Receita dos Últimos 30 Dias" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
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

        <Card title="Funil de Conversão Avançado" className="p-6">
          <FunnelChart 
            data={funnelData}
            height={300}
          />
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-blue-600">Taxa de Conversão</div>
              <div className="text-2xl font-bold">1.5%</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-600">Qualificação</div>
              <div className="text-2xl font-bold">48%</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-600">Fechamento</div>
              <div className="text-2xl font-bold">37.5%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Indicadores de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="ROAS Atual" className="p-6 text-center">
          <GaugeChart
            value={avgROAS}
            min={0}
            max={10}
            label="ROAS"
            color="#10B981"
            height={200}
          />
        </Card>
        
        <Card title="Status das APIs" className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Google Ads</span>
              <StatusIndicator type="online" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meta Ads</span>
              <StatusIndicator type="online" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Google Analytics</span>
              <StatusIndicator type="warning" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">RD Station</span>
              <StatusIndicator type="online" size="sm" />
            </div>
          </div>
        </Card>

        <Card title="Conversões por Canal" className="p-6">
          <BarChart 
            data={campaignData} 
            dataKey="value" 
            color="#3B82F6"
            height={200}
          />
        </Card>

        <Card title="Resumo do Dia" className="p-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Performance por Hora do Dia" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="conversions" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Vendas por Região" className="p-6">
          <BarChart 
            data={geographicData} 
            dataKey="sales" 
            xAxisKey="name"
            color="#10B981"
            height={300}
          />
        </Card>
      </div>

      {/* Análise de Atribuição e ML */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Atribuição por Canal" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Predições de ROAS (ML)" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mlPredictionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="currentROAS" fill="#94A3B8" name="ROAS Atual" />
              <Bar dataKey="predictedROAS" fill="#10B981" name="ROAS Previsto" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tabela de Campanhas */}
      <Card title="Campanhas Ativas" className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Mostrando {campaignTableData.length} campanhas ativas
          </p>
          <ExportButton
            data={campaignTableData}
            filename="campanhas-ativas"
            formats={['csv', 'xlsx']}
          />
        </div>
        <DataTable
          data={campaignTableData}
          columns={tableColumns}
          searchable
          sortable
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </Layout>
  );
}

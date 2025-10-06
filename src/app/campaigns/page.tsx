'use client';

import React, { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  MetricCard, 
  DataTable, 
  DataTableColumn,
  AlertBanner,
  StatusIndicator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';
import { LineChart, BarChart } from '@/components/charts';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line
} from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, MousePointer } from 'lucide-react';
import { mockCampaigns, mockDailyMetrics } from '@/data/mockData';
import { Campaign } from '@/types';
import { useHydrated } from '@/hooks/useHydrated';

/**
 * Dashboard de Performance de Campanhas
 * Exibe métricas detalhadas, gráficos interativos e análises de ROI
 */
export default function CampaignsPage() {
  const isHydrated = useHydrated();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter(campaign => {
      if (selectedPlatform === 'all') {
        return true;
      }
      return campaign.platformId === selectedPlatform;
    });
  }, [selectedPlatform]);

  const tableData = useMemo(() => filteredCampaigns.map(campaign => {
    const ctr = ((campaign.metrics.clicks / campaign.metrics.impressions) * 100);
    const cpc = (campaign.budget / campaign.metrics.clicks);
    return {
      ...campaign,
      impressions: campaign.metrics.impressions,
      clicks: campaign.metrics.clicks,
      conversions: campaign.metrics.conversions,
      ctr: isNaN(ctr) ? 0 : ctr,
      cpc: isNaN(cpc) ? 0 : cpc,
    }
  }), [filteredCampaigns]);

  if (!isHydrated) {
    return (
      <Layout title="Performance de Campanhas" subtitle="Análise detalhada de métricas e ROI">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  // Dados para gráficos
  const performanceData = mockDailyMetrics.map((metric, index) => ({
    date: `${index + 1}/01`,
    impressions: metric.impressions,
    clicks: metric.clicks,
    conversions: metric.conversions,
    cost: metric.spend,
    ctr: ((metric.clicks / metric.impressions) * 100).toFixed(2),
    cpc: (metric.spend / metric.clicks).toFixed(2),
    roas: ((metric.conversions * 50) / metric.spend).toFixed(2)
  }));

  const campaignsByPlatform = mockCampaigns.reduce((acc, campaign) => {
    const platform = campaign.platformId;
    if (!acc[platform]) {
      acc[platform] = { name: platform, value: 0, campaigns: 0 };
    }
    acc[platform].value += campaign.metrics.conversions;
    acc[platform].campaigns += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number; campaigns: number }>);

  const platformData = Object.values(campaignsByPlatform);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Métricas gerais
  const totalImpressions = mockDailyMetrics.reduce((sum, metric) => sum + metric.impressions, 0);
  const totalClicks = mockDailyMetrics.reduce((sum, metric) => sum + metric.clicks, 0);
  const totalConversions = mockDailyMetrics.reduce((sum, metric) => sum + metric.conversions, 0);
  const totalCost = mockDailyMetrics.reduce((sum, metric) => sum + metric.spend, 0);
  const avgCTR = ((totalClicks / totalImpressions) * 100).toFixed(2);
  const avgCPC = (totalCost / totalClicks).toFixed(2);
  const totalROAS = ((totalConversions * 50) / totalCost).toFixed(2);

  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;

  const columns: DataTableColumn<any>[] = [
    { key: 'name', label: 'Campanha', sortable: true, filterable: true, width: '25%' },
    { key: 'platformId', label: 'Plataforma', sortable: true, filterable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (status) => {
        const statusMap: { [key: string]: 'success' | 'warning' | 'error' | 'active' } = {
          active: 'active',
          paused: 'warning',
          ended: 'error',
        };
        const statusLabelMap: { [key: string]: string } = {
          active: 'Ativa',
          paused: 'Pausada',
          ended: 'Finalizada',
        };
        return <StatusIndicator status={statusMap[status as string]} label={statusLabelMap[status as string]} />;
      }
    },
    { key: 'impressions', label: 'Impressões', sortable: true, align: 'right', render: (val) => (val as number).toLocaleString() },
    { key: 'clicks', label: 'Cliques', sortable: true, align: 'right', render: (val) => (val as number).toLocaleString() },
    { key: 'conversions', label: 'Conversões', sortable: true, align: 'right' },
    { key: 'ctr', label: 'CTR', sortable: true, align: 'right', render: (val) => `${(val as number).toFixed(2)}%` },
    { key: 'cpc', label: 'CPC', sortable: true, align: 'right', render: (val) => `R$ ${(val as number).toFixed(2)}` },
  ];

  return (
    <Layout title="Performance de Campanhas" subtitle="Análise detalhada de métricas e ROI">
      <div className="space-y-6">
        <div className="flex flex-wrap justify-end gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Plataformas</SelectItem>
                <SelectItem value="Meta Ads">Meta Ads</SelectItem>
                <SelectItem value="Google Ads">Google Ads</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

        {/* Alertas de Performance */}
        <AlertBanner
          type="metric"
          priority="medium"
          title="Meta de ROAS Atingida!"
          message="Suas campanhas estão performando acima da meta estabelecida"
          metricValue={totalROAS}
          metricChange={18.5}
          metricUnit="x"
          dismissible={true}
        />

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Campanhas Ativas"
            value={activeCampaigns}
            icon={<Target className="w-6 h-6" />}
            trend="up"
            change={12}
            status="info"
            comparisonLabel="vs mês anterior"
          />

          <MetricCard
            title="CTR Médio"
            value={`${avgCTR}%`}
            icon={<MousePointer className="w-6 h-6" />}
            trend="up"
            change={0.8}
            status="success"
            comparisonLabel="vs mês anterior"
          />

          <MetricCard
            title="CPC Médio"
            value={`R$ ${avgCPC}`}
            icon={<DollarSign className="w-6 h-6" />}
            trend="down"
            change={5.2}
            status="warning"
            comparisonLabel="vs mês anterior"
            description="Redução no custo por clique"
          />

          <MetricCard
            title="ROAS"
            value={`${totalROAS}x`}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="up"
            change={18.5}
            status="success"
            comparisonLabel="vs mês anterior"
            description="Retorno sobre investimento"
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance ao Longo do Tempo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance ao Longo do Tempo</h3>
            <LineChart 
              data={performanceData}
              dataKey="impressions"
              xAxisKey="date"
              color="#3B82F6"
              height={300}
            />
          </Card>

          {/* Distribuição por Plataforma */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversões por Plataforma</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Métricas Detalhadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CTR e CPC */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CTR e CPC por Dia</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ctr" fill="#3B82F6" name="CTR (%)" />
                <Bar dataKey="cpc" fill="#10B981" name="CPC (R$)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card>

          {/* ROAS */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ROAS por Dia</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="roas" stroke="#8B5CF6" strokeWidth={3} name="ROAS" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Lista de Campanhas */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campanhas Ativas</h3>
          <DataTable
            columns={columns}
            data={tableData}
            searchable
            paginated
            exportable
            onRowClick={(row) => setSelectedCampaign(row as Campaign)}
            emptyMessage="Nenhuma campanha encontrada."
            searchPlaceholder="Buscar por nome ou plataforma..."
          />
        </Card>

        {/* Modal de Detalhes da Campanha */}
        {selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{selectedCampaign.name}</h3>
                  <button 
                    onClick={() => setSelectedCampaign(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Plataforma</p>
                    <p className="font-medium">{selectedCampaign.platformId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{selectedCampaign.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Orçamento</p>
                    <p className="font-medium">R$ {selectedCampaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Período</p>
                    <p className="font-medium">{selectedCampaign.startDate.toLocaleDateString()} - {selectedCampaign.endDate.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{selectedCampaign.metrics.impressions.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Impressões</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{selectedCampaign.metrics.clicks.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Cliques</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{selectedCampaign.metrics.conversions}</p>
                    <p className="text-sm text-gray-600">Conversões</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
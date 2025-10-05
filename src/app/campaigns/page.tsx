'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  MetricCard, 
  DataTable, 
  ExportButton, 
  FilterPanel,
  AlertBanner,
  StatusIndicator 
} from '@/components/ui';
import { LineChart, BarChart } from '@/components/charts';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, Eye, MousePointer, Calendar, Filter, Download } from 'lucide-react';
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

  if (!isHydrated) {
    return <div>Carregando...</div>;
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

  return (
    <Layout title="Performance de Campanhas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance de Campanhas</h1>
            <p className="text-gray-600 mt-1">Análise detalhada de métricas e ROI</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </select>
            
            <select 
              value={selectedPlatform} 
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as Plataformas</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
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
            trendValue={12}
            comparison="vs mês anterior"
            variant="primary"
          />

          <MetricCard
            title="CTR Médio"
            value={`${avgCTR}%`}
            icon={<MousePointer className="w-6 h-6" />}
            trend="up"
            trendValue={0.8}
            comparison="vs mês anterior"
            variant="success"
          />

          <MetricCard
            title="CPC Médio"
            value={`R$ ${avgCPC}`}
            icon={<DollarSign className="w-6 h-6" />}
            trend="down"
            trendValue={5.2}
            comparison="vs mês anterior"
            variant="warning"
            description="Redução no custo por clique"
          />

          <MetricCard
            title="ROAS"
            value={`${totalROAS}x`}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="up"
            trendValue={18.5}
            comparison="vs mês anterior"
            variant="success"
            target={3.5}
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
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ctr" fill="#3B82F6" name="CTR (%)" />
                <Bar dataKey="cpc" fill="#10B981" name="CPC (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* ROAS */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ROAS por Dia</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="roas" stroke="#8B5CF6" strokeWidth={3} name="ROAS" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Lista de Campanhas */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campanhas Ativas</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campanha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plataforma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressões
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliques
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversões
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPC
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCampaigns.map((campaign) => {
                  const ctr = ((campaign.metrics.clicks / campaign.metrics.impressions) * 100).toFixed(2);
                  const cpc = (campaign.budget / campaign.metrics.clicks).toFixed(2);
                  
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCampaign(campaign)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{campaign.platformId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : campaign.status === 'paused'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {campaign.status === 'active' ? 'Ativa' : campaign.status === 'paused' ? 'Pausada' : 'Finalizada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.impressions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.clicks.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.conversions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ctr}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        R$ {cpc}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
import { supabase } from '@/lib/supabase';
import { DashboardClient } from './DashboardClient';

export const revalidate = 60; // Revalida a cada 60 segundos

// Dados mock para fallback
const mockCampaigns = [
  {
    id: '1',
    name: 'Campanha Google Ads - Vendas',
    status: 'active',
    spent: 15000,
    metrics: {
      impressions: 125000,
      clicks: 3500,
      conversions: 85
    },
    channel: 'Google Ads',
    region: 'São Paulo'
  },
  {
    id: '2',
    name: 'Meta Ads - Awareness',
    status: 'active',
    spent: 8500,
    metrics: {
      impressions: 89000,
      clicks: 2100,
      conversions: 42
    },
    channel: 'Meta Ads',
    region: 'Rio de Janeiro'
  }
];

const mockDailyMetrics = [
  {
    id: '1',
    date: '2024-01-15',
    revenue: 25000,
    impressions: 50000,
    clicks: 1500,
    conversions: 35,
    channel: 'Google Ads',
    region: 'São Paulo'
  },
  {
    id: '2',
    date: '2024-01-16',
    revenue: 18000,
    impressions: 42000,
    clicks: 1200,
    conversions: 28,
    channel: 'Meta Ads',
    region: 'Rio de Janeiro'
  }
];

async function fetchData() {
  try {
    const campaignsData = await supabase
      .from('campaigns')
      .select('*, accounts(*, platforms(name))');
    const metricsData = await supabase
      .from('daily_performance_metrics')
      .select('*, campaigns(*, accounts(*, platforms(name)))');

    if (campaignsData.error || metricsData.error) {
      console.warn('Erro ao conectar com Supabase, usando dados mock');
      return {
        campaigns: mockCampaigns,
        dailyMetrics: mockDailyMetrics,
      };
    }

    return {
      campaigns: campaignsData.data || mockCampaigns,
      dailyMetrics: metricsData.data || mockDailyMetrics,
    };
  } catch (error) {
    console.warn('Erro de conexão, usando dados mock:', error);
    return {
      campaigns: mockCampaigns,
      dailyMetrics: mockDailyMetrics,
    };
  }
}

export default async function DashboardPage() {
  const { campaigns, dailyMetrics } = await fetchData();

  return <DashboardClient campaigns={campaigns} dailyMetrics={dailyMetrics} />;
}
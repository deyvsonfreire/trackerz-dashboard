import MetaClient from './client';

interface AdInsight {
  id: number;
  date: string;
  spend: number;
  roas: number;
}

async function getAdInsights(): Promise<AdInsight[]> {
  const res = await fetch('http://localhost:4017/api/meta/ad-insights');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function MetaPage() {
  const adInsights = await getAdInsights();

  return <MetaClient adInsights={adInsights} />;
}
import GoogleAnalyticsClient from './client';

interface AnalyticsData {
  id: number;
  name: string;
  value: number;
  date: string;
}

async function getAnalytics(): Promise<AnalyticsData[]> {
  const res = await fetch('http://localhost:4017/api/google/analytics');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function GoogleAnalyticsPage() {
  const analytics = await getAnalytics();

  return <GoogleAnalyticsClient analytics={analytics} />;
}
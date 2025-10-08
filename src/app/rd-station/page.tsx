import RDStationClient from './client';

interface Deal {
  id: number;
  name: string;
  amount: number;
  stage: string;
  owner: string;
  expected_close_date: string;
}

async function getDeals(): Promise<Deal[]> {
  const res = await fetch('http://localhost:4017/api/rd-station/deals');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function RDStationPage() {
  const deals = await getDeals();

  return <RDStationClient deals={deals} />;
}
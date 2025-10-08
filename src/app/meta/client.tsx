'use client';

import { InteractiveTable } from '@/components/ui/InteractiveTable';
import { Title, Text, Card, AreaChart } from '@tremor/react';

interface AdInsight {
  id: number;
  date: string;
  spend: number;
  roas: number;
}

interface MetaClientProps {
  adInsights: AdInsight[];
}

export default function MetaClient({ adInsights }: MetaClientProps) {
  const chartData = adInsights.reduce((acc, insight) => {
    const date = new Date(insight.date).toLocaleDateString();
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.spend += insight.spend;
      existingEntry.roas += insight.roas;
    } else {
      acc.push({ date, spend: insight.spend, roas: insight.roas });
    }
    return acc;
  }, [] as { date: string; spend: number; roas: number }[]);

  const columns = [
    { header: 'Date', accessor: 'date' as const },
    { header: 'Spend', accessor: 'spend' as const },
    { header: 'ROAS', accessor: 'roas' as const },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Meta Ad Insights</Title>
      <Text>A list of ad insights from the Meta API.</Text>
      <Card className="mt-6">
        <Title>Spend and ROAS Over Time</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={['spend', 'roas']}
          colors={['blue', 'green']}
          yAxisWidth={60}
        />
      </Card>
      <Card className="mt-6">
        <InteractiveTable data={adInsights} columns={columns} />
      </Card>
    </main>
  );
}
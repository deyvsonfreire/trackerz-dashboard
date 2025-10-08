'use client';

import { InteractiveTable } from '@/components/ui/InteractiveTable';
import { Title, Text, Card, AreaChart } from '@tremor/react';

interface AnalyticsData {
  id: number;
  name: string;
  value: number;
  date: string;
}

interface GoogleAnalyticsClientProps {
  analytics: AnalyticsData[];
}

export default function GoogleAnalyticsClient({ analytics }: GoogleAnalyticsClientProps) {
  const chartData = analytics.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.value += item.value;
    } else {
      acc.push({ date, value: item.value });
    }
    return acc;
  }, [] as { date: string; value: number }[]);

  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Value', accessor: 'value' as const },
    { header: 'Date', accessor: 'date' as const },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Google Analytics</Title>
      <Text>A list of analytics from the Google Analytics API.</Text>
      <Card className="mt-6">
        <Title>Value Over Time</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={['value']}
          colors={['blue']}
          yAxisWidth={60}
        />
      </Card>
      <Card className="mt-6">
        <InteractiveTable data={analytics} columns={columns} />
      </Card>
    </main>
  );
}
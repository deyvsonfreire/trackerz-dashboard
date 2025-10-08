'use client';

import { InteractiveTable } from '@/components/ui/InteractiveTable';
import { Title, Text, Card, AreaChart } from '@tremor/react';

interface Deal {
  id: number;
  name: string;
  amount: number;
  stage: string;
  owner: string;
  expected_close_date: string;
}

interface RDStationClientProps {
  deals: Deal[];
}

export default function RDStationClient({ deals }: RDStationClientProps) {
  const chartData = deals.reduce((acc, deal) => {
    const date = new Date(deal.expected_close_date).toLocaleDateString();
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.amount += deal.amount;
    } else {
      acc.push({ date, amount: deal.amount });
    }
    return acc;
  }, [] as { date: string; amount: number }[]);

  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Amount', accessor: 'amount' as const },
    { header: 'Stage', accessor: 'stage' as const },
    { header: 'Owner', accessor: 'owner' as const },
    { header: 'Expected Close Date', accessor: 'expected_close_date' as const },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>RD Station CRM Deals</Title>
      <Text>A list of deals from the RD Station CRM API.</Text>
      <Card className="mt-6">
        <Title>Deal Amount Over Time</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={['amount']}
          colors={['blue']}
          yAxisWidth={60}
        />
      </Card>
      <Card className="mt-6">
        <InteractiveTable data={deals} columns={columns} />
      </Card>
    </main>
  );
}
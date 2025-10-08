'use client';

import { InteractiveTable } from '@/components/ui/InteractiveTable';
import { Title, Text, Card, AreaChart } from '@tremor/react';

interface CallRecord {
  id: number;
  call_id: string;
  caller_number: string;
  destination_number: string;
  call_duration: number;
  call_date: string;
  call_time: string;
  call_status: string;
  recording_url: string;
}

interface C3CXClientProps {
  callRecords: CallRecord[];
}

export default function C3CXClient({ callRecords }: C3CXClientProps) {
  const chartData = callRecords.reduce((acc, record) => {
    const date = new Date(record.call_date).toLocaleDateString();
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.calls += 1;
    } else {
      acc.push({ date, calls: 1 });
    }
    return acc;
  }, [] as { date: string; calls: number }[]);

  const columns = [
    { header: 'Caller Number', accessor: 'caller_number' as const },
    { header: 'Destination Number', accessor: 'destination_number' as const },
    { header: 'Duration', accessor: 'call_duration' as const },
    { header: 'Date', accessor: 'call_date' as const },
    { header: 'Time', accessor: 'call_time' as const },
    { header: 'Status', accessor: 'call_status' as const },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>3CX Call Records</Title>
      <Text>A list of call records from the 3CX API.</Text>
      <Card className="mt-6">
        <Title>Call Volume Over Time</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={['calls']}
          colors={['blue']}
          yAxisWidth={60}
        />
      </Card>
      <Card className="mt-6">
        <InteractiveTable data={callRecords} columns={columns} />
      </Card>
    </main>
  );
}
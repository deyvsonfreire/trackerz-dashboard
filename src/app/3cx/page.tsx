import C3CXClient from './client';

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

async function getCallRecords(): Promise<CallRecord[]> {
  const res = await fetch('http://localhost:4017/api/3cx');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function C3CXPage() {
  const callRecords = await getCallRecords();

  return <C3CXClient callRecords={callRecords} />;
}
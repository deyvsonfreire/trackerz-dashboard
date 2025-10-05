'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types';

interface LineChartProps {
  data: ChartData[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
}

/**
 * Line chart component using Recharts
 * @param data - Array of chart data points
 * @param dataKey - Key for the Y-axis data
 * @param xAxisKey - Key for the X-axis data (defaults to 'name')
 * @param color - Line color (defaults to blue)
 * @param height - Chart height in pixels (defaults to 300)
 * @param showGrid - Whether to show grid lines (defaults to true)
 */
export function LineChart({ 
  data, 
  dataKey, 
  xAxisKey = 'name', 
  color = '#3B82F6',
  height = 300,
  showGrid = true 
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
        <XAxis 
          dataKey={xAxisKey} 
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}K`;
            }
            return value.toString();
          }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value: number | string) => {
            if (typeof value === 'number') {
              return [value.toLocaleString(), dataKey];
            }
            return [value, dataKey];
          }}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
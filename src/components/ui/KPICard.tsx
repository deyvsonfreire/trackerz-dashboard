import { TrendingUp, TrendingDown, DollarSign, Users, Target, Activity } from 'lucide-react';
import type { KPI } from '@/types';

interface KPICardProps {
  kpi: KPI;
  className?: string;
}

/**
 * Formats a numeric value with appropriate units and decimal places
 * @param value - The numeric value to format
 * @param unit - The unit to append (e.g., 'R$', '%', '')
 * @returns Formatted string
 */
function formatValue(value: number, unit: string): string {
  if (unit === 'R$') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  if (unit === '%') {
    return `${value.toFixed(1)}%`;
  }
  
  if (value >= 1000) {
    return new Intl.NumberFormat('pt-BR').format(value);
  }
  
  return value.toString();
}

/**
 * Gets the appropriate icon for a KPI based on its name
 * @param name - The KPI name
 * @returns React icon component
 */
function getKPIIcon(name: string) {
  const iconName = name.toLowerCase();
  
  if (iconName.includes('receita') || iconName.includes('revenue')) {
    return DollarSign;
  }
  if (iconName.includes('leads') || iconName.includes('usuários')) {
    return Users;
  }
  if (iconName.includes('conversão') || iconName.includes('conversion')) {
    return Target;
  }
  if (iconName.includes('engajamento') || iconName.includes('engagement')) {
    return Activity;
  }
  
  return Activity;
}

/**
 * KPICard component for displaying key performance indicators
 * @param kpi - The KPI data to display
 * @param className - Additional CSS classes
 */
export function KPICard({ kpi, className }: KPICardProps) {
  const Icon = getKPIIcon(kpi.name);
  const isPositive = kpi.changeType === 'increase';
  const ChangeIcon = isPositive ? TrendingUp : TrendingDown;
  
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBgColor = isPositive ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{kpi.name}</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(kpi.value, kpi.unit)}
            </p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${changeBgColor}`}>
          <ChangeIcon className={`h-4 w-4 ${changeColor}`} />
          <span className={`text-sm font-medium ${changeColor}`}>
            {Math.abs(kpi.change).toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Meta: {formatValue(kpi.target, kpi.unit)}</span>
          <span>
            {kpi.value >= kpi.target ? '✅ Meta atingida' : '⚠️ Abaixo da meta'}
          </span>
        </div>
        
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              kpi.value >= kpi.target ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ 
              width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
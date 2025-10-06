'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Alert, AlertDescription, AlertTitle, MetricCard } from '@/components/ui';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Target,
  Bell,
  Settings,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { useHydrated } from '@/hooks/useHydrated';
import { Layout } from '@/components/layout/Layout';

/**
 * Interface para dados de orçamento
 */
interface BudgetData {
  id: string;
  name: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentage: number;
  status: 'safe' | 'warning' | 'danger' | 'exceeded';
  period: string;
  lastUpdated: string;
}

/**
 * Interface para alertas de orçamento
 */
interface BudgetAlert {
  id: string;
  budgetId: string;
  budgetName: string;
  type: 'threshold' | 'exceeded' | 'projection';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

/**
 * Página do Dashboard de Budget Alerts
 * 
 * Funcionalidades:
 * - Monitoramento de orçamentos em tempo real
 * - Alertas automáticos por limites
 * - Projeções de gastos
 * - Análise de tendências
 * - Gestão de alertas
 */
export default function BudgetAlertsPage() {
  const isHydrated = useHydrated();
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [alertFilter, setAlertFilter] = useState('all');

  // Mock data para orçamentos
  const budgetData: BudgetData[] = [
    {
      id: '1',
      name: 'Google Ads - Campanhas de Busca',
      category: 'Paid Media',
      budgetAmount: 15000,
      spentAmount: 13500,
      remainingAmount: 1500,
      percentage: 90,
      status: 'danger',
      period: 'Janeiro 2024',
      lastUpdated: '2024-01-25T10:30:00Z'
    },
    {
      id: '2',
      name: 'Meta Ads - Facebook & Instagram',
      category: 'Social Media',
      budgetAmount: 12000,
      spentAmount: 8400,
      remainingAmount: 3600,
      percentage: 70,
      status: 'warning',
      period: 'Janeiro 2024',
      lastUpdated: '2024-01-25T09:15:00Z'
    },
    {
      id: '3',
      name: 'LinkedIn Ads - B2B',
      category: 'Professional',
      budgetAmount: 8000,
      spentAmount: 4800,
      remainingAmount: 3200,
      percentage: 60,
      status: 'safe',
      period: 'Janeiro 2024',
      lastUpdated: '2024-01-25T08:45:00Z'
    },
    {
      id: '4',
      name: 'YouTube Ads - Video Marketing',
      category: 'Video',
      budgetAmount: 10000,
      spentAmount: 10500,
      remainingAmount: -500,
      percentage: 105,
      status: 'exceeded',
      period: 'Janeiro 2024',
      lastUpdated: '2024-01-25T11:00:00Z'
    }
  ];

  // Mock data para alertas
  const budgetAlerts: BudgetAlert[] = [
    {
      id: '1',
      budgetId: '4',
      budgetName: 'YouTube Ads - Video Marketing',
      type: 'exceeded',
      severity: 'critical',
      message: 'Orçamento excedido em R$ 500,00 (5%)',
      timestamp: '2024-01-25T11:00:00Z',
      acknowledged: false
    },
    {
      id: '2',
      budgetId: '1',
      budgetName: 'Google Ads - Campanhas de Busca',
      type: 'threshold',
      severity: 'high',
      message: 'Atingiu 90% do orçamento mensal',
      timestamp: '2024-01-25T10:30:00Z',
      acknowledged: false
    },
    {
      id: '3',
      budgetId: '2',
      budgetName: 'Meta Ads - Facebook & Instagram',
      type: 'projection',
      severity: 'medium',
      message: 'Projeção indica possível excesso em 3 dias',
      timestamp: '2024-01-25T09:15:00Z',
      acknowledged: true
    }
  ];

  // Dados para gráfico de tendência de gastos
  const spendingTrend = [
    { date: '01/01', planned: 500, actual: 450 },
    { date: '05/01', planned: 2500, actual: 2200 },
    { date: '10/01', planned: 5000, actual: 4800 },
    { date: '15/01', planned: 7500, actual: 7200 },
    { date: '20/01', planned: 10000, actual: 9800 },
    { date: '25/01', planned: 12500, actual: 13200 },
    { date: '31/01', planned: 15000, actual: 15500 }
  ];

  // Dados para distribuição por categoria
  const categoryDistribution = [
    { name: 'Paid Media', value: 13500, color: '#8884d8' },
    { name: 'Social Media', value: 8400, color: '#82ca9d' },
    { name: 'Professional', value: 4800, color: '#ffc658' },
    { name: 'Video', value: 10500, color: '#ff7300' }
  ];

  /**
   * Retorna a cor do status do orçamento
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      case 'exceeded': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  /**
   * Retorna a cor da severidade do alerta
   */
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Calcula o total gasto
   */
  const totalSpent = budgetData.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const totalBudget = budgetData.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage = (totalSpent / totalBudget) * 100;

  if (!isHydrated) {
    // Renderiza um loader ou um estado de esqueleto enquanto o componente não está hidratado
    return (
      <Layout title="Alertas de Orçamento" subtitle="Monitoramento de orçamentos e alertas de gastos em tempo real">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Alertas de Orçamento" subtitle="Monitoramento de orçamentos e alertas de gastos em tempo real">
        {/* Filtros */}
        <div className="flex gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-month">Mês Atual</SelectItem>
            <SelectItem value="last-month">Mês Anterior</SelectItem>
            <SelectItem value="quarter">Trimestre</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="paid-media">Paid Media</SelectItem>
            <SelectItem value="social-media">Social Media</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Orçamento Total"
          value={`R$ ${totalBudget.toLocaleString('pt-BR')}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="Para o período selecionado"
        />

        <MetricCard
          title="Total Gasto"
          value={`R$ ${totalSpent.toLocaleString('pt-BR')}`}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description={`${overallPercentage.toFixed(1)}% do orçamento`}
        />

        <MetricCard
          title="Restante"
          value={`R$ ${totalRemaining.toLocaleString('pt-BR')}`}
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          description="Disponível para gastos"
        />

        <MetricCard
          title="Alertas Ativos"
          value={budgetAlerts.filter(alert => !alert.acknowledged).length}
          icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
          description="Requerem atenção"
        />
      </div>

      {/* Alertas Críticos */}
      {budgetAlerts.filter(alert => !alert.acknowledged && alert.severity === 'critical').length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Alertas Críticos</AlertTitle>
          <AlertDescription className="text-red-700">
            Existem {budgetAlerts.filter(alert => !alert.acknowledged && alert.severity === 'critical').length} alertas críticos que requerem atenção imediata.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="budgets">Orçamentos</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gauge Chart do Orçamento Geral */}
            <Card>
              <CardHeader>
                <CardTitle>Status Geral do Orçamento</CardTitle>
                <CardDescription>
                  Percentual utilizado do orçamento total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GaugeChart
                  value={overallPercentage}
                  min={0}
                  max={120}
                  title="Utilização do Orçamento"
                  zones={[
                    { min: 0, max: 70, color: '#22c55e', label: 'Seguro' },
                    { min: 70, max: 90, color: '#eab308', label: 'Atenção' },
                    { min: 90, max: 100, color: '#ef4444', label: 'Crítico' },
                    { min: 100, max: 120, color: '#dc2626', label: 'Excedido' }
                  ]}
                  target={85}
                />
              </CardContent>
            </Card>

            {/* Distribuição por Categoria */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>
                  Gastos por categoria de campanha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}

                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Gasto']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tendência de Gastos */}
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Gastos vs Planejado</CardTitle>
              <CardDescription>
                Comparação entre gastos reais e planejados ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
                  <Area
                    type="monotone"
                    dataKey="planned"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Planejado"
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Real"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <div className="grid gap-4">
            {budgetData.map((budget) => (
              <Card key={budget.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{budget.name}</CardTitle>
                      <CardDescription>{budget.category} • {budget.period}</CardDescription>
                    </div>
                    <Badge variant={budget.status === 'exceeded' ? 'destructive' : 'secondary'}>
                      {budget.status === 'safe' && 'Seguro'}
                      {budget.status === 'warning' && 'Atenção'}
                      {budget.status === 'danger' && 'Crítico'}
                      {budget.status === 'exceeded' && 'Excedido'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Gasto: R$ {budget.spentAmount.toLocaleString('pt-BR')}</span>
                      <span>Orçamento: R$ {budget.budgetAmount.toLocaleString('pt-BR')}</span>
                    </div>
                    <Progress value={budget.percentage} className="h-2" />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{budget.percentage.toFixed(1)}% utilizado</span>
                      <span>
                        {budget.remainingAmount >= 0 
                          ? `R$ ${budget.remainingAmount.toLocaleString('pt-BR')} restante`
                          : `R$ ${Math.abs(budget.remainingAmount).toLocaleString('pt-BR')} excedido`
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Alertas de Orçamento</h3>
            <Select value={alertFilter} onValueChange={setAlertFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar alertas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Alertas</SelectItem>
                <SelectItem value="unacknowledged">Não Reconhecidos</SelectItem>
                <SelectItem value="critical">Críticos</SelectItem>
                <SelectItem value="high">Alta Prioridade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {budgetAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {alert.severity === 'critical' && <XCircle className="h-5 w-5 text-red-500" />}
                        {alert.severity === 'high' && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                        {alert.severity === 'medium' && <Clock className="h-5 w-5 text-yellow-500" />}
                        {alert.severity === 'low' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.budgetName}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity === 'low' && 'Baixa'}
                            {alert.severity === 'medium' && 'Média'}
                            {alert.severity === 'high' && 'Alta'}
                            {alert.severity === 'critical' && 'Crítica'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!alert.acknowledged && (
                        <Button variant="outline" size="sm">
                          Reconhecer
                        </Button>
                      )}
                      <Button variant="secondary" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Barras - Gastos por Categoria */}
            <Card>
              <CardHeader>
                <CardTitle>Gastos por Categoria</CardTitle>
                <CardDescription>
                  Comparação de gastos entre categorias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Gasto']} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Linha de Tendência */}
            <Card>
              <CardHeader>
                <CardTitle>Projeção de Gastos</CardTitle>
                <CardDescription>
                  Tendência e projeção para os próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={spendingTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Gastos Reais"
                    />
                    <Line
                      type="monotone"
                      dataKey="planned"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Planejado"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
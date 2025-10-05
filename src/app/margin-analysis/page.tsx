'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent,
  Target,
  BarChart3,
  PieChart,
  Calculator,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  ComposedChart,
  ReferenceLine
} from 'recharts';
import { ScatterPlot } from '@/components/charts/ScatterPlot';
import { BoxPlot } from '@/components/charts/BoxPlot';
import { useHydrated } from '@/hooks/useHydrated';

/**
 * Interface para dados de margem por produto/serviço
 */
interface MarginData {
  id: string;
  name: string;
  category: string;
  revenue: number;
  cost: number;
  grossMargin: number;
  grossMarginPercent: number;
  netMargin: number;
  netMarginPercent: number;
  volume: number;
  avgPrice: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

/**
 * Interface para análise temporal de margens
 */
interface MarginTrend {
  period: string;
  grossMargin: number;
  netMargin: number;
  revenue: number;
  cost: number;
  marginPercent: number;
  target: number;
}

/**
 * Interface para análise de rentabilidade por canal
 */
interface ChannelProfitability {
  channel: string;
  revenue: number;
  cost: number;
  margin: number;
  marginPercent: number;
  roi: number;
  customers: number;
  avgOrderValue: number;
  color: string;
  [key: string]: string | number | undefined;
}

/**
 * Página do Dashboard de Margin Analysis
 * 
 * Funcionalidades:
 * - Análise de margens brutas e líquidas
 * - Comparação de rentabilidade por produto/serviço
 * - Tendências temporais de margem
 * - Análise de ROI por canal
 * - Identificação de produtos mais/menos rentáveis
 * - Projeções e metas de margem
 */
export default function MarginAnalysisPage() {
  const isHydrated = useHydrated();
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('gross-margin');

  // Mock data para margens por produto
  const marginData: MarginData[] = [
    {
      id: '1',
      name: 'Produto Premium A',
      category: 'Premium',
      revenue: 150000,
      cost: 90000,
      grossMargin: 60000,
      grossMarginPercent: 40,
      netMargin: 45000,
      netMarginPercent: 30,
      volume: 500,
      avgPrice: 300,
      trend: 'up',
      period: 'Janeiro 2024'
    },
    {
      id: '2',
      name: 'Serviço Consultoria B',
      category: 'Serviços',
      revenue: 120000,
      cost: 60000,
      grossMargin: 60000,
      grossMarginPercent: 50,
      netMargin: 48000,
      netMarginPercent: 40,
      volume: 200,
      avgPrice: 600,
      trend: 'up',
      period: 'Janeiro 2024'
    },
    {
      id: '3',
      name: 'Produto Standard C',
      category: 'Standard',
      revenue: 80000,
      cost: 56000,
      grossMargin: 24000,
      grossMarginPercent: 30,
      netMargin: 16000,
      netMarginPercent: 20,
      volume: 800,
      avgPrice: 100,
      trend: 'stable',
      period: 'Janeiro 2024'
    },
    {
      id: '4',
      name: 'Produto Básico D',
      category: 'Básico',
      revenue: 60000,
      cost: 48000,
      grossMargin: 12000,
      grossMarginPercent: 20,
      netMargin: 6000,
      netMarginPercent: 10,
      volume: 1200,
      avgPrice: 50,
      trend: 'down',
      period: 'Janeiro 2024'
    }
  ];

  // Mock data para tendências temporais
  const marginTrends: MarginTrend[] = [
    { period: 'Set 2023', grossMargin: 180000, netMargin: 135000, revenue: 450000, cost: 270000, marginPercent: 30, target: 32 },
    { period: 'Out 2023', grossMargin: 195000, netMargin: 146250, revenue: 487500, cost: 292500, marginPercent: 30, target: 32 },
    { period: 'Nov 2023', grossMargin: 210000, netMargin: 157500, revenue: 525000, cost: 315000, marginPercent: 30, target: 32 },
    { period: 'Dez 2023', grossMargin: 225000, netMargin: 168750, revenue: 562500, cost: 337500, marginPercent: 30, target: 32 },
    { period: 'Jan 2024', grossMargin: 240000, netMargin: 180000, revenue: 600000, cost: 360000, marginPercent: 30, target: 32 },
    { period: 'Fev 2024', grossMargin: 255000, netMargin: 191250, revenue: 637500, cost: 382500, marginPercent: 30, target: 32 },
    { period: 'Mar 2024', grossMargin: 270000, netMargin: 202500, revenue: 675000, cost: 405000, marginPercent: 30, target: 32 }
  ];

  // Mock data para rentabilidade por canal
  const channelProfitability: ChannelProfitability[] = [
    {
      channel: 'E-commerce',
      revenue: 250000,
      cost: 150000,
      margin: 100000,
      marginPercent: 40,
      roi: 167,
      customers: 1500,
      avgOrderValue: 167,
      color: '#8884d8'
    },
    {
      channel: 'Vendas Diretas',
      revenue: 180000,
      cost: 126000,
      margin: 54000,
      marginPercent: 30,
      roi: 143,
      customers: 300,
      avgOrderValue: 600,
      color: '#82ca9d'
    },
    {
      channel: 'Parceiros',
      revenue: 120000,
      cost: 96000,
      margin: 24000,
      marginPercent: 20,
      roi: 125,
      customers: 200,
      avgOrderValue: 600,
      color: '#ffc658'
    },
    {
      channel: 'Marketplace',
      revenue: 80000,
      cost: 64000,
      margin: 16000,
      marginPercent: 20,
      roi: 125,
      customers: 800,
      avgOrderValue: 100,
      color: '#ff7300'
    }
  ];

  // Dados para scatter plot (Volume vs Margem)
  const scatterData = marginData.map(item => ({
    x: item.volume,
    y: item.grossMarginPercent,
    category: item.category,
    name: item.name,
    revenue: item.revenue
  }));

  // Dados para box plot (distribuição de margens por categoria)
  const boxPlotData = [
    {
      category: 'Premium',
      values: [35, 38, 40, 42, 45, 48, 50],
      metadata: { count: 7, avgMargin: 42.6 }
    },
    {
      category: 'Standard',
      values: [25, 28, 30, 32, 35, 38, 40],
      metadata: { count: 7, avgMargin: 32.6 }
    },
    {
      category: 'Básico',
      values: [15, 18, 20, 22, 25, 28, 30],
      metadata: { count: 7, avgMargin: 22.6 }
    }
  ];

  /**
   * Calcula métricas consolidadas
   */
  const totalRevenue = marginData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCost = marginData.reduce((sum, item) => sum + item.cost, 0);
  const totalGrossMargin = marginData.reduce((sum, item) => sum + item.grossMargin, 0);
  const totalNetMargin = marginData.reduce((sum, item) => sum + item.netMargin, 0);
  const overallGrossMarginPercent = (totalGrossMargin / totalRevenue) * 100;
  const overallNetMarginPercent = (totalNetMargin / totalRevenue) * 100;

  /**
   * Retorna a cor baseada na tendência
   */
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  /**
   * Retorna o ícone baseado na tendência
   */
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4" />;
      case 'down': return <ArrowDownRight className="h-4 w-4" />;
      case 'stable': return <Target className="h-4 w-4" />;
      default: return null;
    }
  };

  if (!isHydrated) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Margin Analysis</h1>
          <p className="text-muted-foreground">
            Análise detalhada de margens, rentabilidade e performance financeira
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Calculadora de Margem
          </Button>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Definir Metas
          </Button>
        </div>
      </div>

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
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="basic">Básico</SelectItem>
            <SelectItem value="services">Serviços</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Métrica" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gross-margin">Margem Bruta</SelectItem>
            <SelectItem value="net-margin">Margem Líquida</SelectItem>
            <SelectItem value="roi">ROI</SelectItem>
            <SelectItem value="revenue">Receita</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalRevenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Bruta</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallGrossMarginPercent.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              R$ {totalGrossMargin.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Líquida</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallNetMarginPercent.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              R$ {totalNetMargin.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totalRevenue / totalCost - 1) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Retorno sobre investimento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de Performance */}
      {overallNetMarginPercent < 25 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Atenção: Margem Abaixo da Meta</AlertTitle>
          <AlertDescription className="text-yellow-700">
            A margem líquida atual ({overallNetMarginPercent.toFixed(1)}%) está abaixo da meta de 25%. 
            Considere revisar custos ou estratégias de precificação.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Por Produto</TabsTrigger>
          <TabsTrigger value="channels">Por Canal</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="analysis">Análise Avançada</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evolução das Margens */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução das Margens</CardTitle>
                <CardDescription>
                  Tendência temporal das margens bruta e líquida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={marginTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'marginPercent' || name === 'target' 
                          ? `${Number(value).toFixed(1)}%` 
                          : `R$ ${Number(value).toLocaleString('pt-BR')}`,
                        name === 'grossMargin' ? 'Margem Bruta' :
                        name === 'netMargin' ? 'Margem Líquida' :
                        name === 'marginPercent' ? 'Margem %' :
                        name === 'target' ? 'Meta %' : name
                      ]} 
                    />
                    <Bar yAxisId="left" dataKey="grossMargin" fill="#8884d8" name="Margem Bruta" />
                    <Bar yAxisId="left" dataKey="netMargin" fill="#82ca9d" name="Margem Líquida" />
                    <Line yAxisId="right" type="monotone" dataKey="marginPercent" stroke="#ff7300" strokeWidth={2} name="Margem %" />
                    <ReferenceLine yAxisId="right" y={32} stroke="#ff0000" strokeDasharray="5 5" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribuição de Receita vs Margem */}
            <Card>
              <CardHeader>
                <CardTitle>Receita vs Margem por Canal</CardTitle>
                <CardDescription>
                  Comparação de performance entre canais de venda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={channelProfitability}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ channel, marginPercent }) => `${channel} ${marginPercent}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="margin"
                    >
                      {channelProfitability.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Margem']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Resumo por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Performance por Categoria</CardTitle>
              <CardDescription>
                Análise comparativa de margens por categoria de produto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marginData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'grossMarginPercent' || name === 'netMarginPercent' 
                        ? `${Number(value).toFixed(1)}%` 
                        : `R$ ${Number(value).toLocaleString('pt-BR')}`,
                      name === 'grossMarginPercent' ? 'Margem Bruta %' :
                      name === 'netMarginPercent' ? 'Margem Líquida %' : name
                    ]} 
                  />
                  <Bar dataKey="grossMarginPercent" fill="#8884d8" name="Margem Bruta %" />
                  <Bar dataKey="netMarginPercent" fill="#82ca9d" name="Margem Líquida %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4">
            {marginData.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category} • {product.period}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <div className={`flex items-center ${getTrendColor(product.trend)}`}>
                        {getTrendIcon(product.trend)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Receita</p>
                      <p className="text-lg font-semibold">R$ {product.revenue.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Margem Bruta</p>
                      <p className="text-lg font-semibold">{product.grossMarginPercent}%</p>
                      <p className="text-xs text-muted-foreground">R$ {product.grossMargin.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Margem Líquida</p>
                      <p className="text-lg font-semibold">{product.netMarginPercent}%</p>
                      <p className="text-xs text-muted-foreground">R$ {product.netMargin.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Volume</p>
                      <p className="text-lg font-semibold">{product.volume}</p>
                      <p className="text-xs text-muted-foreground">Preço médio: R$ {product.avgPrice}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Margem Bruta</span>
                      <span>{product.grossMarginPercent}%</span>
                    </div>
                    <Progress value={product.grossMarginPercent} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm mb-2">
                      <span>Margem Líquida</span>
                      <span>{product.netMarginPercent}%</span>
                    </div>
                    <Progress value={product.netMarginPercent} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {channelProfitability.map((channel) => (
              <Card key={channel.channel}>
                <CardHeader>
                  <CardTitle>{channel.channel}</CardTitle>
                  <CardDescription>
                    Performance e rentabilidade do canal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Receita</p>
                        <p className="text-xl font-bold">R$ {channel.revenue.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Margem</p>
                        <p className="text-xl font-bold">{channel.marginPercent}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className="text-xl font-bold">{channel.roi}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Clientes</p>
                        <p className="text-xl font-bold">{channel.customers}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Margem vs Meta (30%)</span>
                        <span>{channel.marginPercent}%</span>
                      </div>
                      <Progress value={(channel.marginPercent / 30) * 100} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ticket médio: R$ {channel.avgOrderValue.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
              <CardDescription>
                Evolução temporal detalhada das métricas de margem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={marginTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Receita"
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stackId="2"
                    stroke="#ff7300"
                    fill="#ff7300"
                    fillOpacity={0.3}
                    name="Custo"
                  />
                  <Area
                    type="monotone"
                    dataKey="grossMargin"
                    stackId="3"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Margem Bruta"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scatter Plot: Volume vs Margem */}
            <Card>
              <CardHeader>
                <CardTitle>Volume vs Margem</CardTitle>
                <CardDescription>
                  Análise de correlação entre volume de vendas e margem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScatterPlot
                  data={scatterData}
                  xAxisLabel="Volume de Vendas"
                  yAxisLabel="Margem Bruta (%)"
                  title="Correlação Volume vs Margem"
                  showTrendLine={true}
                />
              </CardContent>
            </Card>

            {/* Box Plot: Distribuição de Margens */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Margens</CardTitle>
                <CardDescription>
                  Análise estatística da distribuição de margens por categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BoxPlot
                  data={boxPlotData}
                  title="Distribuição de Margens por Categoria"
                  yAxisLabel="Margem (%)"
                  showOutliers={true}
                  showMean={true}
                />
              </CardContent>
            </Card>
          </div>

          {/* Insights e Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle>Insights e Recomendações</CardTitle>
              <CardDescription>
                Análise automatizada baseada nos dados de margem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Produtos Premium Performance</h4>
                    <p className="text-sm text-green-700">
                      Produtos premium mantêm margens consistentemente altas (40%+). 
                      Considere expandir esta linha de produtos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Oportunidade de Otimização</h4>
                    <p className="text-sm text-yellow-700">
                      Produtos básicos têm margem baixa (20%). Revisar estrutura de custos 
                      ou estratégia de precificação pode melhorar a rentabilidade.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Análise de Canal</h4>
                    <p className="text-sm text-blue-700">
                      E-commerce apresenta a melhor margem (40%). Investir mais neste canal 
                      pode maximizar a rentabilidade geral.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
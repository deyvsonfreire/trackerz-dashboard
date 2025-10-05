'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Eye, 
  MousePointer, 
  BarChart3,
  Globe,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Download,
  Filter,
  Calendar,
  Users,
  Clock
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
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';

/**
 * Interface para dados de SEO
 */
interface SEOData {
  date: string;
  organicTraffic: number;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  keywords: number;
  pages: number;
  backlinks: number;
}

/**
 * Interface para palavra-chave
 */
interface Keyword {
  keyword: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
  difficulty: number;
  volume: number;
  trend: 'up' | 'down' | 'stable';
  url: string;
}

/**
 * Interface para página
 */
interface Page {
  url: string;
  title: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  keywords: number;
  status: 'indexed' | 'not-indexed' | 'error';
}

/**
 * Interface para backlink
 */
interface Backlink {
  domain: string;
  url: string;
  anchorText: string;
  domainAuthority: number;
  pageAuthority: number;
  type: 'dofollow' | 'nofollow';
  status: 'active' | 'lost' | 'new';
  firstSeen: string;
}

/**
 * Interface para problema técnico de SEO
 */
interface SEOIssue {
  type: 'critical' | 'warning' | 'info';
  category: 'technical' | 'content' | 'performance' | 'mobile';
  title: string;
  description: string;
  affectedPages: number;
  priority: number;
}

/**
 * Dashboard de SEO/Organic
 * 
 * Funcionalidades:
 * - Métricas de tráfego orgânico
 * - Análise de palavras-chave
 * - Performance de páginas
 * - Análise de backlinks
 * - Problemas técnicos de SEO
 * - Tendências e insights
 */
export default function SEOOrganicPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('organicTraffic');

  // Mock data para métricas de SEO
  const seoData: SEOData[] = [
    { date: '2024-01-01', organicTraffic: 12500, impressions: 45000, clicks: 2250, ctr: 5.0, avgPosition: 8.2, keywords: 1250, pages: 450, backlinks: 2800 },
    { date: '2024-01-02', organicTraffic: 13200, impressions: 47500, clicks: 2375, ctr: 5.0, avgPosition: 8.1, keywords: 1260, pages: 452, backlinks: 2805 },
    { date: '2024-01-03', organicTraffic: 11800, impressions: 44000, clicks: 2200, ctr: 5.0, avgPosition: 8.3, keywords: 1245, pages: 448, backlinks: 2795 },
    { date: '2024-01-04', organicTraffic: 14100, impressions: 49000, clicks: 2450, ctr: 5.0, avgPosition: 8.0, keywords: 1275, pages: 455, backlinks: 2820 },
    { date: '2024-01-05', organicTraffic: 13800, impressions: 48200, clicks: 2410, ctr: 5.0, avgPosition: 8.1, keywords: 1270, pages: 453, backlinks: 2815 },
    { date: '2024-01-06', organicTraffic: 12900, impressions: 46500, clicks: 2325, ctr: 5.0, avgPosition: 8.2, keywords: 1255, pages: 450, backlinks: 2800 },
    { date: '2024-01-07', organicTraffic: 15200, impressions: 51000, clicks: 2550, ctr: 5.0, avgPosition: 7.9, keywords: 1285, pages: 458, backlinks: 2835 }
  ];

  // Mock data para palavras-chave
  const keywords: Keyword[] = [
    { keyword: 'marketing digital', position: 3, impressions: 8500, clicks: 425, ctr: 5.0, difficulty: 75, volume: 12000, trend: 'up', url: '/marketing-digital' },
    { keyword: 'seo para empresas', position: 5, impressions: 6200, clicks: 310, ctr: 5.0, difficulty: 68, volume: 8500, trend: 'up', url: '/seo-empresas' },
    { keyword: 'consultoria digital', position: 7, impressions: 4800, clicks: 240, ctr: 5.0, difficulty: 62, volume: 6800, trend: 'stable', url: '/consultoria' },
    { keyword: 'agência de marketing', position: 12, impressions: 3200, clicks: 160, ctr: 5.0, difficulty: 80, volume: 15000, trend: 'down', url: '/agencia' },
    { keyword: 'estratégia digital', position: 8, impressions: 4100, clicks: 205, ctr: 5.0, difficulty: 58, volume: 5200, trend: 'up', url: '/estrategia' },
    { keyword: 'otimização seo', position: 4, impressions: 5800, clicks: 290, ctr: 5.0, difficulty: 72, volume: 9800, trend: 'stable', url: '/otimizacao-seo' }
  ];

  // Mock data para páginas
  const pages: Page[] = [
    { url: '/marketing-digital', title: 'Marketing Digital: Guia Completo 2024', impressions: 15200, clicks: 760, ctr: 5.0, avgPosition: 4.2, keywords: 45, status: 'indexed' },
    { url: '/seo-empresas', title: 'SEO para Empresas: Como Aumentar Vendas', impressions: 12800, clicks: 640, ctr: 5.0, avgPosition: 5.8, keywords: 38, status: 'indexed' },
    { url: '/consultoria', title: 'Consultoria Digital Especializada', impressions: 9600, clicks: 480, ctr: 5.0, avgPosition: 7.2, keywords: 28, status: 'indexed' },
    { url: '/agencia', title: 'Agência de Marketing Digital', impressions: 8400, clicks: 420, ctr: 5.0, avgPosition: 8.5, keywords: 32, status: 'not-indexed' },
    { url: '/estrategia', title: 'Estratégia Digital Eficaz', impressions: 7200, clicks: 360, ctr: 5.0, avgPosition: 6.8, keywords: 25, status: 'indexed' },
    { url: '/blog/tendencias-2024', title: 'Tendências de Marketing Digital 2024', impressions: 6800, clicks: 340, ctr: 5.0, avgPosition: 9.2, keywords: 18, status: 'error' }
  ];

  // Mock data para backlinks
  const backlinks: Backlink[] = [
    { domain: 'marketingbrasil.com.br', url: 'https://marketingbrasil.com.br/artigo-seo', anchorText: 'especialistas em SEO', domainAuthority: 65, pageAuthority: 58, type: 'dofollow', status: 'active', firstSeen: '2024-01-15' },
    { domain: 'blogdomarketing.com', url: 'https://blogdomarketing.com/dicas', anchorText: 'consultoria digital', domainAuthority: 52, pageAuthority: 45, type: 'dofollow', status: 'new', firstSeen: '2024-01-20' },
    { domain: 'portalnegocios.com.br', url: 'https://portalnegocios.com.br/empresas', anchorText: 'agência de marketing', domainAuthority: 48, pageAuthority: 42, type: 'nofollow', status: 'active', firstSeen: '2024-01-10' },
    { domain: 'revistaseo.com', url: 'https://revistaseo.com/cases', anchorText: 'estratégias de SEO', domainAuthority: 58, pageAuthority: 52, type: 'dofollow', status: 'lost', firstSeen: '2024-01-05' },
    { domain: 'digitaltrends.com.br', url: 'https://digitaltrends.com.br/guias', anchorText: 'marketing digital', domainAuthority: 62, pageAuthority: 55, type: 'dofollow', status: 'active', firstSeen: '2024-01-18' }
  ];

  // Mock data para problemas de SEO
  const seoIssues: SEOIssue[] = [
    { type: 'critical', category: 'technical', title: 'Páginas com erro 404', description: 'Páginas importantes retornando erro 404', affectedPages: 12, priority: 95 },
    { type: 'warning', category: 'content', title: 'Meta descriptions ausentes', description: 'Páginas sem meta description otimizada', affectedPages: 28, priority: 75 },
    { type: 'warning', category: 'performance', title: 'Velocidade de carregamento', description: 'Páginas com tempo de carregamento > 3s', affectedPages: 15, priority: 80 },
    { type: 'info', category: 'mobile', title: 'Otimização mobile', description: 'Páginas não otimizadas para mobile', affectedPages: 8, priority: 60 },
    { type: 'critical', category: 'technical', title: 'Sitemap desatualizado', description: 'Sitemap XML não atualizado há 30 dias', affectedPages: 1, priority: 90 },
    { type: 'warning', category: 'content', title: 'Conteúdo duplicado', description: 'Páginas com conteúdo similar detectado', affectedPages: 6, priority: 70 }
  ];

  // Dados para distribuição de posições
  const positionDistribution = [
    { position: '1-3', count: 45, percentage: 18 },
    { position: '4-10', count: 125, percentage: 50 },
    { position: '11-20', count: 58, percentage: 23 },
    { position: '21-50', count: 22, percentage: 9 }
  ];

  // Dados para análise de CTR por posição
  const ctrByPosition = [
    { position: 1, ctr: 28.5, impressions: 15000 },
    { position: 2, ctr: 15.7, impressions: 12000 },
    { position: 3, ctr: 11.0, impressions: 10000 },
    { position: 4, ctr: 8.0, impressions: 8500 },
    { position: 5, ctr: 6.1, impressions: 7200 },
    { position: 6, ctr: 4.9, impressions: 6800 },
    { position: 7, ctr: 4.0, impressions: 6200 },
    { position: 8, ctr: 3.5, impressions: 5800 },
    { position: 9, ctr: 3.1, impressions: 5400 },
    { position: 10, ctr: 2.8, impressions: 5000 }
  ];

  // Cores para gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  /**
   * Calcula variação percentual
   */
  const calculateVariation = (current: number, previous: number): number => {
    return ((current - previous) / previous) * 100;
  };

  /**
   * Formata números grandes
   */
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  /**
   * Formata porcentagem
   */
  const formatPercentage = (num: number): string => {
    return num.toFixed(1) + '%';
  };

  /**
   * Obtém cor baseada na tendência
   */
  const getTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  /**
   * Obtém ícone baseado na tendência
   */
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  /**
   * Obtém cor do status da página
   */
  const getStatusColor = (status: 'indexed' | 'not-indexed' | 'error'): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'indexed': return 'default';
      case 'not-indexed': return 'secondary';
      case 'error': return 'destructive';
    }
  };

  /**
   * Obtém ícone do status da página
   */
  const getStatusIcon = (status: 'indexed' | 'not-indexed' | 'error') => {
    switch (status) {
      case 'indexed': return <CheckCircle className="h-4 w-4" />;
      case 'not-indexed': return <Clock className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
    }
  };

  /**
   * Obtém cor do tipo de problema
   */
  const getIssueColor = (type: 'critical' | 'warning' | 'info'): 'destructive' | 'secondary' | 'outline' => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🔍 SEO & Tráfego Orgânico
          </h1>
          <p className="text-muted-foreground">
            Análise completa de performance orgânica e otimização para mecanismos de busca
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tráfego Orgânico</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2K</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressões</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">329.7K</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR Médio</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.0%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3% vs período anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posição Média</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.1</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              -0.5 vs período anterior
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="pages">Páginas</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
          <TabsTrigger value="technical">Técnico</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Gráfico Principal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Evolução do Tráfego Orgânico
              </CardTitle>
              <div className="flex gap-2">
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organicTraffic">Tráfego Orgânico</SelectItem>
                    <SelectItem value="impressions">Impressões</SelectItem>
                    <SelectItem value="clicks">Cliques</SelectItem>
                    <SelectItem value="ctr">CTR</SelectItem>
                    <SelectItem value="avgPosition">Posição Média</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={seoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    formatter={(value: number, name: string) => [
                      selectedMetric === 'ctr' ? formatPercentage(value) : formatNumber(value),
                      name === 'organicTraffic' ? 'Tráfego Orgânico' :
                      name === 'impressions' ? 'Impressões' :
                      name === 'clicks' ? 'Cliques' :
                      name === 'ctr' ? 'CTR' :
                      name === 'avgPosition' ? 'Posição Média' : name
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#0088FE"
                    fill="#0088FE"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Distribuição de Posições */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Distribuição de Posições
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={positionDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ position, percentage }) => `${position}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {positionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* CTR por Posição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  CTR por Posição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ctrByPosition}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="position" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === 'ctr' ? formatPercentage(value) : formatNumber(value),
                        name === 'ctr' ? 'CTR' : 'Impressões'
                      ]}
                    />
                    <Bar dataKey="ctr" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Métricas Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Palavras-chave Rankeadas</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,275</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +25 novas palavras
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Páginas Indexadas</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">458</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8 novas páginas
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backlinks Ativos</CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,835</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +35 novos links
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Top Palavras-chave
              </CardTitle>
              <CardDescription>
                Principais palavras-chave por performance e oportunidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{keyword.keyword}</h4>
                        <div className={`flex items-center gap-1 ${getTrendColor(keyword.trend)}`}>
                          {getTrendIcon(keyword.trend)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{keyword.url}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Posição</p>
                        <p className="font-medium">{keyword.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Impressões</p>
                        <p className="font-medium">{formatNumber(keyword.impressions)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cliques</p>
                        <p className="font-medium">{formatNumber(keyword.clicks)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CTR</p>
                        <p className="font-medium">{formatPercentage(keyword.ctr)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volume</p>
                        <p className="font-medium">{formatNumber(keyword.volume)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Performance de Páginas
              </CardTitle>
              <CardDescription>
                Análise detalhada da performance de cada página
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{page.title}</h4>
                        <Badge variant={getStatusColor(page.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(page.status)}
                            {page.status === 'indexed' ? 'Indexada' : 
                             page.status === 'not-indexed' ? 'Não Indexada' : 'Erro'}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{page.url}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Impressões</p>
                        <p className="font-medium">{formatNumber(page.impressions)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cliques</p>
                        <p className="font-medium">{formatNumber(page.clicks)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CTR</p>
                        <p className="font-medium">{formatPercentage(page.ctr)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Posição</p>
                        <p className="font-medium">{page.avgPosition.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Keywords</p>
                        <p className="font-medium">{page.keywords}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Perfil de Backlinks
              </CardTitle>
              <CardDescription>
                Análise dos backlinks e autoridade de domínio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backlinks.map((backlink, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{backlink.domain}</h4>
                        <Badge variant={backlink.type === 'dofollow' ? 'default' : 'secondary'}>
                          {backlink.type}
                        </Badge>
                        <Badge variant={
                          backlink.status === 'active' ? 'default' : 
                          backlink.status === 'new' ? 'secondary' : 'destructive'
                        }>
                          {backlink.status === 'active' ? 'Ativo' : 
                           backlink.status === 'new' ? 'Novo' : 'Perdido'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{backlink.anchorText}</p>
                      <p className="text-xs text-muted-foreground">
                        Primeiro visto: {new Date(backlink.firstSeen).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">DA</p>
                        <p className="font-medium">{backlink.domainAuthority}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">PA</p>
                        <p className="font-medium">{backlink.pageAuthority}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Problemas Técnicos de SEO
              </CardTitle>
              <CardDescription>
                Identificação e priorização de problemas técnicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoIssues.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {issue.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                        {issue.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                        {issue.type === 'info' && <AlertTriangle className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{issue.title}</h4>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getIssueColor(issue.type)}>
                            {issue.type === 'critical' ? 'Crítico' : 
                             issue.type === 'warning' ? 'Atenção' : 'Info'}
                          </Badge>
                          <Badge variant="outline">
                            {issue.category === 'technical' ? 'Técnico' :
                             issue.category === 'content' ? 'Conteúdo' :
                             issue.category === 'performance' ? 'Performance' : 'Mobile'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Páginas Afetadas</p>
                      <p className="font-medium text-lg">{issue.affectedPages}</p>
                      <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            issue.priority >= 90 ? 'bg-red-500' :
                            issue.priority >= 70 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${issue.priority}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from '@/components/ui';
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Download,
  Plus
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
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { SankeyChart } from '@/components/charts/SankeyChart';
import { useHydrated } from '@/hooks/useHydrated';
import { Layout } from '@/components/layout/Layout';

/**
 * Interface para dados de lead
 */
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score: number;
  value: number;
  createdAt: string;
  lastContact: string;
  assignedTo: string;
  tags: string[];
  notes: string;
}

/**
 * Interface para métricas do funil
 */
interface FunnelMetrics {
  stage: string;
  count: number;
  value: number;
  conversionRate: number;
  avgTime: number;
  color: string;
}

/**
 * Interface para origem de leads
 */
interface LeadSource {
  source: string;
  count: number;
  value: number;
  conversionRate: number;
  cost: number;
  roi: number;
  color: string;
  [key: string]: string | number | undefined;
}

/**
 * Página do Dashboard de Leads/CRM
 * 
 * Funcionalidades:
 * - Gestão completa de leads
 * - Análise do funil de vendas
 * - Métricas de conversão
 * - Análise de fontes de leads
 * - Acompanhamento de performance de vendas
 * - Relatórios e insights
 */
export default function LeadsCRMPage() {
  const isHydrated = useHydrated();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para leads
  const leadsData: Lead[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      phone: '(11) 99999-9999',
      company: 'Empresa ABC',
      source: 'Google Ads',
      status: 'qualified',
      score: 85,
      value: 15000,
      createdAt: '2024-01-20T10:00:00Z',
      lastContact: '2024-01-24T14:30:00Z',
      assignedTo: 'Maria Santos',
      tags: ['hot-lead', 'enterprise'],
      notes: 'Interessado em solução completa'
    },
    {
      id: '2',
      name: 'Ana Costa',
      email: 'ana.costa@startup.com',
      phone: '(11) 88888-8888',
      company: 'Startup XYZ',
      source: 'LinkedIn',
      status: 'proposal',
      score: 75,
      value: 8000,
      createdAt: '2024-01-18T09:15:00Z',
      lastContact: '2024-01-25T11:00:00Z',
      assignedTo: 'Carlos Lima',
      tags: ['startup', 'tech'],
      notes: 'Aguardando aprovação do orçamento'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro@comercio.com',
      phone: '(11) 77777-7777',
      company: 'Comércio 123',
      source: 'Website',
      status: 'new',
      score: 60,
      value: 5000,
      createdAt: '2024-01-25T16:20:00Z',
      lastContact: '2024-01-25T16:20:00Z',
      assignedTo: 'Maria Santos',
      tags: ['small-business'],
      notes: 'Primeiro contato via formulário'
    },
    {
      id: '4',
      name: 'Lucia Ferreira',
      email: 'lucia@industria.com',
      phone: '(11) 66666-6666',
      company: 'Indústria DEF',
      source: 'Indicação',
      status: 'won',
      score: 95,
      value: 25000,
      createdAt: '2024-01-10T08:00:00Z',
      lastContact: '2024-01-23T15:45:00Z',
      assignedTo: 'Carlos Lima',
      tags: ['closed-won', 'industry'],
      notes: 'Cliente fechado - implementação iniciada'
    }
  ];

  // Mock data para métricas do funil
  const funnelMetrics: FunnelMetrics[] = [
    {
      stage: 'Leads Gerados',
      count: 150,
      value: 750000,
      conversionRate: 100,
      avgTime: 0,
      color: '#8884d8'
    },
    {
      stage: 'Leads Qualificados',
      count: 90,
      value: 450000,
      conversionRate: 60,
      avgTime: 2,
      color: '#82ca9d'
    },
    {
      stage: 'Propostas Enviadas',
      count: 45,
      value: 225000,
      conversionRate: 30,
      avgTime: 7,
      color: '#ffc658'
    },
    {
      stage: 'Em Negociação',
      count: 25,
      value: 125000,
      conversionRate: 17,
      avgTime: 14,
      color: '#ff7300'
    },
    {
      stage: 'Fechados',
      count: 12,
      value: 60000,
      conversionRate: 8,
      avgTime: 21,
      color: '#00ff00'
    }
  ];

  // Mock data para fontes de leads
  const leadSources: LeadSource[] = [
    {
      source: 'Google Ads',
      count: 45,
      value: 225000,
      conversionRate: 12,
      cost: 15000,
      roi: 1400,
      color: '#8884d8'
    },
    {
      source: 'LinkedIn',
      count: 35,
      value: 175000,
      conversionRate: 15,
      cost: 8000,
      roi: 2087,
      color: '#82ca9d'
    },
    {
      source: 'Website',
      count: 40,
      value: 200000,
      conversionRate: 10,
      cost: 5000,
      roi: 3900,
      color: '#ffc658'
    },
    {
      source: 'Indicação',
      count: 20,
      value: 100000,
      conversionRate: 25,
      cost: 2000,
      roi: 4900,
      color: '#ff7300'
    },
    {
      source: 'Email Marketing',
      count: 10,
      value: 50000,
      conversionRate: 8,
      cost: 1000,
      roi: 4900,
      color: '#00ff00'
    }
  ];

  // Dados para evolução temporal
  const leadEvolution = [
    { month: 'Set 2023', leads: 120, qualified: 72, closed: 8, revenue: 40000 },
    { month: 'Out 2023', leads: 135, qualified: 81, closed: 10, revenue: 50000 },
    { month: 'Nov 2023', leads: 140, qualified: 84, closed: 11, revenue: 55000 },
    { month: 'Dez 2023', leads: 145, qualified: 87, closed: 12, revenue: 60000 },
    { month: 'Jan 2024', leads: 150, qualified: 90, closed: 12, revenue: 60000 }
  ];

  // Dados para Sankey (fluxo de leads)
  const sankeyData = {
    nodes: [
      { id: 'google-ads', name: 'Google Ads' },
      { id: 'linkedin', name: 'LinkedIn' },
      { id: 'website', name: 'Website' },
      { id: 'referral', name: 'Indicação' },
      { id: 'qualified', name: 'Qualificados' },
      { id: 'proposal', name: 'Proposta' },
      { id: 'won', name: 'Fechados' },
      { id: 'lost', name: 'Perdidos' }
    ],
    links: [
      { source: 'google-ads', target: 'qualified', value: 27 },
      { source: 'linkedin', target: 'qualified', value: 21 },
      { source: 'website', target: 'qualified', value: 24 },
      { source: 'referral', target: 'qualified', value: 18 },
      { source: 'qualified', target: 'proposal', value: 45 },
      { source: 'qualified', target: 'lost', value: 45 },
      { source: 'proposal', target: 'won', value: 12 },
      { source: 'proposal', target: 'lost', value: 33 }
    ]
  };

  /**
   * Retorna a cor do status do lead
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'won': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Retorna o texto do status em português
   */
  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'qualified': return 'Qualificado';
      case 'proposal': return 'Proposta';
      case 'negotiation': return 'Negociação';
      case 'won': return 'Fechado';
      case 'lost': return 'Perdido';
      default: return status;
    }
  };

  /**
   * Calcula métricas consolidadas
   */
  const totalLeads = leadsData.length;
  const qualifiedLeads = leadsData.filter(lead => ['qualified', 'proposal', 'negotiation', 'won'].includes(lead.status)).length;
  const wonLeads = leadsData.filter(lead => lead.status === 'won').length;
  const totalValue = leadsData.reduce((sum, lead) => sum + lead.value, 0);
  const wonValue = leadsData.filter(lead => lead.status === 'won').reduce((sum, lead) => sum + lead.value, 0);
  const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
  const avgLeadValue = totalLeads > 0 ? totalValue / totalLeads : 0;

  if (!isHydrated) {
    return (
      <Layout title="Dashboard de Leads (CRM)" subtitle="Gestão e análise de leads e funil de vendas">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard de Leads (CRM)" subtitle="Gestão e análise de leads e funil de vendas">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="funnel">Funil de Vendas</TabsTrigger>
            <TabsTrigger value="sources">Fontes</TabsTrigger>
            <TabsTrigger value="leads">Lista de Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Lead
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evolução de Leads */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Leads</CardTitle>
                <CardDescription>
                  Tendência de geração e conversão de leads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leadEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Leads Gerados"
                    />
                    <Line
                      type="monotone"
                      dataKey="qualified"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Qualificados"
                    />
                    <Line
                      type="monotone"
                      dataKey="closed"
                      stroke="#ffc658"
                      strokeWidth={2}
                      name="Fechados"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribuição por Fonte */}
            <Card>
              <CardHeader>
                <CardTitle>Leads por Fonte</CardTitle>
                <CardDescription>
                  Distribuição de leads por canal de origem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ source, count }) => `${source} (${count})`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {leadSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Leads']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Receita por Mês */}
          <Card>
            <CardHeader>
              <CardTitle>Receita Gerada</CardTitle>
              <CardDescription>
                Evolução da receita proveniente de leads convertidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={leadEvolution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Receita"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funil de Conversão */}
            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
                <CardDescription>
                  Análise detalhada do funil de vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FunnelChart
                  data={funnelMetrics.map(stage => ({
                    stage: stage.stage,
                    value: stage.count,
                    conversionRate: stage.conversionRate
                  }))}
                  title="Funil de Vendas"
                  showConversionRates={true}
                  showValues={true}
                />
              </CardContent>
            </Card>

            {/* Fluxo de Leads (Sankey) */}
            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Leads</CardTitle>
                <CardDescription>
                  Jornada dos leads desde a origem até a conversão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SankeyChart
                  nodes={sankeyData.nodes}
                  links={sankeyData.links}
                  title="Fluxo de Leads por Fonte"
                  width={400}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>

          {/* Métricas do Funil */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas Detalhadas do Funil</CardTitle>
              <CardDescription>
                Análise de performance por estágio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelMetrics.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: stage.color }}></div>
                      <div>
                        <h4 className="font-medium">{stage.stage}</h4>
                        <p className="text-sm text-muted-foreground">
                          {stage.avgTime > 0 && `Tempo médio: ${stage.avgTime} dias`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{stage.count}</div>
                      <div className="text-sm text-muted-foreground">
                        {stage.conversionRate.toFixed(1)}% conversão
                      </div>
                      <div className="text-sm text-muted-foreground">
                        R$ {stage.value.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4">
            {leadSources.map((source) => (
              <Card key={source.source}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{source.source}</CardTitle>
                      <CardDescription>
                        Performance e ROI do canal
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {source.conversionRate}% conversão
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Leads</p>
                      <p className="text-xl font-bold">{source.count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Pipeline</p>
                      <p className="text-xl font-bold">R$ {source.value.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Custo</p>
                      <p className="text-xl font-bold">R$ {source.cost.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-xl font-bold">{source.roi}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CPL</p>
                      <p className="text-xl font-bold">R$ {(source.cost / source.count).toFixed(0)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Taxa de Conversão</span>
                      <span>{source.conversionRate}%</span>
                    </div>
                    <Progress value={source.conversionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-4">
            {leadsData.map((lead) => (
              <Card key={lead.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{lead.name}</CardTitle>
                      <CardDescription>{lead.company}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(lead.status)}>
                        {getStatusText(lead.status)}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">Score: {lead.score}</div>
                        <div className="text-sm text-muted-foreground">
                          R$ {lead.value.toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {lead.phone}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Fonte: </span>
                        {lead.source}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Responsável: </span>
                        {lead.assignedTo}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Criado: </span>
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Último contato: </span>
                        {new Date(lead.lastContact).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  {lead.tags.length > 0 && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {lead.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{lead.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance por Vendedor */}
            <Card>
              <CardHeader>
                <CardTitle>Performance por Vendedor</CardTitle>
                <CardDescription>
                  Análise de performance individual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Maria Santos', leads: 25, closed: 8, revenue: 40000 },
                    { name: 'Carlos Lima', leads: 20, closed: 6, revenue: 35000 },
                    { name: 'Ana Silva', leads: 15, closed: 4, revenue: 20000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#8884d8" name="Leads" />
                    <Bar dataKey="closed" fill="#82ca9d" name="Fechados" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tempo de Conversão */}
            <Card>
              <CardHeader>
                <CardTitle>Tempo de Conversão</CardTitle>
                <CardDescription>
                  Análise do ciclo de vendas por fonte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { source: 'Google Ads', avgDays: 21, medianDays: 18 },
                    { source: 'LinkedIn', avgDays: 28, medianDays: 25 },
                    { source: 'Website', avgDays: 35, medianDays: 30 },
                    { source: 'Indicação', avgDays: 14, medianDays: 12 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} dias`, '']} />
                    <Bar dataKey="avgDays" fill="#8884d8" name="Média" />
                    <Bar dataKey="medianDays" fill="#82ca9d" name="Mediana" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insights e Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle>Insights e Recomendações</CardTitle>
              <CardDescription>
                Análise automatizada dos dados de leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Indicações com Melhor Performance</h4>
                    <p className="text-sm text-green-700">
                      Leads por indicação têm 25% de taxa de conversão e menor tempo de ciclo (14 dias). 
                      Considere implementar um programa de indicações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Oportunidade no Website</h4>
                    <p className="text-sm text-yellow-700">
                      Leads do website têm baixa conversão (10%) mas alto volume. 
                      Melhorar qualificação inicial pode aumentar significativamente os resultados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">LinkedIn ROI Excelente</h4>
                    <p className="text-sm text-blue-700">
                      LinkedIn apresenta o melhor ROI (2087%) com boa taxa de conversão. 
                      Aumentar investimento neste canal pode maximizar resultados.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
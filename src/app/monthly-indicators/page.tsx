'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Phone, Mail, Globe, Target, DollarSign, Download, 
  Eye, Play, MessageCircle, MapPin, Clock, Calendar, Filter, Search, BarChart3,
  Instagram, Facebook, Linkedin, Youtube, Video, MousePointer, PhoneCall, 
  ShoppingCart, CreditCard, Activity, Zap, AlertCircle, CheckCircle
} from 'lucide-react';
import { useHydrated } from '@/hooks/useHydrated';

/**
 * Dashboard de Indicadores Mensais - Trackerz
 * Exibe todos os indicadores mensais organizados por categorias
 */
export default function MonthlyIndicatorsPage() {
  const isHydrated = useHydrated();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isHydrated) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  // Dados mock simplificados
  const monthlyData = [
    { 
      month: 'Jan 2025',
      monthShort: 'Jan',
      // Publicações
      publicacoesFacebook: 25, publicacoesInstagram: 30, publicacoesLinkedIn: 15, 
      publicacoesTikTok: 20, publicacoesYoutubeShorts: 8,
      
      // Redes Sociais
      seguidoresFacebook: 12500, seguidoresInstagram: 8900, seguidoresLinkedIn: 2100, 
      seguidoresTikTok: 1500, inscritosYoutube: 850,
      
      // Leads
      leadsFacebookReativos: 20, leadsInstagramReativos: 15, leadsSiteReativos: 45, 
      leadsWhatsappRecife: 65, leadsTotal: 145,
      
      // Faturamento
      faturamentoOnline: 85000, vendasRealizadas: 42, ticketMedio: 2024,
      
      // Site
      visitasSite: 3200, usuariosSite: 2100, novosUsuarios: 1680, 
      tempoMedioEngajamento: 3.2, paginasVisitadas: 4800,
      
      // Email Marketing
      emailsEnviados: 2500, emailsAbertos: 875, clicksBotoesEmail: 125,
      
      // Telefonemas
      ligacoesRecebidasGeral: 320, ligacoesAtendidasGeral: 288, 
      percentualAtendidasGeral: 90
    },
    { 
      month: 'Fev 2025',
      monthShort: 'Fev',
      // Publicações
      publicacoesFacebook: 28, publicacoesInstagram: 32, publicacoesLinkedIn: 18, 
      publicacoesTikTok: 22, publicacoesYoutubeShorts: 10,
      
      // Redes Sociais
      seguidoresFacebook: 12750, seguidoresInstagram: 9200, seguidoresLinkedIn: 2180, 
      seguidoresTikTok: 1620, inscritosYoutube: 890,
      
      // Leads
      leadsFacebookReativos: 23, leadsInstagramReativos: 18, leadsSiteReativos: 52, 
      leadsWhatsappRecife: 72, leadsTotal: 165,
      
      // Faturamento
      faturamentoOnline: 92000, vendasRealizadas: 46, ticketMedio: 2000,
      
      // Site
      visitasSite: 3450, usuariosSite: 2280, novosUsuarios: 1824, 
      tempoMedioEngajamento: 3.3, paginasVisitadas: 5175,
      
      // Email Marketing
      emailsEnviados: 2800, emailsAbertos: 980, clicksBotoesEmail: 147,
      
      // Telefonemas
      ligacoesRecebidasGeral: 345, ligacoesAtendidasGeral: 310, 
      percentualAtendidasGeral: 89.9
    },
    { 
      month: 'Mar 2025',
      monthShort: 'Mar',
      // Publicações
      publicacoesFacebook: 30, publicacoesInstagram: 35, publicacoesLinkedIn: 20, 
      publicacoesTikTok: 25, publicacoesYoutubeShorts: 12,
      
      // Redes Sociais
      seguidoresFacebook: 13000, seguidoresInstagram: 9500, seguidoresLinkedIn: 2250, 
      seguidoresTikTok: 1750, inscritosYoutube: 920,
      
      // Leads
      leadsFacebookReativos: 26, leadsInstagramReativos: 20, leadsSiteReativos: 58, 
      leadsWhatsappRecife: 78, leadsTotal: 182,
      
      // Faturamento
      faturamentoOnline: 98000, vendasRealizadas: 49, ticketMedio: 2000,
      
      // Site
      visitasSite: 3680, usuariosSite: 2450, novosUsuarios: 1960, 
      tempoMedioEngajamento: 3.4, paginasVisitadas: 5520,
      
      // Email Marketing
      emailsEnviados: 3100, emailsAbertos: 1085, clicksBotoesEmail: 163,
      
      // Telefonemas
      ligacoesRecebidasGeral: 365, ligacoesAtendidasGeral: 328, 
      percentualAtendidasGeral: 89.9
    }
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100);
  };

  const formatGrowth = (growth: number) => {
    const formatted = Math.abs(growth).toFixed(1);
    return growth >= 0 ? `+${formatted}%` : `-${formatted}%`;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? TrendingUp : TrendingDown;
  };

  // Categorias de indicadores
  const categories = [
    { id: 'all', name: 'Todos', icon: BarChart3, count: 85 },
    { id: 'publicacoes', name: 'Publicações', icon: Eye, count: 5 },
    { id: 'social', name: 'Redes Sociais', icon: Users, count: 9 },
    { id: 'leads', name: 'Leads', icon: Target, count: 5 },
    { id: 'faturamento', name: 'Faturamento', icon: DollarSign, count: 3 },
    { id: 'site', name: 'Site', icon: Globe, count: 13 },
    { id: 'email', name: 'Email', icon: Mail, count: 9 },
    { id: 'telefone', name: 'Telefonemas', icon: Phone, count: 17 }
  ];

  // KPIs principais
  const mainKPIs = [
    {
      title: 'Leads Total',
      value: currentMonth.leadsTotal,
      previousValue: previousMonth.leadsTotal,
      icon: Target,
      color: 'blue',
      format: (val: number) => val.toString()
    },
    {
      title: 'Faturamento Online',
      value: currentMonth.faturamentoOnline,
      previousValue: previousMonth.faturamentoOnline,
      icon: DollarSign,
      color: 'green',
      format: (val: number) => `R$ ${(val / 1000).toFixed(0)}k`
    },
    {
      title: 'Seguidores Instagram',
      value: currentMonth.seguidoresInstagram,
      previousValue: previousMonth.seguidoresInstagram,
      icon: Instagram,
      color: 'purple',
      format: (val: number) => `${(val / 1000).toFixed(1)}k`
    },
    {
      title: 'Taxa Atendimento',
      value: currentMonth.percentualAtendidasGeral,
      previousValue: previousMonth.percentualAtendidasGeral,
      icon: Phone,
      color: 'yellow',
      format: (val: number) => `${val.toFixed(1)}%`
    }
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'text-yellow-600' }
  };

  return (
    <Layout title="Indicadores Mensais - Trackerz">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Indicadores Mensais</h1>
            <p className="text-gray-600 mt-1">Dashboard completo com indicadores mensais organizados</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar indicador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Mensal</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
            
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count}</div>
              </button>
            );
          })}
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainKPIs.map((kpi, index) => {
            const Icon = kpi.icon;
            const growth = calculateGrowth(kpi.value, kpi.previousValue);
            const GrowthIcon = getGrowthIcon(growth);
            const colors = colorClasses[kpi.color as keyof typeof colorClasses];
            
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${colors.bg} rounded-full`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className={`flex items-center text-sm ${getGrowthColor(growth)}`}>
                    <GrowthIcon className="w-4 h-4 mr-1" />
                    {formatGrowth(growth)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>{kpi.format(kpi.value)}</p>
                  <p className="text-xs text-gray-500 mt-1">vs mês anterior</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Gráfico de Tendência */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendência de Leads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthShort" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="leadsTotal" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Seção de Publicações */}
        {(selectedCategory === 'all' || selectedCategory === 'publicacoes') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Publicações</h2>
                <p className="text-gray-600">Conteúdo publicado por plataforma</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: 'Facebook', value: currentMonth.publicacoesFacebook, color: '#1877F2', icon: Facebook },
                { name: 'Instagram', value: currentMonth.publicacoesInstagram, color: '#E1306C', icon: Instagram },
                { name: 'LinkedIn', value: currentMonth.publicacoesLinkedIn, color: '#0A66C2', icon: Linkedin },
                { name: 'TikTok', value: currentMonth.publicacoesTikTok, color: '#000000', icon: Video },
                { name: 'YouTube Shorts', value: currentMonth.publicacoesYoutubeShorts, color: '#FF0000', icon: Youtube }
              ].map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: platform.color }} />
                    <p className="text-sm text-gray-600 mb-2">{platform.name}</p>
                    <p className="text-3xl font-bold" style={{ color: platform.color }}>{platform.value}</p>
                    <p className="text-xs text-gray-500 mt-1">posts</p>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Seção de Redes Sociais */}
        {(selectedCategory === 'all' || selectedCategory === 'social') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Redes Sociais</h2>
                <p className="text-gray-600">Seguidores e engajamento</p>
              </div>
            </div>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescimento de Seguidores</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthShort" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="seguidoresInstagram" 
                    stackId="1"
                    stroke="#E1306C" 
                    fill="#E1306C"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="seguidoresFacebook" 
                    stackId="1"
                    stroke="#1877F2" 
                    fill="#1877F2"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Seção de Leads */}
        {(selectedCategory === 'all' || selectedCategory === 'leads') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
                <p className="text-gray-600">Geração de leads por canal</p>
              </div>
            </div>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Leads</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Site', value: currentMonth.leadsSiteReativos },
                      { name: 'WhatsApp', value: currentMonth.leadsWhatsappRecife },
                      { name: 'Facebook', value: currentMonth.leadsFacebookReativos },
                      { name: 'Instagram', value: currentMonth.leadsInstagramReativos }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Site', value: currentMonth.leadsSiteReativos },
                      { name: 'WhatsApp', value: currentMonth.leadsWhatsappRecife },
                      { name: 'Facebook', value: currentMonth.leadsFacebookReativos },
                      { name: 'Instagram', value: currentMonth.leadsInstagramReativos }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Status de Implementação */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Status de Implementação</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Estrutura básica implementada</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>KPIs principais funcionais</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span>Gráficos avançados pendentes</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span>Integração com APIs pendente</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
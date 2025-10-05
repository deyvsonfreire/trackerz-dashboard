import type { 
  Platform, 
  Account, 
  Campaign, 
  DailyMetrics, 
  Customer, 
  OrganicContent, 
  MarketingIndicator, 
  KPI 
} from '@/types';

// ==========================================
// PLATAFORMAS E CONTAS
// ==========================================

export const mockPlatforms: Platform[] = [
  {
    id: '1',
    name: 'Meta Ads',
    type: 'ads',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T10:30:00'),
    accountsCount: 3,
    apiKey: 'meta_abc123def456'
  },
  {
    id: '2',
    name: 'Google Ads',
    type: 'ads',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T09:45:00'),
    accountsCount: 2,
    apiKey: 'gads_xyz789uvw012'
  },
  {
    id: '3',
    name: 'Instagram',
    type: 'social',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T11:15:00'),
    accountsCount: 1,
    apiKey: 'ig_mno345pqr678'
  },
  {
    id: '4',
    name: 'RD Station',
    type: 'crm',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T08:20:00'),
    accountsCount: 1,
    apiKey: 'rd_stu901vwx234'
  },
  {
    id: '5',
    name: 'YouTube',
    type: 'social',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T12:00:00'),
    accountsCount: 1,
    apiKey: 'yt_hij567klm890'
  },
  {
    id: '6',
    name: 'LinkedIn',
    type: 'social',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T16:30:00'),
    accountsCount: 1,
    apiKey: 'li_def123ghi456'
  },
  {
    id: '7',
    name: 'Google Analytics',
    type: 'analytics',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T13:45:00'),
    accountsCount: 1,
    apiKey: 'ga4_jkl789mno012'
  },
  {
    id: '8',
    name: '3CX Telefonia',
    type: 'crm',
    status: 'active',
    isActive: true,
    lastSync: new Date('2024-01-15T14:20:00'),
    accountsCount: 1,
    apiKey: '3cx_pqr345stu678'
  }
];

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Palma Parafusos - Meta',
    platformId: '1',
    accountId: 'act_123456789',
    status: 'active',
    isActive: true,
    budget: 15000,
    totalCampaigns: 8,
    lastSync: new Date('2024-01-15T10:30:00'),
    createdAt: new Date('2023-06-15T09:00:00'),
    metrics: {
      followers: 15420,
      engagement: 4.2,
      reach: 89500
    }
  },
  {
    id: '2',
    name: 'Palma Parafusos - Google',
    platformId: '2',
    accountId: 'gads_987654321',
    status: 'active',
    isActive: true,
    budget: 12000,
    totalCampaigns: 5,
    lastSync: new Date('2024-01-15T09:45:00'),
    createdAt: new Date('2023-08-20T14:30:00'),
    metrics: {
      followers: 0,
      engagement: 0,
      reach: 125000
    }
  },
  {
    id: '3',
    name: 'Palma Parafusos - Instagram',
    platformId: '3',
    accountId: 'ig_456789123',
    status: 'active',
    isActive: true,
    budget: 5000,
    totalCampaigns: 3,
    lastSync: new Date('2024-01-15T11:15:00'),
    createdAt: new Date('2023-05-10T16:45:00'),
    metrics: {
      followers: 8750,
      engagement: 6.8,
      reach: 45000
    }
  },
  {
    id: '4',
    name: 'Palma Parafusos - RD Station',
    platformId: '4',
    accountId: 'rd_789123456',
    status: 'active',
    isActive: true,
    budget: 8000,
    totalCampaigns: 12,
    lastSync: new Date('2024-01-15T08:20:00'),
    createdAt: new Date('2023-12-01T10:00:00'),
    metrics: {
      followers: 2340,
      engagement: 3.1,
      reach: 18500
    }
  },
  {
    id: '5',
    name: 'Palma Parafusos - YouTube',
    platformId: '5',
    accountId: 'yt_345678901',
    status: 'active',
    isActive: true,
    budget: 3000,
    totalCampaigns: 4,
    lastSync: new Date('2024-01-15T12:00:00'),
    createdAt: new Date('2023-09-15T11:30:00'),
    metrics: {
      followers: 4250,
      engagement: 5.7,
      reach: 32000
    }
  }
];

// ==========================================
// CAMPANHAS EXPANDIDAS
// ==========================================

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campanha Black Friday 2024',
    platformId: '1',
    accountId: '1',
    status: 'active',
    budget: 5000,
    spent: 3250,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    metrics: {
      impressions: 125000,
      clicks: 3250,
      conversions: 89,
      ctr: 2.6,
      cpc: 1.25
    }
  },
  {
    id: '2',
    name: 'Promoção Ferramentas',
    platformId: '2',
    accountId: '2',
    status: 'active',
    budget: 3000,
    spent: 1890,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-02-10'),
    metrics: {
      impressions: 89000,
      clicks: 2100,
      conversions: 67,
      ctr: 2.4,
      cpc: 0.90
    }
  },
  {
    id: '3',
    name: 'Lançamento Linha Premium',
    platformId: '1',
    accountId: '1',
    status: 'active',
    budget: 8000,
    spent: 5420,
    startDate: new Date('2024-01-05'),
    endDate: new Date('2024-02-05'),
    metrics: {
      impressions: 198000,
      clicks: 4950,
      conversions: 142,
      ctr: 2.5,
      cpc: 1.10
    }
  },
  {
    id: '4',
    name: 'Retargeting Carrinho Abandonado',
    platformId: '1',
    accountId: '1',
    status: 'active',
    budget: 2500,
    spent: 1680,
    startDate: new Date('2024-01-12'),
    endDate: new Date('2024-02-12'),
    metrics: {
      impressions: 45000,
      clicks: 1350,
      conversions: 78,
      ctr: 3.0,
      cpc: 1.24
    }
  },
  {
    id: '5',
    name: 'Campanha Institucional',
    platformId: '2',
    accountId: '2',
    status: 'active',
    budget: 4000,
    spent: 2340,
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-02-08'),
    metrics: {
      impressions: 156000,
      clicks: 3120,
      conversions: 45,
      ctr: 2.0,
      cpc: 0.75
    }
  },
  {
    id: '6',
    name: 'Segmentação B2B',
    platformId: '6',
    accountId: '4',
    status: 'active',
    budget: 6000,
    spent: 3890,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    metrics: {
      impressions: 78000,
      clicks: 1560,
      conversions: 89,
      ctr: 2.0,
      cpc: 2.49
    }
  },
  {
    id: '7',
    name: 'YouTube Ads - Tutoriais',
    platformId: '5',
    accountId: '5',
    status: 'active',
    budget: 2000,
    spent: 1245,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-20'),
    metrics: {
      impressions: 89000,
      clicks: 2670,
      conversions: 34,
      ctr: 3.0,
      cpc: 0.47
    }
  },
  {
    id: '8',
    name: 'Instagram Stories - Promoção',
    platformId: '3',
    accountId: '3',
    status: 'paused',
    budget: 1500,
    spent: 890,
    startDate: new Date('2024-01-18'),
    endDate: new Date('2024-02-18'),
    metrics: {
      impressions: 34000,
      clicks: 1020,
      conversions: 23,
      ctr: 3.0,
      cpc: 0.87
    }
  }
];

// ==========================================
// MÉTRICAS DIÁRIAS EXPANDIDAS
// ==========================================

export const mockDailyMetrics: DailyMetrics[] = [
  // Últimos 30 dias de dados
  ...Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    return {
      date,
      platformId: '1',
      accountId: '1',
      impressions: Math.floor(Math.random() * 5000) + 3000,
      clicks: Math.floor(Math.random() * 150) + 80,
      conversions: Math.floor(Math.random() * 8) + 2,
      spend: Math.random() * 200 + 100,
      revenue: Math.random() * 800 + 400
    };
  }),
  ...Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    return {
      date,
      platformId: '2',
      accountId: '2',
      impressions: Math.floor(Math.random() * 4000) + 2500,
      clicks: Math.floor(Math.random() * 120) + 60,
      conversions: Math.floor(Math.random() * 6) + 1,
      spend: Math.random() * 150 + 80,
      revenue: Math.random() * 600 + 300
    };
  })
];

// ==========================================
// CLIENTES E LEADS EXPANDIDOS
// ==========================================

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    source: 'Meta Ads',
    firstContact: new Date('2024-01-10'),
    lastActivity: new Date('2024-01-15'),
    status: 'customer',
    lifetime_value: 1250.00,
    tags: ['premium', 'ferramentas']
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@construtora.com',
    phone: '(11) 88888-8888',
    source: 'Google Ads',
    firstContact: new Date('2024-01-12'),
    lastActivity: new Date('2024-01-14'),
    status: 'lead',
    lifetime_value: 0,
    tags: ['construção', 'bulk']
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@metalurgica.com',
    phone: '(11) 77777-7777',
    source: 'LinkedIn',
    firstContact: new Date('2024-01-08'),
    lastActivity: new Date('2024-01-15'),
    status: 'customer',
    lifetime_value: 3450.00,
    tags: ['industrial', 'b2b', 'premium']
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@reformas.com',
    phone: '(11) 66666-6666',
    source: 'RD Station',
    firstContact: new Date('2024-01-05'),
    lastActivity: new Date('2024-01-13'),
    status: 'lead',
    lifetime_value: 0,
    tags: ['reformas', 'residencial']
  },
  {
    id: '5',
    name: 'Roberto Ferreira',
    email: 'roberto@construcoes.com',
    phone: '(11) 55555-5555',
    source: 'YouTube',
    firstContact: new Date('2024-01-03'),
    lastActivity: new Date('2024-01-12'),
    status: 'customer',
    lifetime_value: 2180.00,
    tags: ['construção', 'tutorial']
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    email: 'fernanda@arquitetura.com',
    phone: '(11) 44444-4444',
    source: 'Instagram',
    firstContact: new Date('2024-01-07'),
    lastActivity: new Date('2024-01-14'),
    status: 'lead',
    lifetime_value: 0,
    tags: ['arquitetura', 'design']
  },
  {
    id: '7',
    name: 'Pedro Almeida',
    email: 'pedro@manutencao.com',
    phone: '(11) 33333-3333',
    source: 'Meta Ads',
    firstContact: new Date('2024-01-09'),
    lastActivity: new Date('2024-01-15'),
    status: 'customer',
    lifetime_value: 890.00,
    tags: ['manutenção', 'recorrente']
  },
  {
    id: '8',
    name: 'Luciana Rocha',
    email: 'luciana@decoracao.com',
    phone: '(11) 22222-2222',
    source: 'Google Ads',
    firstContact: new Date('2024-01-11'),
     lastActivity: new Date('2024-01-13'),
     status: 'lead',
     lifetime_value: 0,
    tags: ['decoração', 'varejo']
  }
];

// ==========================================
// CONTEÚDO ORGÂNICO EXPANDIDO
// ==========================================

export const mockOrganicContent: OrganicContent[] = [
  {
    id: '1',
    platformId: '3',
    accountId: '3',
    content: 'Nova linha de parafusos premium chegou! 🔧',
    mediaType: 'image',
    publishedAt: new Date('2024-01-15T14:30:00'),
    metrics: {
      likes: 245,
      comments: 18,
      shares: 32,
      reach: 5420,
      engagement: 5.4
    }
  },
  {
    id: '2',
    platformId: '5',
    accountId: '5',
    content: 'Tutorial: Como escolher o parafuso certo para cada projeto',
    mediaType: 'video',
    publishedAt: new Date('2024-01-14T16:00:00'),
    metrics: {
      likes: 189,
      comments: 34,
      shares: 67,
      reach: 8920,
      engagement: 3.3
    }
  },
  {
    id: '3',
    platformId: '6',
    accountId: '4',
    content: 'Inovação em fixação industrial: Conheça nossa linha B2B',
    mediaType: 'carousel',
    publishedAt: new Date('2024-01-13T10:15:00'),
    metrics: {
      likes: 156,
      comments: 12,
      shares: 23,
      reach: 4560,
      engagement: 4.2
    }
  },
  {
    id: '4',
    platformId: '3',
    accountId: '3',
    content: 'Dica do dia: Organização de ferramentas no canteiro de obras 🏗️',
    mediaType: 'image',
    publishedAt: new Date('2024-01-12T09:30:00'),
    metrics: {
      likes: 312,
      comments: 28,
      shares: 45,
      reach: 7890,
      engagement: 4.9
    }
  },
  {
    id: '5',
    platformId: '5',
    accountId: '5',
    content: 'Comparativo: Parafusos galvanizados vs inox - Qual escolher?',
    mediaType: 'video',
    publishedAt: new Date('2024-01-11T15:45:00'),
    metrics: {
      likes: 278,
      comments: 56,
      shares: 89,
      reach: 12340,
      engagement: 3.4
    }
  }
];

// ==========================================
// INDICADORES DE MARKETING EXPANDIDOS
// ==========================================

export const mockMarketingIndicators: MarketingIndicator[] = [
  {
    id: '1',
    name: 'CAC (Custo de Aquisição)',
    value: 45.20,
    target: 40.00,
    period: 'monthly',
    category: 'acquisition',
    trend: 'up'
  },
  {
    id: '2',
    name: 'LTV (Lifetime Value)',
    value: 890.50,
    target: 800.00,
    period: 'monthly',
    category: 'retention',
    trend: 'up'
  },
  {
    id: '3',
    name: 'Taxa de Conversão',
    value: 2.8,
    target: 3.0,
    period: 'monthly',
    category: 'conversion',
    trend: 'down'
  },
  {
     id: '4',
     name: 'ROAS (Return on Ad Spend)',
     value: 4.2,
     target: 4.0,
     period: 'monthly',
     category: 'conversion',
     trend: 'up'
   },
  {
    id: '5',
    name: 'CTR Médio',
    value: 2.6,
    target: 2.5,
    period: 'monthly',
    category: 'engagement',
    trend: 'up'
  },
  {
     id: '6',
     name: 'CPC Médio',
     value: 1.15,
     target: 1.20,
     period: 'monthly',
     category: 'acquisition',
     trend: 'down'
   },
  {
    id: '7',
    name: 'Taxa de Rejeição',
    value: 35.2,
    target: 30.0,
    period: 'monthly',
    category: 'engagement',
    trend: 'up'
  },
  {
    id: '8',
    name: 'Tempo Médio na Página',
    value: 2.45,
    target: 3.0,
    period: 'monthly',
    category: 'engagement',
    trend: 'down'
  }
];

// ==========================================
// KPIs EXECUTIVOS EXPANDIDOS
// ==========================================

export const mockExecutiveKPIs: KPI[] = [
  {
    id: '1',
    name: 'Receita Total',
    value: 125000,
    previousValue: 118000,
    target: 130000,
    unit: 'R$',
    change: 5.9,
    changeType: 'increase',
    category: 'revenue'
  },
  {
    id: '2',
    name: 'Leads Gerados',
    value: 342,
    previousValue: 298,
    target: 350,
    unit: '',
    change: 14.8,
    changeType: 'increase',
    category: 'traffic'
  },
  {
    id: '3',
    name: 'Taxa de Conversão',
    value: 2.8,
    previousValue: 3.1,
    target: 3.0,
    unit: '%',
    change: -9.7,
    changeType: 'decrease',
    category: 'conversion'
  },
  {
    id: '4',
    name: 'Engajamento Médio',
    value: 4.2,
    previousValue: 3.9,
    target: 4.5,
    unit: '%',
    change: 7.7,
    changeType: 'increase',
    category: 'engagement'
  },
  {
    id: '5',
    name: 'ROAS Geral',
    value: 4.2,
    previousValue: 3.8,
    target: 4.5,
    unit: 'x',
    change: 10.5,
    changeType: 'increase',
    category: 'revenue'
  },
  {
     id: '6',
     name: 'CAC Médio',
     value: 45.20,
     previousValue: 48.50,
     target: 40.00,
     unit: 'R$',
     change: -6.8,
     changeType: 'decrease',
     category: 'conversion'
   },
  {
    id: '7',
    name: 'LTV Médio',
    value: 890.50,
    previousValue: 820.30,
    target: 900.00,
    unit: 'R$',
    change: 8.6,
    changeType: 'increase',
    category: 'revenue'
  },
  {
    id: '8',
    name: 'Ticket Médio',
    value: 156.80,
    previousValue: 142.90,
    target: 160.00,
    unit: 'R$',
    change: 9.7,
    changeType: 'increase',
    category: 'revenue'
  }
];

// ==========================================
// DADOS PARA TELEFONIA (3CX)
// ==========================================

export const mockPhoneMetrics = {
  totalCalls: 1247,
  answeredCalls: 1089,
  missedCalls: 158,
  averageCallDuration: 4.2, // minutos
  answerRate: 87.3, // %
  callsFromCampaigns: {
    'Meta Ads': 342,
    'Google Ads': 289,
    'Organic': 156,
    'Direct': 460
  },
  callsByHour: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    calls: Math.floor(Math.random() * 50) + 10
  })),
  conversionsBySource: {
    'Meta Ads': 89,
    'Google Ads': 67,
    'Organic': 34,
    'Direct': 123
  }
};

// ==========================================
// DADOS PARA EMAIL MARKETING
// ==========================================

export const mockEmailCampaigns = [
  {
    id: '1',
    name: 'Newsletter Semanal - Janeiro',
    subject: 'Novidades em ferramentas e parafusos',
    sentDate: new Date('2024-01-15T09:00:00'),
    recipients: 5420,
    opens: 1247,
    clicks: 189,
    conversions: 23,
    openRate: 23.0,
    clickRate: 3.5,
    conversionRate: 0.4,
    revenue: 3450.00
  },
  {
    id: '2',
    name: 'Promoção Black Friday',
    subject: 'Até 50% OFF em toda linha premium!',
    sentDate: new Date('2024-01-12T14:30:00'),
    recipients: 8930,
    opens: 3567,
    clicks: 892,
    conversions: 156,
    openRate: 39.9,
    clickRate: 10.0,
    conversionRate: 1.7,
    revenue: 18920.00
  },
  {
    id: '3',
    name: 'Tutorial - Instalação Correta',
    subject: 'Aprenda a instalar parafusos como um profissional',
    sentDate: new Date('2024-01-10T16:15:00'),
    recipients: 3240,
    opens: 1456,
    clicks: 234,
    conversions: 34,
    openRate: 44.9,
    clickRate: 7.2,
    conversionRate: 1.0,
    revenue: 2890.00
  }
];

// ==========================================
// DADOS PARA ANÁLISE DE ATRIBUIÇÃO
// ==========================================

export const mockAttributionData = {
  models: {
    firstClick: {
      'Meta Ads': 35.2,
      'Google Ads': 28.7,
      'Organic': 18.9,
      'Direct': 12.4,
      'Email': 4.8
    },
    lastClick: {
      'Meta Ads': 42.1,
      'Google Ads': 31.5,
      'Organic': 14.2,
      'Direct': 8.7,
      'Email': 3.5
    },
    linear: {
      'Meta Ads': 38.6,
      'Google Ads': 30.1,
      'Organic': 16.5,
      'Direct': 10.6,
      'Email': 4.2
    }
  },
  customerJourney: [
    {
      touchpoint: 1,
      channel: 'Google Ads',
      timestamp: new Date('2024-01-10T14:30:00'),
      value: 0
    },
    {
      touchpoint: 2,
      channel: 'Meta Ads',
      timestamp: new Date('2024-01-12T09:15:00'),
      value: 0
    },
    {
      touchpoint: 3,
      channel: 'Email',
      timestamp: new Date('2024-01-14T16:45:00'),
      value: 0
    },
    {
      touchpoint: 4,
      channel: 'Direct',
      timestamp: new Date('2024-01-15T11:20:00'),
      value: 156.80
    }
  ]
};

// ==========================================
// DADOS PARA ANÁLISE DE COORTE
// ==========================================

export const mockCohortData = {
  acquisitionCohorts: [
    {
      cohort: '2024-01',
      customers: 234,
      month0: 100,
      month1: 78,
      month2: 65,
      month3: 58,
      ltv: 890.50
    },
    {
      cohort: '2023-12',
      customers: 189,
      month0: 100,
      month1: 82,
      month2: 71,
      month3: 64,
      ltv: 1240.30
    },
    {
      cohort: '2023-11',
      customers: 156,
      month0: 100,
      month1: 75,
      month2: 62,
      month3: 55,
      ltv: 1156.80
    }
  ]
};

// ==========================================
// DADOS PARA ALERTAS E NOTIFICAÇÕES
// ==========================================

export const mockAlerts = [
  {
    id: '1',
    type: 'budget',
    severity: 'warning',
    title: 'Budget 80% utilizado',
    message: 'Campanha "Black Friday 2024" atingiu 80% do orçamento',
    timestamp: new Date('2024-01-15T14:30:00'),
    isRead: false,
    campaignId: '1'
  },
  {
    id: '2',
    type: 'performance',
    severity: 'critical',
    title: 'ROAS abaixo da meta',
    message: 'Campanha "Promoção Ferramentas" com ROAS de 2.1 (meta: 4.0)',
    timestamp: new Date('2024-01-15T13:45:00'),
    isRead: false,
    campaignId: '2'
  },
  {
    id: '3',
    type: 'opportunity',
    severity: 'info',
    title: 'Oportunidade de otimização',
    message: 'Aumente o budget da campanha "Lançamento Premium" (+15% ROAS)',
    timestamp: new Date('2024-01-15T12:20:00'),
    isRead: true,
    campaignId: '3'
  },
  {
    id: '4',
    type: 'anomaly',
    severity: 'warning',
    title: 'Anomalia detectada',
    message: 'CTR 40% abaixo da média nos últimos 3 dias',
    timestamp: new Date('2024-01-15T11:10:00'),
    isRead: false,
    campaignId: '4'
  }
];

// ==========================================
// DADOS PARA MACHINE LEARNING
// ==========================================

export const mockMLPredictions = {
  campaignPerformance: [
    {
      campaignId: '1',
      predictedROAS: 4.8,
      confidence: 87.5,
      recommendedBudget: 6200,
      factors: ['audience_quality', 'creative_performance', 'seasonality']
    },
    {
      campaignId: '2',
      predictedROAS: 3.2,
      confidence: 72.1,
      recommendedBudget: 2800,
      factors: ['keyword_competition', 'landing_page_score']
    }
  ],
  budgetOptimization: {
    currentAllocation: {
      'Meta Ads': 15000,
      'Google Ads': 12000,
      'LinkedIn': 6000,
      'YouTube': 2000
    },
    optimizedAllocation: {
      'Meta Ads': 18000,
      'Google Ads': 10000,
      'LinkedIn': 4500,
      'YouTube': 2500
    },
    expectedImprovement: 12.5 // % de melhoria no ROAS
  },
  audienceSegments: [
    {
      id: '1',
      name: 'Profissionais da Construção',
      size: 45000,
      conversionRate: 3.2,
      avgOrderValue: 189.50,
      characteristics: ['age_35_55', 'construction_industry', 'b2b']
    },
    {
      id: '2',
      name: 'Entusiastas DIY',
      size: 28000,
      conversionRate: 2.1,
      avgOrderValue: 78.90,
      characteristics: ['age_25_45', 'home_improvement', 'weekend_projects']
    }
  ]
};

// ==========================================
// DADOS PARA RELATÓRIOS AUTOMATIZADOS
// ==========================================

export const mockReports = {
  daily: {
    id: 'daily_2024_01_15',
    date: new Date('2024-01-15'),
    kpis: {
      revenue: 4250.00,
      leads: 23,
      conversions: 12,
      roas: 4.1
    },
    topCampaigns: ['1', '3', '5'],
    alerts: ['1', '2'],
    recommendations: [
      'Aumentar budget da campanha "Lançamento Premium"',
      'Pausar anúncios com CTR < 1.5%',
      'Testar novo público para "Promoção Ferramentas"'
    ]
  },
  weekly: {
    id: 'weekly_2024_w3',
    weekStart: new Date('2024-01-15'),
    weekEnd: new Date('2024-01-21'),
    summary: {
      totalRevenue: 28750.00,
      totalLeads: 156,
      totalConversions: 89,
      avgROAS: 4.2
    },
    trends: {
      revenue: 8.5, // % change vs previous week
      leads: 12.3,
      conversions: 6.7,
      roas: -2.1
    },
    insights: [
      'Meta Ads performance melhorou 15% vs semana anterior',
      'YouTube Ads gerou 34% mais leads qualificados',
      'Taxa de conversão do LinkedIn aumentou para 5.7%'
    ]
  },
  monthly: {
    id: 'monthly_2024_01',
    month: 'Janeiro 2024',
    summary: {
      totalRevenue: 125000.00,
      totalLeads: 678,
      totalConversions: 342,
      totalSpend: 29750.00,
      overallROAS: 4.2
    },
    cohortAnalysis: {
      newCustomers: 234,
      retentionRate: 78.5,
      avgLTV: 890.50
    },
    channelPerformance: {
      'Meta Ads': { revenue: 52000, roas: 4.8 },
      'Google Ads': { revenue: 38000, roas: 3.9 },
      'LinkedIn': { revenue: 23000, roas: 4.1 },
      'YouTube': { revenue: 12000, roas: 3.2 }
    }
  }
};

// ==========================================
// DADOS PARA ANÁLISE GEOGRÁFICA
// ==========================================

export const mockGeographicData = {
  salesByRegion: [
    { region: 'São Paulo', sales: 45000, leads: 234, conversion: 3.2 },
    { region: 'Rio de Janeiro', sales: 28000, leads: 156, conversion: 2.8 },
    { region: 'Minas Gerais', sales: 22000, leads: 134, conversion: 2.9 },
    { region: 'Paraná', sales: 18000, leads: 98, conversion: 3.1 },
    { region: 'Santa Catarina', sales: 12000, leads: 67, conversion: 2.7 }
  ],
  heatmapData: [
    { lat: -23.5505, lng: -46.6333, value: 45000, city: 'São Paulo' },
    { lat: -22.9068, lng: -43.1729, value: 28000, city: 'Rio de Janeiro' },
    { lat: -19.9167, lng: -43.9345, value: 22000, city: 'Belo Horizonte' },
    { lat: -25.4244, lng: -49.2654, value: 18000, city: 'Curitiba' },
    { lat: -27.5954, lng: -48.5480, value: 12000, city: 'Florianópolis' }
  ]
};

// ==========================================
// DADOS PARA ANÁLISE TEMPORAL
// ==========================================

export const mockTimeAnalysis = {
  hourlyPerformance: Array.from({ length: 24 }, (_, hour) => ({
    hour,
    impressions: Math.floor(Math.random() * 5000) + 1000,
    clicks: Math.floor(Math.random() * 200) + 50,
    conversions: Math.floor(Math.random() * 10) + 1,
    revenue: Math.random() * 1000 + 200
  })),
  dayOfWeekPerformance: [
    { day: 'Segunda', performance: 85.2 },
    { day: 'Terça', performance: 92.1 },
    { day: 'Quarta', performance: 88.7 },
    { day: 'Quinta', performance: 94.3 },
    { day: 'Sexta', performance: 96.8 },
    { day: 'Sábado', performance: 78.4 },
    { day: 'Domingo', performance: 65.9 }
  ],
  seasonalTrends: {
    'Q1': { revenue: 125000, growth: 8.5 },
    'Q2': { revenue: 142000, growth: 13.6 },
    'Q3': { revenue: 156000, growth: 9.9 },
    'Q4': { revenue: 189000, growth: 21.2 }
  }
};

// ==========================================
// DADOS PARA COMPETIDORES
// ==========================================

export const mockCompetitorData = {
  competitors: [
    {
      name: 'Concorrente A',
      marketShare: 28.5,
      adSpend: 45000,
      topKeywords: ['parafusos', 'ferramentas', 'fixação'],
      avgPosition: 2.3
    },
    {
      name: 'Concorrente B',
      marketShare: 22.1,
      adSpend: 38000,
      topKeywords: ['parafusos premium', 'fixação industrial'],
      avgPosition: 3.1
    },
    {
      name: 'Nossa Empresa',
      marketShare: 18.7,
      adSpend: 35000,
      topKeywords: ['parafusos qualidade', 'ferramentas profissionais'],
      avgPosition: 2.8
    }
  ]
};

// ==========================================
// EXPORTAÇÕES CONSOLIDADAS
// ==========================================

export const mockData = {
  platforms: mockPlatforms,
  accounts: mockAccounts,
  campaigns: mockCampaigns,
  dailyMetrics: mockDailyMetrics,
  customers: mockCustomers,
  organicContent: mockOrganicContent,
  marketingIndicators: mockMarketingIndicators,
  executiveKPIs: mockExecutiveKPIs,
  phoneMetrics: mockPhoneMetrics,
  emailCampaigns: mockEmailCampaigns,
  attributionData: mockAttributionData,
  cohortData: mockCohortData,
  alerts: mockAlerts,
  mlPredictions: mockMLPredictions,
  reports: mockReports,
  geographicData: mockGeographicData,
  timeAnalysis: mockTimeAnalysis,
  competitorData: mockCompetitorData
};

export default mockData;
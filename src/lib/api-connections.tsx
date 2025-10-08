import { Facebook, GanttChart, Bot, Waypoints, Mail } from 'lucide-react';

export const allApiConfigs = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    description: 'Sincronize dados de campanhas do Facebook e Instagram Ads.',
    icon: <Facebook />,
    features: ['Campanhas', 'Anúncios', 'Métricas de Desempenho'],
    setupUrl: '/connections/meta-ads',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Sincronize dados de campanhas do Google Ads.',
    icon: <GanttChart />,
    features: ['Campanhas', 'Palavras-chave', 'Métricas de Conversão'],
    setupUrl: '/connections/google-ads',
  },
  {
    id: 'rd-station-crm',
    name: 'RD Station CRM',
    description: 'Sincronize dados de negociações e contatos do RD Station CRM.',
    icon: <Bot />,
    features: ['Negociações', 'Contatos', 'Funil de Vendas'],
    setupUrl: '/connections/rd-station-crm',
  },
  {
    id: 'rd-station-marketing',
    name: 'RD Station Marketing',
    description: 'Sincronize dados de leads e automações do RD Station Marketing.',
    icon: <Waypoints />,
    features: ['Leads', 'Automações', 'Email Marketing'],
    setupUrl: '/connections/rd-station-marketing',
  },
  {
    id: 'rd-station-conversas',
    name: 'RD Station Conversas',
    description: 'Sincronize dados de conversas e chatbots do RD Station Conversas.',
    icon: <Mail />,
    features: ['Conversas', 'Chatbots', 'Atendentes'],
    setupUrl: '/connections/rd-station-conversas',
  },
];
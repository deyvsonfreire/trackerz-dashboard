'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { 
  Settings, 
  Key, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';

/**
 * Interface para configuração de API
 */
interface APIConfig {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSync: string;
  endpoint: string;
  hasCredentials: boolean;
  isActive: boolean;
  features: string[];
  setupUrl: string;
  icon: string;
}

/**
 * Interface para configuração geral
 */
interface GeneralConfig {
  autoSync: boolean;
  syncInterval: number;
  notifications: boolean;
  dataRetention: number;
  timezone: string;
  currency: string;
}

/**
 * Página de Configurações
 * 
 * Funcionalidades:
 * - Gerenciamento de integrações de APIs
 * - Configurações gerais do sistema
 * - Status de conexões
 * - Configuração de sincronização
 * - Gerenciamento de credenciais
 */
export default function SettingsPage() {
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
    autoSync: true,
    syncInterval: 60,
    notifications: true,
    dataRetention: 365,
    timezone: 'America/Sao_Paulo',
    currency: 'BRL'
  });

  // Mock data para configurações de APIs
  const apiConfigs: APIConfig[] = [
    {
      id: 'meta-marketing',
      name: 'Meta Marketing API',
      description: 'Facebook e Instagram Ads, insights e métricas de campanhas',
      status: 'connected',
      lastSync: '2024-01-25T10:30:00Z',
      endpoint: 'https://graph.facebook.com/v18.0',
      hasCredentials: true,
      isActive: true,
      features: ['Campanhas', 'Insights', 'Audiências', 'Criativos'],
      setupUrl: '/settings/meta-marketing',
      icon: '📘'
    },
    {
      id: 'google-ads',
      name: 'Google Ads API',
      description: 'Campanhas, palavras-chave, métricas e relatórios do Google Ads',
      status: 'connected',
      lastSync: '2024-01-25T10:25:00Z',
      endpoint: 'https://googleads.googleapis.com/v14',
      hasCredentials: true,
      isActive: true,
      features: ['Campanhas', 'Palavras-chave', 'Relatórios', 'Conversões'],
      setupUrl: '/settings/google-ads',
      icon: '🟢'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics 4',
      description: 'Dados de tráfego, comportamento e conversões do website',
      status: 'error',
      lastSync: '2024-01-24T15:20:00Z',
      endpoint: 'https://analyticsdata.googleapis.com/v1beta',
      hasCredentials: true,
      isActive: false,
      features: ['Tráfego', 'Comportamento', 'Conversões', 'E-commerce'],
      setupUrl: '/settings/google-analytics',
      icon: '📊'
    },
    {
      id: 'linkedin-ads',
      name: 'LinkedIn Ads API',
      description: 'Campanhas e métricas de publicidade no LinkedIn',
      status: 'disconnected',
      lastSync: '',
      endpoint: 'https://api.linkedin.com/v2',
      hasCredentials: false,
      isActive: false,
      features: ['Campanhas', 'Leads', 'Insights', 'Audiências'],
      setupUrl: '/settings/linkedin-ads',
      icon: '💼'
    },
    {
      id: 'tiktok-ads',
      name: 'TikTok Ads API',
      description: 'Campanhas e métricas de publicidade no TikTok',
      status: 'pending',
      lastSync: '',
      endpoint: 'https://business-api.tiktok.com/open_api/v1.3',
      hasCredentials: false,
      isActive: false,
      features: ['Campanhas', 'Criativos', 'Audiências', 'Relatórios'],
      setupUrl: '/settings/tiktok-ads',
      icon: '🎵'
    }
  ];

  /**
   * Retorna a cor do status
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Retorna o ícone do status
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'disconnected': return <XCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  /**
   * Retorna o texto do status em português
   */
  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'disconnected': return 'Desconectado';
      case 'error': return 'Erro';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  /**
   * Simula teste de conexão
   */
  const testConnection = (apiId: string) => {
    console.log(`Testando conexão para ${apiId}`);
    // Aqui seria implementada a lógica real de teste
  };

  /**
   * Simula sincronização manual
   */
  const syncData = (apiId: string) => {
    console.log(`Sincronizando dados para ${apiId}`);
    // Aqui seria implementada a lógica real de sincronização
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie integrações de APIs e configurações do sistema
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Integração
        </Button>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          {/* Status Geral das Integrações */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de APIs</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{apiConfigs.length}</div>
                <p className="text-xs text-muted-foreground">
                  Integrações configuradas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conectadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {apiConfigs.filter(api => api.status === 'connected').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Funcionando normalmente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Com Erro</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {apiConfigs.filter(api => api.status === 'error').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requerem atenção
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ativas</CardTitle>
                <Key className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {apiConfigs.filter(api => api.isActive).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sincronizando dados
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Integrações */}
          <div className="grid gap-4">
            {apiConfigs.map((api) => (
              <Card key={api.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{api.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{api.name}</CardTitle>
                        <CardDescription>{api.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(api.status)}>
                        {getStatusIcon(api.status)}
                        <span className="ml-1">{getStatusText(api.status)}</span>
                      </Badge>
                      <Switch
                        checked={api.isActive}
                        onCheckedChange={(checked: boolean) => {
                          console.log(`Toggling ${api.id} to ${checked}`);
                        }}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Funcionalidades</p>
                      <div className="flex flex-wrap gap-1">
                        {api.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Última Sincronização</p>
                      <p className="text-sm font-medium">
                        {api.lastSync 
                          ? new Date(api.lastSync).toLocaleString('pt-BR')
                          : 'Nunca sincronizado'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Credenciais</p>
                      <p className="text-sm font-medium">
                        {api.hasCredentials ? '✓ Configuradas' : '✗ Não configuradas'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link href={api.setupUrl}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                    </Link>
                    
                    {api.hasCredentials && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => testConnection(api.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Testar
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => syncData(api.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sincronizar
                        </Button>
                      </>
                    )}

                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Documentação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configurações globais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Sincronização Automática</label>
                  <p className="text-sm text-muted-foreground">
                    Sincronizar dados automaticamente em intervalos regulares
                  </p>
                </div>
                <Switch
                  checked={generalConfig.autoSync}
                  onCheckedChange={(checked: boolean) => 
                    setGeneralConfig(prev => ({ ...prev, autoSync: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Intervalo de Sincronização</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={generalConfig.syncInterval}
                  onChange={(e) => 
                    setGeneralConfig(prev => ({ ...prev, syncInterval: Number(e.target.value) }))
                  }
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={120}>2 horas</option>
                  <option value={240}>4 horas</option>
                  <option value={480}>8 horas</option>
                  <option value={1440}>24 horas</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Retenção de Dados</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={generalConfig.dataRetention}
                  onChange={(e) => 
                    setGeneralConfig(prev => ({ ...prev, dataRetention: Number(e.target.value) }))
                  }
                >
                  <option value={90}>90 dias</option>
                  <option value={180}>6 meses</option>
                  <option value={365}>1 ano</option>
                  <option value={730}>2 anos</option>
                  <option value={1095}>3 anos</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fuso Horário</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={generalConfig.timezone}
                  onChange={(e) => 
                    setGeneralConfig(prev => ({ ...prev, timezone: e.target.value }))
                  }
                >
                  <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                  <option value="America/New_York">Nova York (UTC-5)</option>
                  <option value="Europe/London">Londres (UTC+0)</option>
                  <option value="Asia/Tokyo">Tóquio (UTC+9)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Moeda Padrão</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={generalConfig.currency}
                  onChange={(e) => 
                    setGeneralConfig(prev => ({ ...prev, currency: e.target.value }))
                  }
                >
                  <option value="BRL">Real Brasileiro (BRL)</option>
                  <option value="USD">Dólar Americano (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">Libra Esterlina (GBP)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Gerencie a segurança e privacidade dos dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Criptografia de Dados</label>
                  <p className="text-sm text-muted-foreground">
                    Criptografar dados sensíveis em repouso
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Logs de Auditoria</label>
                  <p className="text-sm text-muted-foreground">
                    Registrar todas as ações do sistema
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Autenticação de Dois Fatores</label>
                  <p className="text-sm text-muted-foreground">
                    Exigir 2FA para acessar configurações sensíveis
                  </p>
                </div>
                <Switch checked={false} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rotação de Chaves API</label>
                <p className="text-sm text-muted-foreground mb-2">
                  Configurar rotação automática de chaves de API
                </p>
                <select className="w-full p-2 border rounded-md">
                  <option value="never">Nunca</option>
                  <option value="30">30 dias</option>
                  <option value="60">60 dias</option>
                  <option value="90">90 dias</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Configure quando e como receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Notificações por Email</label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações importantes por email
                  </p>
                </div>
                <Switch
                  checked={generalConfig.notifications}
                  onCheckedChange={(checked: boolean) => 
                    setGeneralConfig(prev => ({ ...prev, notifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Falhas de Sincronização</label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando uma sincronização falhar
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Relatórios Semanais</label>
                  <p className="text-sm text-muted-foreground">
                    Receber resumo semanal das métricas
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Alertas de Orçamento</label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando orçamentos estiverem próximos do limite
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Horário das Notificações</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Das</label>
                    <input 
                      type="time" 
                      className="w-full p-2 border rounded-md"
                      defaultValue="09:00"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Até</label>
                    <input 
                      type="time" 
                      className="w-full p-2 border rounded-md"
                      defaultValue="18:00"
                    />
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
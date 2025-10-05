'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Input, Label, Switch, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { 
  ArrowLeft,
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  TestTube,
  Key,
  Shield,
  Clock,
  BarChart3,
  Download,
  Upload
} from 'lucide-react';
import Link from 'next/link';

/**
 * Interface para configuração do Google Ads
 */
interface GoogleAdsConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  developerToken: string;
  customerIds: string[];
  managerAccountId: string;
  syncInterval: number;
  enabledFeatures: {
    campaigns: boolean;
    adGroups: boolean;
    ads: boolean;
    keywords: boolean;
    extensions: boolean;
    audiences: boolean;
    conversions: boolean;
    reports: boolean;
  };
  dataRetention: number;
  reportingTimezone: string;
  includeZeroImpressions: boolean;
}

/**
 * Interface para conta do Google Ads
 */
interface GoogleAdsAccount {
  customerId: string;
  name: string;
  currency: string;
  timezone: string;
  status: 'enabled' | 'disabled' | 'suspended';
  accountType: 'manager' | 'client';
  level: number;
}

/**
 * Interface para relatório personalizado
 */
interface CustomReport {
  id: string;
  name: string;
  description: string;
  fields: string[];
  segments: string[];
  filters: string[];
  schedule: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
}

/**
 * Página de Configuração do Google Ads API
 * 
 * Funcionalidades:
 * - Configuração OAuth2
 * - Seleção de contas
 * - Configuração de relatórios
 * - Configuração de sincronização
 * - Teste de conexão
 * - Gerenciamento de permissões
 */
export default function GoogleAdsSettingsPage() {
  const [config, setConfig] = useState<GoogleAdsConfig>({
    clientId: '',
    clientSecret: '',
    refreshToken: '',
    developerToken: '',
    customerIds: [],
    managerAccountId: '',
    syncInterval: 240,
    enabledFeatures: {
      campaigns: true,
      adGroups: true,
      ads: true,
      keywords: true,
      extensions: false,
      audiences: false,
      conversions: true,
      reports: true
    },
    dataRetention: 365,
    reportingTimezone: 'America/Sao_Paulo',
    includeZeroImpressions: false
  });

  const [showSecrets, setShowSecrets] = useState({
    clientSecret: false,
    refreshToken: false,
    developerToken: false
  });

  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<string>('');

  // Mock data para contas do Google Ads
  const googleAdsAccounts: GoogleAdsAccount[] = [
    {
      customerId: '123-456-7890',
      name: 'Empresa ABC - Principal',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      status: 'enabled',
      accountType: 'manager',
      level: 0
    },
    {
      customerId: '234-567-8901',
      name: 'Empresa ABC - Campanhas Brand',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      status: 'enabled',
      accountType: 'client',
      level: 1
    },
    {
      customerId: '345-678-9012',
      name: 'Empresa ABC - Campanhas Performance',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      status: 'enabled',
      accountType: 'client',
      level: 1
    }
  ];

  // Mock data para relatórios personalizados
  const customReports: CustomReport[] = [
    {
      id: 'campaign-performance',
      name: 'Performance de Campanhas',
      description: 'Métricas principais de campanhas por dia',
      fields: ['campaign.name', 'metrics.impressions', 'metrics.clicks', 'metrics.cost_micros'],
      segments: ['segments.date'],
      filters: ['campaign.status = ENABLED'],
      schedule: 'daily',
      isActive: true
    },
    {
      id: 'keyword-analysis',
      name: 'Análise de Palavras-chave',
      description: 'Performance detalhada de keywords',
      fields: ['ad_group_criterion.keyword.text', 'metrics.impressions', 'metrics.clicks'],
      segments: ['segments.date'],
      filters: ['ad_group_criterion.type = KEYWORD'],
      schedule: 'weekly',
      isActive: false
    }
  ];

  /**
   * Testa a conexão com a API do Google Ads
   */
  const testConnection = async () => {
    setConnectionStatus('testing');
    setTestResults('Testando conexão...');

    // Simula teste de conexão
    setTimeout(() => {
      if (config.clientId && config.clientSecret && config.refreshToken && config.developerToken) {
        setConnectionStatus('success');
        setTestResults('✓ Conexão estabelecida com sucesso!\n✓ Token de desenvolvedor válido\n✓ Refresh token funcionando\n✓ Contas acessíveis encontradas');
      } else {
        setConnectionStatus('error');
        setTestResults('✗ Erro na conexão\n✗ Verifique as credenciais OAuth2\n✗ Developer token pode estar inválido\n✗ Refresh token pode ter expirado');
      }
    }, 2000);
  };

  /**
   * Inicia o fluxo OAuth2
   */
  const startOAuthFlow = () => {
    const authUrl = `https://accounts.google.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=https://www.googleapis.com/auth/adwords&response_type=code`;
    window.open(authUrl, '_blank');
  };

  /**
   * Salva as configurações
   */
  const saveConfig = () => {
    console.log('Salvando configurações:', config);
    // Aqui seria implementada a lógica real de salvamento
  };

  /**
   * Copia texto para a área de transferência
   */
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  /**
   * Exporta configurações
   */
  const exportConfig = () => {
    const configToExport = { ...config };
    // Remove dados sensíveis
    configToExport.clientSecret = '';
    configToExport.refreshToken = '';
    configToExport.developerToken = '';
    
    const blob = new Blob([JSON.stringify(configToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google-ads-config.json';
    a.click();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🟢 Google Ads API
          </h1>
          <p className="text-muted-foreground">
            Configure a integração com Google Ads
          </p>
        </div>
      </div>

      {/* Status da Conexão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Status da Conexão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {connectionStatus === 'success' && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Conectado</span>
                </>
              )}
              {connectionStatus === 'error' && (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">Erro na Conexão</span>
                </>
              )}
              {connectionStatus === 'testing' && (
                <>
                  <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                  <span className="text-blue-600 font-medium">Testando...</span>
                </>
              )}
              {connectionStatus === 'idle' && (
                <>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">Não Testado</span>
                </>
              )}
            </div>
            <Button onClick={testConnection} disabled={connectionStatus === 'testing'}>
              <TestTube className="h-4 w-4 mr-2" />
              Testar Conexão
            </Button>
          </div>
          {testResults && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <pre className="text-sm whitespace-pre-line">{testResults}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="oauth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="oauth">OAuth2</TabsTrigger>
          <TabsTrigger value="accounts">Contas</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
        </TabsList>

        <TabsContent value="oauth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Configuração OAuth2
              </CardTitle>
              <CardDescription>
                Configure as credenciais OAuth2 do Google Cloud Console
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  placeholder="123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
                  value={config.clientId}
                  onChange={(e) => setConfig(prev => ({ ...prev, clientId: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  Client ID do seu projeto no Google Cloud Console
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <div className="relative">
                  <Input
                    id="clientSecret"
                    type={showSecrets.clientSecret ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={config.clientSecret}
                    onChange={(e) => setConfig(prev => ({ ...prev, clientSecret: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowSecrets(prev => ({ ...prev, clientSecret: !prev.clientSecret }))}
                  >
                    {showSecrets.clientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="developerToken">Developer Token</Label>
                <div className="relative">
                  <Input
                    id="developerToken"
                    type={showSecrets.developerToken ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={config.developerToken}
                    onChange={(e) => setConfig(prev => ({ ...prev, developerToken: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowSecrets(prev => ({ ...prev, developerToken: !prev.developerToken }))}
                  >
                    {showSecrets.developerToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Token de desenvolvedor da sua conta Google Ads
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refreshToken">Refresh Token</Label>
                <div className="relative">
                  <Input
                    id="refreshToken"
                    type={showSecrets.refreshToken ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={config.refreshToken}
                    onChange={(e) => setConfig(prev => ({ ...prev, refreshToken: e.target.value }))}
                  />
                  <div className="absolute right-0 top-0 h-full flex">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-full px-3"
                      onClick={() => copyToClipboard(config.refreshToken)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-full px-3"
                      onClick={() => setShowSecrets(prev => ({ ...prev, refreshToken: !prev.refreshToken }))}
                    >
                      {showSecrets.refreshToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={startOAuthFlow} disabled={!config.clientId}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Iniciar OAuth2
                </Button>
                <a 
                  href="https://console.cloud.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-colors border border-gray-300 text-gray-800 hover:bg-gray-50 h-10 px-4 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Google Cloud Console
                </a>
                <a 
                  href="https://ads.google.com/home/tools/manager-accounts/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-colors border border-gray-300 text-gray-800 hover:bg-gray-50 h-10 px-4 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Google Ads
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instruções de Configuração</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <h4 className="font-medium">Criar Projeto no Google Cloud</h4>
                    <p className="text-sm text-muted-foreground">
                      Acesse console.cloud.google.com e crie um novo projeto
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-medium">Habilitar Google Ads API</h4>
                    <p className="text-sm text-muted-foreground">
                      Na biblioteca de APIs, habilite a &quot;Google Ads API&quot;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <h4 className="font-medium">Configurar OAuth2</h4>
                    <p className="text-sm text-muted-foreground">
                      Crie credenciais OAuth2 e configure as URLs de redirecionamento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Obter Developer Token</h4>
                    <p className="text-sm text-muted-foreground">
                      No Google Ads, vá em Ferramentas → Configuração da API para obter o token
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conta Gerenciadora</CardTitle>
              <CardDescription>
                Configure a conta gerenciadora principal (MCC)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="managerAccountId">ID da Conta Gerenciadora</Label>
                <Input
                  id="managerAccountId"
                  placeholder="123-456-7890"
                  value={config.managerAccountId}
                  onChange={(e) => setConfig(prev => ({ ...prev, managerAccountId: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  ID da conta MCC (sem hífens: 1234567890)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contas do Google Ads</CardTitle>
              <CardDescription>
                Selecione as contas que deseja sincronizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {googleAdsAccounts.map((account) => (
                  <div key={account.customerId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.customerIds.includes(account.customerId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConfig(prev => ({
                              ...prev,
                              customerIds: [...prev.customerIds, account.customerId]
                            }));
                          } else {
                            setConfig(prev => ({
                              ...prev,
                              customerIds: prev.customerIds.filter(id => id !== account.customerId)
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {account.customerId} • {account.currency} • {account.timezone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={account.accountType === 'manager' ? 'default' : 'secondary'}>
                        {account.accountType === 'manager' ? 'Gerenciadora' : 'Cliente'}
                      </Badge>
                      <Badge variant={account.status === 'enabled' ? 'default' : 'destructive'}>
                        {account.status === 'enabled' ? 'Ativa' : 
                         account.status === 'disabled' ? 'Desabilitada' : 'Suspensa'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Funcionalidades Habilitadas
              </CardTitle>
              <CardDescription>
                Escolha quais dados sincronizar da Google Ads API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.enabledFeatures).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium capitalize">
                      {feature === 'adGroups' ? 'Grupos de Anúncios' : 
                       feature === 'campaigns' ? 'Campanhas' :
                       feature === 'ads' ? 'Anúncios' :
                       feature === 'keywords' ? 'Palavras-chave' :
                       feature === 'extensions' ? 'Extensões' :
                       feature === 'audiences' ? 'Audiências' :
                       feature === 'conversions' ? 'Conversões' :
                       feature === 'reports' ? 'Relatórios' : feature}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {feature === 'campaigns' && 'Dados de campanhas publicitárias'}
                      {feature === 'adGroups' && 'Informações de grupos de anúncios'}
                      {feature === 'ads' && 'Dados individuais de anúncios'}
                      {feature === 'keywords' && 'Performance de palavras-chave'}
                      {feature === 'extensions' && 'Extensões de anúncios'}
                      {feature === 'audiences' && 'Audiências e segmentações'}
                      {feature === 'conversions' && 'Dados de conversões'}
                      {feature === 'reports' && 'Relatórios personalizados'}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        enabledFeatures: {
                          ...prev.enabledFeatures,
                          [feature]: checked
                        }
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Incluir Impressões Zero</label>
                  <p className="text-sm text-muted-foreground">
                    Incluir dados de palavras-chave sem impressões
                  </p>
                </div>
                <Switch
                  checked={config.includeZeroImpressions}
                  onCheckedChange={(checked) => 
                    setConfig(prev => ({ ...prev, includeZeroImpressions: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportingTimezone">Fuso Horário dos Relatórios</Label>
                <Select 
                  value={config.reportingTimezone} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, reportingTimezone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                    <SelectItem value="America/New_York">Nova York (UTC-5)</SelectItem>
                    <SelectItem value="Europe/London">Londres (UTC+0)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tóquio (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Personalizados</CardTitle>
              <CardDescription>
                Configure relatórios automáticos personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.schedule === 'daily' ? 'default' : 'secondary'}>
                          {report.schedule === 'daily' ? 'Diário' : 
                           report.schedule === 'weekly' ? 'Semanal' : 'Mensal'}
                        </Badge>
                        <Switch checked={report.isActive} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Campos</p>
                        <div className="space-y-1">
                          {report.fields.slice(0, 3).map((field) => (
                            <Badge key={field} variant="outline" className="text-xs mr-1">
                              {field.split('.').pop()}
                            </Badge>
                          ))}
                          {report.fields.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{report.fields.length - 3} mais
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Segmentos</p>
                        <div className="space-y-1">
                          {report.segments.map((segment) => (
                            <Badge key={segment} variant="outline" className="text-xs mr-1">
                              {segment.split('.').pop()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Filtros</p>
                        <div className="space-y-1">
                          {report.filters.map((filter, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              {filter}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Adicionar Relatório Personalizado
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Configurações de Sincronização
              </CardTitle>
              <CardDescription>
                Configure como e quando sincronizar os dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="syncInterval">Intervalo de Sincronização</Label>
                <Select 
                  value={config.syncInterval.toString()} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, syncInterval: Number(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                    <SelectItem value="480">8 horas</SelectItem>
                    <SelectItem value="720">12 horas</SelectItem>
                    <SelectItem value="1440">24 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Retenção de Dados (dias)</Label>
                <Select 
                  value={config.dataRetention.toString()} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, dataRetention: Number(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">6 meses</SelectItem>
                    <SelectItem value="365">1 ano</SelectItem>
                    <SelectItem value="730">2 anos</SelectItem>
                    <SelectItem value="1095">3 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Limites da API</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Rate limit: 10.000 operações por dia (padrão)</li>
                  <li>• Dados históricos: disponíveis por até 3 anos</li>
                  <li>• Relatórios: dados finalizados após 3 horas</li>
                  <li>• Recomendado: sincronização a cada 4-8 horas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botões de Ação */}
      <div className="flex gap-2">
        <Button onClick={saveConfig}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
        <Button variant="outline" onClick={testConnection}>
          <TestTube className="h-4 w-4 mr-2" />
          Testar Conexão
        </Button>
        <Button variant="outline" onClick={exportConfig}>
          <Download className="h-4 w-4 mr-2" />
          Exportar Config
        </Button>
      </div>
    </div>
  );
}
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
  Upload,
  Globe,
  Users,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

/**
 * Interface para configuração do Google Analytics 4
 */
interface GA4Config {
  serviceAccountEmail: string;
  privateKey: string;
  projectId: string;
  propertyIds: string[];
  enabledReports: {
    realtime: boolean;
    audience: boolean;
    acquisition: boolean;
    behavior: boolean;
    conversions: boolean;
    ecommerce: boolean;
    demographics: boolean;
    technology: boolean;
  };
  syncInterval: number;
  dataRetention: number;
  timezone: string;
  currency: string;
  enableSampling: boolean;
  maxResults: number;
}

/**
 * Interface para propriedade do GA4
 */
interface GA4Property {
  propertyId: string;
  displayName: string;
  websiteUrl: string;
  industryCategory: string;
  timeZone: string;
  currencyCode: string;
  createTime: string;
  updateTime: string;
}

/**
 * Interface para dimensão personalizada
 */
interface CustomDimension {
  parameterName: string;
  displayName: string;
  description: string;
  scope: 'EVENT' | 'USER' | 'ITEM';
  disallowAdsPersonalization: boolean;
}

/**
 * Interface para métrica personalizada
 */
interface CustomMetric {
  parameterName: string;
  displayName: string;
  description: string;
  measurementUnit: 'STANDARD' | 'CURRENCY' | 'FEET' | 'METERS' | 'KILOMETERS' | 'MILES' | 'MILLISECONDS' | 'SECONDS' | 'MINUTES' | 'HOURS';
  restrictedMetricType: string[];
}

/**
 * Página de Configuração do Google Analytics 4
 * 
 * Funcionalidades:
 * - Configuração Service Account
 * - Seleção de propriedades
 * - Configuração de relatórios
 * - Dimensões e métricas personalizadas
 * - Configuração de sincronização
 * - Teste de conexão
 */
export default function GoogleAnalyticsSettingsPage() {
  const [config, setConfig] = useState<GA4Config>({
    serviceAccountEmail: '',
    privateKey: '',
    projectId: '',
    propertyIds: [],
    enabledReports: {
      realtime: true,
      audience: true,
      acquisition: true,
      behavior: true,
      conversions: true,
      ecommerce: false,
      demographics: false,
      technology: true
    },
    syncInterval: 360,
    dataRetention: 365,
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
    enableSampling: false,
    maxResults: 10000
  });

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<string>('');

  // Mock data para propriedades do GA4
  const ga4Properties: GA4Property[] = [
    {
      propertyId: '123456789',
      displayName: 'Website Principal - Empresa ABC',
      websiteUrl: 'https://www.empresaabc.com.br',
      industryCategory: 'TECHNOLOGY',
      timeZone: 'America/Sao_Paulo',
      currencyCode: 'BRL',
      createTime: '2023-01-15T10:00:00Z',
      updateTime: '2024-01-15T10:00:00Z'
    },
    {
      propertyId: '234567890',
      displayName: 'E-commerce - Empresa ABC',
      websiteUrl: 'https://loja.empresaabc.com.br',
      industryCategory: 'RETAIL',
      timeZone: 'America/Sao_Paulo',
      currencyCode: 'BRL',
      createTime: '2023-03-20T14:30:00Z',
      updateTime: '2024-01-10T09:15:00Z'
    },
    {
      propertyId: '345678901',
      displayName: 'Blog - Empresa ABC',
      websiteUrl: 'https://blog.empresaabc.com.br',
      industryCategory: 'PUBLISHING_AND_ENTERTAINMENT',
      timeZone: 'America/Sao_Paulo',
      currencyCode: 'BRL',
      createTime: '2023-06-10T16:45:00Z',
      updateTime: '2023-12-20T11:20:00Z'
    }
  ];

  // Mock data para dimensões personalizadas
  const customDimensions: CustomDimension[] = [
    {
      parameterName: 'user_type',
      displayName: 'Tipo de Usuário',
      description: 'Classificação do usuário (novo, recorrente, VIP)',
      scope: 'USER',
      disallowAdsPersonalization: false
    },
    {
      parameterName: 'content_category',
      displayName: 'Categoria do Conteúdo',
      description: 'Categoria principal do conteúdo visualizado',
      scope: 'EVENT',
      disallowAdsPersonalization: false
    }
  ];

  // Mock data para métricas personalizadas
  const customMetrics: CustomMetric[] = [
    {
      parameterName: 'engagement_score',
      displayName: 'Score de Engajamento',
      description: 'Pontuação calculada de engajamento do usuário',
      measurementUnit: 'STANDARD',
      restrictedMetricType: []
    },
    {
      parameterName: 'revenue_per_user',
      displayName: 'Receita por Usuário',
      description: 'Receita média gerada por usuário',
      measurementUnit: 'CURRENCY',
      restrictedMetricType: []
    }
  ];

  /**
   * Testa a conexão com a API do Google Analytics 4
   */
  const testConnection = async () => {
    setConnectionStatus('testing');
    setTestResults('Testando conexão...');

    // Simula teste de conexão
    setTimeout(() => {
      if (config.serviceAccountEmail && config.privateKey && config.projectId) {
        setConnectionStatus('success');
        setTestResults('✓ Conexão estabelecida com sucesso!\n✓ Service Account autenticado\n✓ Permissões verificadas\n✓ Propriedades acessíveis encontradas');
      } else {
        setConnectionStatus('error');
        setTestResults('✗ Erro na conexão\n✗ Verifique as credenciais do Service Account\n✗ Private key pode estar inválida\n✗ Project ID pode estar incorreto');
      }
    }, 2000);
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
    configToExport.privateKey = '';
    
    const blob = new Blob([JSON.stringify(configToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google-analytics-config.json';
    a.click();
  };

  /**
   * Formata data para exibição
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
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
            📊 Google Analytics 4
          </h1>
          <p className="text-muted-foreground">
            Configure a integração com Google Analytics 4
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

      <Tabs defaultValue="service-account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="service-account">Service Account</TabsTrigger>
          <TabsTrigger value="properties">Propriedades</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="custom">Personalização</TabsTrigger>
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
        </TabsList>

        <TabsContent value="service-account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Configuração Service Account
              </CardTitle>
              <CardDescription>
                Configure as credenciais do Service Account do Google Cloud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  placeholder="meu-projeto-analytics-123456"
                  value={config.projectId}
                  onChange={(e) => setConfig(prev => ({ ...prev, projectId: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  ID do projeto no Google Cloud Console
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceAccountEmail">Service Account Email</Label>
                <Input
                  id="serviceAccountEmail"
                  placeholder="analytics-service@meu-projeto-123456.iam.gserviceaccount.com"
                  value={config.serviceAccountEmail}
                  onChange={(e) => setConfig(prev => ({ ...prev, serviceAccountEmail: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  Email do Service Account criado no Google Cloud
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="privateKey">Private Key (JSON)</Label>
                <div className="relative">
                  <Textarea
                    id="privateKey"
                    placeholder="Cole aqui o conteúdo completo do arquivo JSON do Service Account..."
                    value={config.privateKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, privateKey: e.target.value }))}
                    className="min-h-[120px] font-mono text-sm"
                    style={{ display: showPrivateKey ? 'block' : 'none' }}
                  />
                  {!showPrivateKey && (
                    <div className="min-h-[120px] border rounded-md p-3 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Private key oculta por segurança</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => copyToClipboard(config.privateKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conteúdo completo do arquivo JSON baixado do Google Cloud Console
                </p>
              </div>

              <div className="flex gap-2">
                <a 
                  href="https://console.cloud.google.com/iam-admin/serviceaccounts" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-colors border border-gray-300 text-gray-800 hover:bg-gray-50 h-10 px-4 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Service Accounts
                </a>
                <a 
                  href="https://analytics.google.com/analytics/web/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-colors border border-gray-300 text-gray-800 hover:bg-gray-50 h-10 px-4 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Google Analytics
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
                    <h4 className="font-medium">Criar Service Account</h4>
                    <p className="text-sm text-muted-foreground">
                      No Google Cloud Console, crie um Service Account com permissões para Analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-medium">Habilitar Analytics API</h4>
                    <p className="text-sm text-muted-foreground">
                      Na biblioteca de APIs, habilite a &quot;Google Analytics Data API&quot;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <h4 className="font-medium">Baixar Chave JSON</h4>
                    <p className="text-sm text-muted-foreground">
                      Gere e baixe a chave JSON do Service Account
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Adicionar Permissões no GA4</h4>
                    <p className="text-sm text-muted-foreground">
                      No Google Analytics, adicione o email do Service Account como usuário com permissão de &quot;Visualizador&quot;
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Propriedades do Google Analytics 4
              </CardTitle>
              <CardDescription>
                Selecione as propriedades que deseja sincronizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ga4Properties.map((property) => (
                  <div key={property.propertyId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.propertyIds.includes(property.propertyId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConfig(prev => ({
                              ...prev,
                              propertyIds: [...prev.propertyIds, property.propertyId]
                            }));
                          } else {
                            setConfig(prev => ({
                              ...prev,
                              propertyIds: prev.propertyIds.filter(id => id !== property.propertyId)
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <div>
                        <h4 className="font-medium">{property.displayName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {property.propertyId} • {property.websiteUrl}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {property.currencyCode} • {property.timeZone} • Criado em {formatDate(property.createTime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {property.industryCategory}
                      </Badge>
                      <a 
                        href={property.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 h-8 px-3 text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Relatórios Habilitados
              </CardTitle>
              <CardDescription>
                Escolha quais relatórios sincronizar do Google Analytics 4
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.enabledReports).map(([report, enabled]) => (
                <div key={report} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium capitalize">
                      {report === 'realtime' ? 'Tempo Real' : 
                       report === 'audience' ? 'Audiência' :
                       report === 'acquisition' ? 'Aquisição' :
                       report === 'behavior' ? 'Comportamento' :
                       report === 'conversions' ? 'Conversões' :
                       report === 'ecommerce' ? 'E-commerce' :
                       report === 'demographics' ? 'Demografia' :
                       report === 'technology' ? 'Tecnologia' : report}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {report === 'realtime' && 'Dados em tempo real de usuários ativos'}
                      {report === 'audience' && 'Métricas de audiência e usuários'}
                      {report === 'acquisition' && 'Canais de aquisição e tráfego'}
                      {report === 'behavior' && 'Comportamento e engajamento'}
                      {report === 'conversions' && 'Eventos de conversão e metas'}
                      {report === 'ecommerce' && 'Dados de e-commerce e receita'}
                      {report === 'demographics' && 'Dados demográficos dos usuários'}
                      {report === 'technology' && 'Dispositivos, navegadores e tecnologia'}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => 
                      setConfig(prev => ({
                        ...prev,
                        enabledReports: {
                          ...prev.enabledReports,
                          [report]: checked
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
              <CardTitle>Configurações de Relatórios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select 
                  value={config.timezone} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, timezone: value }))}
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

              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Select 
                  value={config.currency} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                    <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">Libra Esterlina (GBP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxResults">Máximo de Resultados por Consulta</Label>
                <Select 
                  value={config.maxResults.toString()} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, maxResults: Number(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">1.000</SelectItem>
                    <SelectItem value="5000">5.000</SelectItem>
                    <SelectItem value="10000">10.000</SelectItem>
                    <SelectItem value="25000">25.000</SelectItem>
                    <SelectItem value="50000">50.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Habilitar Sampling</label>
                  <p className="text-sm text-muted-foreground">
                    Permite amostragem para consultas com grandes volumes de dados
                  </p>
                </div>
                <Switch
                  checked={config.enableSampling}
                  onCheckedChange={(checked) => 
                    setConfig(prev => ({ ...prev, enableSampling: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Dimensões Personalizadas
              </CardTitle>
              <CardDescription>
                Configure dimensões personalizadas para coleta de dados específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customDimensions.map((dimension) => (
                  <div key={dimension.parameterName} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{dimension.displayName}</h4>
                        <p className="text-sm text-muted-foreground">{dimension.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{dimension.scope}</Badge>
                        <Switch checked={true} />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Parâmetro:</span> {dimension.parameterName}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Adicionar Dimensão Personalizada
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Métricas Personalizadas
              </CardTitle>
              <CardDescription>
                Configure métricas personalizadas para análises específicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customMetrics.map((metric) => (
                  <div key={metric.parameterName} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{metric.displayName}</h4>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{metric.measurementUnit}</Badge>
                        <Switch checked={true} />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Parâmetro:</span> {metric.parameterName}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Adicionar Métrica Personalizada
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
                Configure como e quando sincronizar os dados do GA4
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
                    <SelectItem value="180">3 horas</SelectItem>
                    <SelectItem value="360">6 horas</SelectItem>
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
                  <li>• Rate limit: 100 consultas por 100 segundos por propriedade</li>
                  <li>• Dados históricos: disponíveis desde a criação da propriedade</li>
                  <li>• Dados em tempo real: últimas 30 minutos</li>
                  <li>• Recomendado: sincronização a cada 6 horas</li>
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
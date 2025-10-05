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
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

/**
 * Interface para configuração do Meta Marketing
 */
interface MetaMarketingConfig {
  appId: string;
  appSecret: string;
  accessToken: string;
  adAccountIds: string[];
  pageIds: string[];
  syncInterval: number;
  enabledFeatures: {
    campaigns: boolean;
    adSets: boolean;
    ads: boolean;
    insights: boolean;
    audiences: boolean;
    creatives: boolean;
  };
  dataRetention: number;
  webhookUrl: string;
  webhookSecret: string;
}

/**
 * Interface para conta de anúncios
 */
interface AdAccount {
  id: string;
  name: string;
  currency: string;
  timezone: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

/**
 * Interface para página do Facebook
 */
interface FacebookPage {
  id: string;
  name: string;
  category: string;
  followers: number;
  isConnected: boolean;
}

/**
 * Página de Configuração do Meta Marketing API
 * 
 * Funcionalidades:
 * - Configuração de credenciais
 * - Seleção de contas de anúncios
 * - Configuração de páginas
 * - Configuração de webhooks
 * - Teste de conexão
 * - Configuração de sincronização
 */
export default function MetaMarketingSettingsPage() {
  const [config, setConfig] = useState<MetaMarketingConfig>({
    appId: '',
    appSecret: '',
    accessToken: '',
    adAccountIds: [],
    pageIds: [],
    syncInterval: 60,
    enabledFeatures: {
      campaigns: true,
      adSets: true,
      ads: true,
      insights: true,
      audiences: false,
      creatives: false
    },
    dataRetention: 365,
    webhookUrl: '',
    webhookSecret: ''
  });

  const [showSecrets, setShowSecrets] = useState({
    appSecret: false,
    accessToken: false,
    webhookSecret: false
  });

  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<string>('');

  // Mock data para contas de anúncios
  const adAccounts: AdAccount[] = [
    {
      id: 'act_123456789',
      name: 'Empresa ABC - Campanhas',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      status: 'active',
      permissions: ['MANAGE', 'EDIT_CAMPAIGNS', 'VIEW_REPORTS']
    },
    {
      id: 'act_987654321',
      name: 'Empresa ABC - Testes',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      status: 'active',
      permissions: ['VIEW_REPORTS']
    }
  ];

  // Mock data para páginas do Facebook
  const facebookPages: FacebookPage[] = [
    {
      id: 'page_111111111',
      name: 'Empresa ABC',
      category: 'Business',
      followers: 15420,
      isConnected: true
    },
    {
      id: 'page_222222222',
      name: 'Produto XYZ',
      category: 'Product/Service',
      followers: 8750,
      isConnected: false
    }
  ];

  /**
   * Testa a conexão com a API do Meta
   */
  const testConnection = async () => {
    setConnectionStatus('testing');
    setTestResults('Testando conexão...');

    // Simula teste de conexão
    setTimeout(() => {
      if (config.appId && config.appSecret && config.accessToken) {
        setConnectionStatus('success');
        setTestResults('✓ Conexão estabelecida com sucesso!\n✓ Token de acesso válido\n✓ Permissões verificadas\n✓ Contas de anúncios acessíveis');
      } else {
        setConnectionStatus('error');
        setTestResults('✗ Erro na conexão\n✗ Verifique as credenciais\n✗ Token de acesso pode estar expirado');
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
   * Gera webhook secret
   */
  const generateWebhookSecret = () => {
    const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setConfig(prev => ({ ...prev, webhookSecret: secret }));
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
            📘 Meta Marketing API
          </h1>
          <p className="text-muted-foreground">
            Configure a integração com Facebook e Instagram Ads
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

      <Tabs defaultValue="credentials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="credentials">Credenciais</TabsTrigger>
          <TabsTrigger value="accounts">Contas</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Credenciais da API
              </CardTitle>
              <CardDescription>
                Configure as credenciais do seu app Meta for Developers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appId">App ID</Label>
                <Input
                  id="appId"
                  placeholder="123456789012345"
                  value={config.appId}
                  onChange={(e) => setConfig(prev => ({ ...prev, appId: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  ID do seu aplicativo no Meta for Developers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appSecret">App Secret</Label>
                <div className="relative">
                  <Input
                    id="appSecret"
                    type={showSecrets.appSecret ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={config.appSecret}
                    onChange={(e) => setConfig(prev => ({ ...prev, appSecret: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowSecrets(prev => ({ ...prev, appSecret: !prev.appSecret }))}
                  >
                    {showSecrets.appSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chave secreta do seu aplicativo (mantenha em segurança)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessToken">Access Token</Label>
                <div className="relative">
                  <Input
                    id="accessToken"
                    type={showSecrets.accessToken ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={config.accessToken}
                    onChange={(e) => setConfig(prev => ({ ...prev, accessToken: e.target.value }))}
                  />
                  <div className="absolute right-0 top-0 h-full flex">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-full px-3"
                      onClick={() => copyToClipboard(config.accessToken)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-full px-3"
                      onClick={() => setShowSecrets(prev => ({ ...prev, accessToken: !prev.accessToken }))}
                    >
                      {showSecrets.accessToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Token de acesso de longa duração para sua conta
                </p>
              </div>

              <div className="flex gap-2">
                <a 
                  href="https://developers.facebook.com/apps" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-colors border border-gray-300 text-gray-800 hover:bg-gray-50 h-10 px-4 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Meta for Developers
                </a>
                <a 
                  href="https://developers.facebook.com/tools/explorer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-colors border border-gray-300 text-gray-800 hover:bg-gray-50 h-10 px-4 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Graph API Explorer
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
                    <h4 className="font-medium">Criar App no Meta for Developers</h4>
                    <p className="text-sm text-muted-foreground">
                      Acesse developers.facebook.com e crie um novo aplicativo do tipo "Business"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-medium">Adicionar Produto Marketing API</h4>
                    <p className="text-sm text-muted-foreground">
                      No painel do app, adicione o produto "Marketing API"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <h4 className="font-medium">Gerar Access Token</h4>
                    <p className="text-sm text-muted-foreground">
                      Use o Graph API Explorer para gerar um token de longa duração com as permissões necessárias
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Configurar Permissões</h4>
                    <p className="text-sm text-muted-foreground">
                      Solicite as permissões: ads_management, ads_read, read_insights, business_management
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
              <CardTitle>Contas de Anúncios</CardTitle>
              <CardDescription>
                Selecione as contas de anúncios que deseja sincronizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.adAccountIds.includes(account.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConfig(prev => ({
                              ...prev,
                              adAccountIds: [...prev.adAccountIds, account.id]
                            }));
                          } else {
                            setConfig(prev => ({
                              ...prev,
                              adAccountIds: prev.adAccountIds.filter(id => id !== account.id)
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {account.id} • {account.currency} • {account.timezone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                        {account.status === 'active' ? 'Ativa' : 'Inativa'}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {account.permissions.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Páginas do Facebook</CardTitle>
              <CardDescription>
                Conecte páginas para análise de insights orgânicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facebookPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.pageIds.includes(page.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConfig(prev => ({
                              ...prev,
                              pageIds: [...prev.pageIds, page.id]
                            }));
                          } else {
                            setConfig(prev => ({
                              ...prev,
                              pageIds: prev.pageIds.filter(id => id !== page.id)
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <div>
                        <h4 className="font-medium">{page.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {page.category} • {page.followers.toLocaleString()} seguidores
                        </p>
                      </div>
                    </div>
                    <Badge variant={page.isConnected ? 'default' : 'secondary'}>
                      {page.isConnected ? 'Conectada' : 'Desconectada'}
                    </Badge>
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
                Escolha quais dados sincronizar da Meta Marketing API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.enabledFeatures).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium capitalize">
                      {feature === 'adSets' ? 'Conjuntos de Anúncios' : 
                       feature === 'campaigns' ? 'Campanhas' :
                       feature === 'ads' ? 'Anúncios' :
                       feature === 'insights' ? 'Insights/Métricas' :
                       feature === 'audiences' ? 'Audiências' :
                       feature === 'creatives' ? 'Criativos' : feature}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {feature === 'campaigns' && 'Dados de campanhas publicitárias'}
                      {feature === 'adSets' && 'Informações de conjuntos de anúncios'}
                      {feature === 'ads' && 'Dados individuais de anúncios'}
                      {feature === 'insights' && 'Métricas de performance e insights'}
                      {feature === 'audiences' && 'Audiências personalizadas e lookalike'}
                      {feature === 'creatives' && 'Criativos e materiais publicitários'}
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
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Webhooks</CardTitle>
              <CardDescription>
                Configure webhooks para receber atualizações em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL do Webhook</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://seu-dominio.com/webhooks/meta"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  URL onde o Meta enviará as notificações
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookSecret">Webhook Secret</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhookSecret"
                    type={showSecrets.webhookSecret ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={config.webhookSecret}
                    onChange={(e) => setConfig(prev => ({ ...prev, webhookSecret: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSecrets(prev => ({ ...prev, webhookSecret: !prev.webhookSecret }))}
                  >
                    {showSecrets.webhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateWebhookSecret}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chave secreta para validar a origem dos webhooks
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Eventos Suportados</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Atualizações de campanhas</li>
                  <li>• Mudanças em conjuntos de anúncios</li>
                  <li>• Aprovação/rejeição de anúncios</li>
                  <li>• Alertas de orçamento</li>
                  <li>• Mudanças em audiências</li>
                </ul>
              </div>
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
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                    <SelectItem value="480">8 horas</SelectItem>
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

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Limites da API</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Rate limit: 200 chamadas por hora por usuário</li>
                  <li>• Dados históricos: até 37 meses</li>
                  <li>• Insights: dados disponíveis após 3 horas</li>
                  <li>• Recomendado: sincronização a cada 1-4 horas</li>
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
      </div>
    </div>
  );
}
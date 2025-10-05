'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui';
import { mockAccounts, mockPlatforms } from '@/data/mockData';
import { Account } from '@/types';
import { useHydrated } from '@/hooks/useHydrated';
import { 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  MousePointer,
  Eye,
  BarChart3
} from 'lucide-react';

const platformIcons = {
  'Meta Ads': Facebook,
  'Google Ads': Globe,
  'Instagram': Instagram,
  'YouTube': Youtube,
  'LinkedIn': Linkedin,
  'Twitter': Twitter,
  'TikTok': Globe,
  'Pinterest': Globe,
  'Snapchat': Globe,
  'default': Globe
};

export default function AccountsPage() {
  const hydrated = useHydrated();
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const getPlatformIcon = (platformId: string) => {
    const platform = mockPlatforms.find(p => p.id === platformId);
    const IconComponent = platformIcons[platform?.name as keyof typeof platformIcons] || platformIcons.default;
    return IconComponent;
  };

  const getPlatformName = (platformId: string) => {
    const platform = mockPlatforms.find(p => p.id === platformId);
    return platform?.name || 'Plataforma Desconhecida';
  };

  const handleToggleStatus = (accountId: string) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, isActive: !account.isActive }
          : account
      )
    );
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  if (!hydrated) {
    return (
      <Layout title="Gestão de Contas" subtitle="Gerencie suas contas de marketing digital">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Gestão de Contas" subtitle="Gerencie suas contas de marketing digital">
      <div className="space-y-6">
        {/* Header com botão de adicionar */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Contas Conectadas</h2>
            <p className="text-gray-600">Monitore performance e gerencie suas contas</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Conta
          </button>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{accounts.length}</div>
                <div className="text-sm text-gray-600">Total de Contas</div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {accounts.filter(a => a.isActive).length}
                </div>
                <div className="text-sm text-gray-600">Contas Ativas</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(accounts.reduce((sum, acc) => sum + acc.budget, 0))}
                </div>
                <div className="text-sm text-gray-600">Budget Total</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatNumber(accounts.reduce((sum, acc) => sum + acc.totalCampaigns, 0))}
                </div>
                <div className="text-sm text-gray-600">Total Campanhas</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Grid de contas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {accounts.map((account) => {
            const IconComponent = getPlatformIcon(account.platformId);
            const platformName = getPlatformName(account.platformId);
            
            return (
              <Card key={account.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedAccount(account)}>
                <div className="space-y-4">
                  {/* Header da conta */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{account.name}</h3>
                        <p className="text-sm text-gray-500">{platformName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {account.isActive ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Métricas principais */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(account.budget)}
                      </div>
                      <div className="text-xs text-blue-700">Budget</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {account.totalCampaigns}
                      </div>
                      <div className="text-xs text-green-700">Campanhas</div>
                    </div>
                  </div>

                  {/* Status e informações */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${account.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {account.isActive ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Última sincronização:</span>
                      <span className="text-gray-900">
                        {new Date(account.lastSync).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Account ID:</span>
                      <span className="text-gray-900 font-mono text-xs">
                        {account.accountId.substring(0, 12)}...
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccount(account);
                      }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(account.id);
                      }}
                      className={`flex items-center gap-1 text-sm font-medium ${
                        account.isActive 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      {account.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAccount(account.id);
                      }}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modal de detalhes da conta */}
        {selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Detalhes da Conta: {selectedAccount.name}
                  </h2>
                  <button
                    onClick={() => setSelectedAccount(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Informações básicas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Plataforma</label>
                      <p className="text-gray-900">{getPlatformName(selectedAccount.platformId)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <p className={`${selectedAccount.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedAccount.isActive ? 'Ativa' : 'Inativa'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget</label>
                      <p className="text-gray-900">{formatCurrency(selectedAccount.budget)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Total de Campanhas</label>
                      <p className="text-gray-900">{selectedAccount.totalCampaigns}</p>
                    </div>
                  </div>

                  {/* Métricas detalhadas */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Métricas de Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-blue-600">1.2M</div>
                        <div className="text-sm text-blue-700">Impressões</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <MousePointer className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-green-600">45.2K</div>
                        <div className="text-sm text-green-700">Clicks</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-purple-600">2.8K</div>
                        <div className="text-sm text-purple-700">Conversões</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-orange-600">R$ 125K</div>
                        <div className="text-sm text-orange-700">Receita</div>
                      </div>
                    </div>
                  </div>

                  {/* Informações técnicas */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Técnicas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account ID:</span>
                        <span className="text-gray-900 font-mono">{selectedAccount.accountId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Última Sincronização:</span>
                        <span className="text-gray-900">
                          {new Date(selectedAccount.lastSync).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data de Criação:</span>
                        <span className="text-gray-900">
                          {new Date(selectedAccount.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Editar Conta
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(selectedAccount.id)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      selectedAccount.isActive
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {selectedAccount.isActive ? 'Desativar' : 'Ativar'}
                  </button>
                  <button 
                    onClick={() => setSelectedAccount(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
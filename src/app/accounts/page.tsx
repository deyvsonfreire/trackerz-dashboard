'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  MetricCard, 
  Button,
  StatusIndicator,
  Modal,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
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

  const totalBudget = accounts.reduce((sum, acc) => sum + acc.budget, 0);
  const totalCampaigns = accounts.reduce((sum, acc) => sum + acc.totalCampaigns, 0);
  const activeAccounts = accounts.filter(a => a.isActive).length;

  return (
    <Layout title="Gestão de Contas" subtitle="Gerencie suas contas de marketing digital">
      <div className="space-y-6">
        {/* Header com botão de adicionar */}
        <div className="flex justify-between items-center">
          <div />
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Conta
          </Button>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard 
            title="Total de Contas"
            value={accounts.length}
            icon={<BarChart3 className="w-6 h-6" />}
          />
          <MetricCard 
            title="Contas Ativas"
            value={activeAccounts}
            icon={<CheckCircle className="w-6 h-6" />}
            status="success"
          />
          <MetricCard 
            title="Budget Total"
            value={formatCurrency(totalBudget)}
            icon={<DollarSign className="w-6 h-6" />}
            status="info"
          />
          <MetricCard 
            title="Total de Campanhas"
            value={formatNumber(totalCampaigns)}
            icon={<TrendingUp className="w-6 h-6" />}
            status="warning"
          />
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
                    <StatusIndicator 
                      status={account.isActive ? 'active' : 'inactive'} 
                      label={account.isActive ? 'Ativa' : 'Inativa'} 
                    />
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
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(account.id)}>
                      <Settings className="w-4 h-4 mr-2" />
                      {account.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modal de detalhes da conta */}
        {selectedAccount && (
          <Modal
             isOpen={!!selectedAccount}
             onClose={() => setSelectedAccount(null)}
             title={`Detalhes da Conta: ${selectedAccount.name}`}
           >
             <div className="space-y-6">
               {/* Informações básicas */}
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-sm font-medium text-gray-700 block mb-1">Plataforma</label>
                   <Input
                     defaultValue={getPlatformName(selectedAccount.platformId)}
                     disabled
                   />
                 </div>
                 <div>
                   <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                   <StatusIndicator 
                     status={selectedAccount.isActive ? 'active' : 'inactive'} 
                     label={selectedAccount.isActive ? 'Ativa' : 'Inativa'} 
                   />
                 </div>
                 <div>
                   <label className="text-sm font-medium text-gray-700 block mb-1">Budget</label>
                   <Input
                     defaultValue={formatCurrency(selectedAccount.budget)}
                     disabled
                   />
                 </div>
                 <div>
                   <label className="text-sm font-medium text-gray-700 block mb-1">Total de Campanhas</label>
                   <Input
                     defaultValue={selectedAccount.totalCampaigns}
                     disabled
                   />
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
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Account ID</label>
                      <Input
                        defaultValue={selectedAccount.accountId}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Última Sincronização</label>
                      <Input
                        defaultValue={new Date(selectedAccount.lastSync).toLocaleString('pt-BR')}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Data de Criação</label>
                      <Input
                        defaultValue={new Date(selectedAccount.createdAt).toLocaleDateString('pt-BR')}
                        disabled
                      />
                    </div>
                 </div>
               </div>
             </div>

             <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
               <Button variant="default" className="flex-1">
                 Editar Conta
               </Button>
               <Button 
                 onClick={() => handleToggleStatus(selectedAccount.id)}
                 variant={selectedAccount.isActive ? "destructive" : "default"}
                 className="flex-1"
               >
                 {selectedAccount.isActive ? 'Desativar' : 'Ativar'}
               </Button>
               <Button 
                 onClick={() => setSelectedAccount(null)}
                 variant="outline"
               >
                 Fechar
               </Button>
             </div>
           </Modal>
        )}

        {/* Modal de adicionar conta */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Adicionar Nova Conta
                  </h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                   <div>
                     <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Nome da Conta</label>
                     <Input
                       id="accountName"
                       placeholder="Ex: Minha Conta Principal"
                     />
                   </div>
                   <div>
                     <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
                     <Select>
                        <SelectTrigger id="platform">
                          <SelectValue placeholder="Selecione uma plataforma" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockPlatforms.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                   </div>
                   <div>
                     <label htmlFor="platformId" className="block text-sm font-medium text-gray-700 mb-1">ID da Conta na Plataforma</label>
                     <Input
                       id="platformId"
                       placeholder="Ex: 1234567890"
                     />
                   </div>
                   <div>
                     <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Mensal</label>
                     <Input
                       id="budget"
                       type="number"
                       placeholder="Ex: 5000"
                     />
                   </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="isActive" defaultChecked={true} />
                      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Ativa</label>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">
                        Adicionar Conta
                      </Button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
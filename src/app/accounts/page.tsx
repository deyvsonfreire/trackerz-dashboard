'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { AccountModal } from '@/components/accounts/AccountModal';
import { 
  Card, 
  MetricCard, 
  Button,
  StatusIndicator,
} from '@/components/ui';
import { Account, Platform } from '@/types';
import { useHydrated } from '@/hooks/useHydrated';
import { 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
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
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('accounts')
        .select('*, platforms(*)');

      if (error) {
        console.error('Error fetching accounts:', error);
      } else {
        setAccounts(data as Account[]);
      }
      setIsLoading(false);
    };

    fetchAccounts();
  }, []);

  const getPlatformIcon = (platform: Platform) => {
    const IconComponent = platformIcons[platform?.name as keyof typeof platformIcons] || platformIcons.default;
    return IconComponent;
  };

  const getPlatformName = (platform: Platform) => {
    return platform?.name || 'Plataforma Desconhecida';
  };

  const handleToggleStatus = async (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;

    const newStatus = !account.isActive;
    const { error } = await createClient()
      .from('accounts')
      .update({ isActive: newStatus })
      .eq('id', accountId);

    if (error) {
      console.error('Error updating account status:', error);
    } else {
      setAccounts(prev =>
        prev.map(a => (a.id === accountId ? { ...a, isActive: newStatus } : a))
      );
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    const { error } = await createClient().from('accounts').delete().eq('id', accountId);

    if (error) {
      console.error('Error deleting account:', error);
    } else {
      setAccounts(prev => prev.filter(account => account.id !== accountId));
    }
  };

  const handleSubmit = async (formData: Partial<Account>) => {
    const supabase = createClient();
    if (selectedAccount) {
      // Update
      const { data, error } = await supabase
        .from('accounts')
        .update(formData)
        .eq('id', selectedAccount.id)
        .select('*, platforms(*)');

      if (error) {
        console.error('Error updating account:', error);
      } else if (data) {
        setAccounts(prev => prev.map(a => (a.id === selectedAccount.id ? data[0] as Account : a)));
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('accounts').insert([formData]).select('*, platforms(*)');

      if (error) {
        console.error('Error inserting account:', error);
      } else if (data) {
        setAccounts(prev => [...prev, data[0] as Account]);
      }
    }
    setShowAddForm(false);
    setSelectedAccount(null);
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

  if (!hydrated || isLoading) {
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
            const IconComponent = getPlatformIcon(account.platforms);
            const platformName = getPlatformName(account.platforms);
            
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
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedAccount(account); }}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleToggleStatus(account.id); }}>
                      <Settings className="w-4 h-4 mr-2" />
                      {account.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteAccount(account.id); }}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <AccountModal
          isOpen={showAddForm || !!selectedAccount}
          onClose={() => {
            setShowAddForm(false);
            setSelectedAccount(null);
          }}
          account={selectedAccount}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
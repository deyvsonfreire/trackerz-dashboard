import React, { useState, useEffect } from 'react';
import ApiStatusCard from '../ui/ApiStatusCard';
import { createClient } from '@/utils/supabase/client';

/**
 * Interface para os itens de status da API
 */
interface ApiStatusItem {
  id: number;
  apiName: string;
  status: 'connected' | 'error' | 'pending';
  lastSyncTime?: string;
  description: string;
  errorMessage?: string;
  configUrl?: string;
}

/**
 * ApiStatusExample Component
 * 
 * Um componente que exibe o status das conexões com APIs configuradas
 * no sistema, permitindo atualizar e configurar cada conexão.
 * 
 * @returns {JSX.Element} O componente renderizado
 */
const ApiStatusExample: React.FC = () => {
  const [apiStatuses, setApiStatuses] = useState<ApiStatusItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Buscar status das APIs do banco de dados
  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        setIsLoading(true);
        
        // Buscar plataformas configuradas no Supabase
        const { data, error } = await supabase
          .from('platforms')
          .select('*');
          
        if (error) {
          console.error('Erro ao buscar plataformas:', error);
          return;
        }
        
        // Transformar dados do banco para o formato do componente
        if (data && data.length > 0) {
          const formattedData: ApiStatusItem[] = data.map((platform, index) => ({
            id: index + 1,
            apiName: platform.name,
            status: platform.isActive ? 'connected' : 'pending',
            lastSyncTime: platform.lastSync ? new Date(platform.lastSync).toLocaleString('pt-BR') : undefined,
            description: platform.description || `Conexão com a API ${platform.name}`,
            errorMessage: platform.errorMessage,
            configUrl: platform.configUrl
          }));
          
          setApiStatuses(formattedData);
        }
      } catch (err) {
        console.error('Erro ao processar dados das APIs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiStatus();
  }, []);

  // Handler para o botão de atualização
  const handleRefresh = async (id: number) => {
    try {
      // Atualizar status para "pending" durante a verificação
      setApiStatuses(prevStatuses => 
        prevStatuses.map(api => 
          api.id === id ? { ...api, status: 'pending' } : api
        )
      );
      
      // Simular verificação de API (em produção, faria uma chamada real à API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Atualizar com o novo status
      setApiStatuses(prevStatuses => 
        prevStatuses.map(api => {
          if (api.id === id) {
            const newStatus = Math.random() > 0.3 ? 'connected' : 'error';
            const newItem: ApiStatusItem = {
              ...api,
              status: newStatus,
              lastSyncTime: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            };
            
            if (newStatus === 'error') {
              newItem.errorMessage = 'Falha na conexão. Tente novamente.';
            } else {
              newItem.errorMessage = undefined;
            }
            
            return newItem;
          }
          return api;
        })
      );
    } catch (err) {
      console.error(`Erro ao atualizar API ID ${id}:`, err);
    }
  };

  // Handler para o botão de configuração
  const handleConfigure = (id: number, configUrl?: string) => {
    if (configUrl) {
      window.open(configUrl, '_blank');
    } else {
      // Redirecionar para a página de configuração da plataforma
      window.location.href = `/platforms/configure/${id}`;
    }
  };

  // Exibir mensagem de carregamento
  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Status das Conexões com APIs</h1>
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Carregando status das APIs...</p>
        </div>
      </div>
    );
  }

  // Exibir mensagem quando não há APIs configuradas
  if (apiStatuses.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Status das Conexões com APIs</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">Nenhuma API configurada no momento.</p>
          <a 
            href="/platforms" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Configurar APIs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Status das Conexões com APIs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apiStatuses.map(api => (
          <ApiStatusCard
            key={api.id}
            apiName={api.apiName}
            status={api.status}
            lastSyncTime={api.lastSyncTime}
            description={api.description}
            errorMessage={api.errorMessage}
            onRefresh={() => handleRefresh(api.id)}
            onConfigure={() => handleConfigure(api.id, api.configUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ApiStatusExample;
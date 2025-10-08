'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

/**
 * Interface para a plataforma
 */
interface Platform {
  id: string;
  name: string;
  type: string;
  is_active: boolean;
  last_sync_at: string | null;
  oauth_config?: {
    access_token?: string;
    refresh_token?: string;
  };
}

/**
 * PlatformAuthPage
 * 
 * Página para autenticação direta com plataformas externas.
 * Suporta fluxos de autenticação OAuth para diferentes plataformas.
 * 
 * @returns {JSX.Element} A página renderizada
 */
export default function PlatformAuthPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const platformType = params.platform as string;
  const platformId = searchParams.get('platform_id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();
  
  // Configurações de autenticação para diferentes plataformas
  const authConfigs: Record<string, { name: string, authUrl: string, scopes: string[] }> = {
    'google': {
      name: 'Google',
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      scopes: ['https://www.googleapis.com/auth/adwords', 'https://www.googleapis.com/auth/analytics.readonly']
    },
    'meta': {
      name: 'Meta',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      scopes: ['ads_read', 'ads_management', 'business_management', 'pages_read_engagement']
    },
    'rdstation': {
      name: 'RD Station',
      authUrl: 'https://api.rd.services/auth/dialog',
      scopes: ['contacts.read', 'contacts.write', 'funnels.read']
    },
    '3cx': {
      name: '3CX',
      authUrl: 'https://your-3cx-server.com/auth',
      scopes: ['calls.read', 'users.read']
    }
  };

  useEffect(() => {
    const fetchPlatformData = async () => {
      if (!platformId) {
        setError('ID da plataforma não fornecido');
        setIsLoading(false);
        return;
      }

      try {
        // Buscar dados da plataforma
        const { data, error } = await supabase
          .from('platforms')
          .select('*')
          .eq('id', platformId)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError('Plataforma não encontrada');
          setIsLoading(false);
          return;
        }

        setPlatform(data as Platform);
        
        // Gerar URL de autenticação baseado no tipo de plataforma
        const config = authConfigs[platformType.toLowerCase()];
        if (config) {
          // Em um ambiente real, você geraria uma URL de autenticação OAuth
          // com os parâmetros corretos, client_id, redirect_uri, etc.
          const mockAuthUrl = `${config.authUrl}?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&scope=${encodeURIComponent(config.scopes.join(' '))}&response_type=code&state=${platformId}`;
          setAuthUrl(mockAuthUrl);
        } else {
          setError(`Tipo de plataforma não suportado: ${platformType}`);
        }
      } catch (err) {
        console.error('Erro ao buscar dados da plataforma:', err);
        const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar dados da plataforma';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlatformData();
  }, [platformId, platformType, supabase]);

  // Função para iniciar o processo de autenticação
  const handleStartAuth = () => {
    if (authUrl) {
      // Em um ambiente de produção, você redirecionaria para a URL de autenticação
      // window.location.href = authUrl;
      
      // Para fins de demonstração, simulamos uma autenticação bem-sucedida
      simulateSuccessfulAuth();
    }
  };

  // Simula uma autenticação bem-sucedida
  const simulateSuccessfulAuth = async () => {
    setIsLoading(true);
    
    try {
      console.log('Iniciando simulação de autenticação para plataforma:', platform?.name);
      
      // Simular um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar o status da plataforma para ativo
      if (platform) {
        const { error } = await supabase
          .from('platforms')
          .update({ 
            is_active: true,
            last_sync_at: new Date().toISOString(),
            oauth_config: {
              access_token: 'mock_access_token_' + Math.random().toString(36).substring(2),
              refresh_token: 'mock_refresh_token_' + Math.random().toString(36).substring(2)
            }
          })
          .eq('id', platform.id);
          
        if (error) {
          console.error('Erro na resposta do Supabase ao atualizar plataforma:', error);
          throw error;
        }
        
        console.log('Autenticação simulada com sucesso para plataforma:', platform.name);
        
        // Redirecionar para a página de plataformas
        window.location.href = '/platforms';
      }
    } catch (err) {
      console.error('Falha na autenticação:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao simular autenticação';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout title={`Autenticação ${platformType}`} subtitle="Conecte-se à plataforma">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title={`Erro de Autenticação`} subtitle="Ocorreu um problema">
        <Card className="p-6">
          <div className="text-red-600 mb-4">{error}</div>
          <Link href="/platforms" className="text-blue-600 hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Plataformas
          </Link>
        </Card>
      </Layout>
    );
  }

  const config = authConfigs[platformType.toLowerCase()];
  const platformName = platform?.name || config?.name || platformType;

  return (
    <Layout 
      title={`Conectar ${platformName}`} 
      subtitle="Autorize o acesso à sua conta para integrar os dados"
    >
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-full inline-flex items-center justify-center mb-4">
            <ExternalLink className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Conectar com {platformName}</h2>
          <p className="text-gray-600">
            Você será redirecionado para a página de autenticação do {platformName} para autorizar o acesso.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Esta integração permitirá:</h3>
          <ul className="space-y-2">
            {config?.scopes.map((scope, index) => (
              <li key={index} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{scope}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={handleStartAuth}
            className="w-full py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Conectando...' : 'Conectar com ' + platformName}
          </Button>
          
          <Link href="/platforms" className="text-center text-gray-600 hover:text-gray-800">
            Cancelar e voltar
          </Link>
        </div>
      </Card>
    </Layout>
  );
}
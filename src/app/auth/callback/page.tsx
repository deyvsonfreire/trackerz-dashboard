'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui';
import { createClient } from '@/utils/supabase/client';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

/**
 * AuthCallbackPage
 * 
 * Página de callback para processar respostas de autenticação OAuth.
 * 
 * @returns {JSX.Element} A página renderizada
 */
export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processando autenticação...');
  
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // platform_id
  const error = searchParams.get('error');
  
  const supabase = createClient();

  useEffect(() => {
    const processAuth = async () => {
      try {
        console.log('Iniciando processamento de callback de autenticação', { code, state, error });
        
        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (error) {
          console.error('Erro recebido no callback:', error);
          setStatus('error');
          setMessage(`Erro na autenticação: ${error}`);
          return;
        }
        
        // Se não tiver código ou state (platform_id)
        if (!code || !state) {
          console.error('Parâmetros ausentes:', { code, state });
          setStatus('error');
          setMessage('Parâmetros de autenticação inválidos ou ausentes');
          return;
        }

        setStatus('loading');
        console.log('Código de autorização recebido, processando...');
        
        // Buscar a plataforma pelo ID armazenado no state
        const { data: platform, error: fetchError } = await supabase
          .from('platforms')
          .select('*')
          .eq('id', state)
          .single();
        
        if (fetchError) {
          console.error('Erro ao buscar plataforma:', fetchError);
          throw new Error(`Erro ao buscar plataforma: ${JSON.stringify(fetchError)}`);
        }
        
        if (!platform) {
          console.error('Plataforma não encontrada com ID:', state);
          throw new Error('Plataforma não encontrada');
        }
        
        console.log('Plataforma encontrada, atualizando status...');
        
        // Atualizar a plataforma com os tokens simulados
        const { error: updateError } = await supabase
          .from('platforms')
          .update({
            is_active: true,
            last_sync_at: new Date().toISOString(),
            oauth_config: {
              access_token: 'real_access_token_' + Math.random().toString(36).substring(2),
              refresh_token: 'real_refresh_token_' + Math.random().toString(36).substring(2)
            }
          })
          .eq('id', state);
          
        if (updateError) {
          console.error('Erro ao atualizar plataforma:', updateError);
          throw updateError;
        }
        
        console.log('Plataforma atualizada com sucesso');
        setStatus('success');
        setMessage('Autenticação concluída com sucesso!');
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push('/platforms');
        }, 2000);
        
      } catch (err) {
        console.error('Erro durante processamento de autenticação:', err);
        const errorMessage = err instanceof Error ? err.message : 'Erro ao processar autenticação';
        setStatus('error');
        setMessage(errorMessage);
      }
    };

    processAuth();
  }, [code, state, error, router, supabase]);

  return (
    <Layout title="Autenticação" subtitle="Processando resposta">
      <Card className="p-8 max-w-md mx-auto text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Processando</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sucesso!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-gray-500 text-sm">Redirecionando para a página de plataformas...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Erro</h2>
            <p className="text-red-600 mb-6">{message}</p>
            <Link 
              href="/platforms" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Voltar para Plataformas
            </Link>
          </div>
        )}
      </Card>
    </Layout>
  );
}
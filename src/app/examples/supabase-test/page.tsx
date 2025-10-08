'use client';

import SupabaseConnectionTest from '@/components/examples/SupabaseConnectionTest';

/**
 * Página de exemplo para testar a conexão com o Supabase
 */
export default function SupabaseTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Teste de Conexão com Supabase</h1>
      <SupabaseConnectionTest />
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { Layout } from '@/components/layout/Layout';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/hooks/use-toast';

export default function RDStationMarketingSettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleSave = async () => {
    const { error } = await supabase
      .from('accounts')
      .update({ api_key: apiKey })
      .eq('platform_name', 'RD Station Marketing');

    if (error) {
      toast({
        title: 'Erro ao salvar a chave da API',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Chave da API salva com sucesso!',
      });
    }
  };

  return (
    <Layout title="Configurações do RD Station Marketing" subtitle="Gerencie a integração com o RD Station Marketing">
      <Card>
        <CardHeader>
          <CardTitle>Chave da API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Insira sua chave da API do RD Station Marketing"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
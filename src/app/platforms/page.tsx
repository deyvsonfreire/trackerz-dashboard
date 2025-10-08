'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui';
import { createClient } from '@/utils/supabase/client';
import { Platform } from '@/types';
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
  Twitter
} from 'lucide-react';
import { PlatformModal } from '@/components/platforms/PlatformModal';

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

export default function PlatformsPage() {
  const hydrated = useHydrated();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchPlatforms = async () => {
      const { data, error } = await supabase.from('platforms').select('*');

      if (error) {
        console.error('Error fetching platforms:', error);
      } else {
        setPlatforms(data as Platform[]);
      }
      setIsLoading(false);
    };

    fetchPlatforms();
  }, []);

  const getPlatformIcon = (platformName: string) => {
    const IconComponent = platformIcons[platformName as keyof typeof platformIcons] || platformIcons.default;
    return IconComponent;
  };

  const handleToggleStatus = async (id: string) => {
    try {
      setIsLoading(true);
      const platform = platforms.find(p => p.id === id);
      
      if (!platform) {
        throw new Error('Plataforma não encontrada');
      }
      
      console.log(`Atualizando status da plataforma ${platform.name} para ${!platform.is_active ? 'ativo' : 'inativo'}`);
      
      const { error } = await supabase
        .from('platforms')
        .update({ is_active: !platform.is_active })
        .eq('id', id);
      
      if (error) {
        console.error('Erro ao atualizar status da plataforma:', error);
        toast({
          title: "Erro ao atualizar status",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Atualiza o estado local
      setPlatforms(platforms.map(p => 
        p.id === id ? { ...p, is_active: !p.is_active } : p
      ));
      
      console.log(`Plataforma ${platform.name} ${!platform.is_active ? 'ativada' : 'desativada'} com sucesso.`);
      
      toast({
        title: "Status atualizado",
        description: `Plataforma ${!platform.is_active ? 'ativada' : 'desativada'} com sucesso.`,
        variant: "default",
      });
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao atualizar o status da plataforma",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlatform = async (platformId: string) => {
    const { error } = await supabase.from('platforms').delete().eq('id', platformId);

    if (error) {
      console.error('Error deleting platform:', error);
    } else {
      setPlatforms(prev => prev.filter(platform => platform.id !== platformId));
    }
  };

  const handleSubmit = async (formData: Partial<Platform>) => {
    if (editingPlatform) {
      // Update
      const { data, error } = await supabase
        .from('platforms')
        .update(formData)
        .eq('id', editingPlatform.id)
        .select();

      if (error) {
        console.error('Error updating platform:', error);
      } else if (data) {
        setPlatforms(prev => prev.map(p => (p.id === editingPlatform.id ? data[0] : p)));
      }
    } else {
      // Insert
      console.log('Adicionando nova plataforma:', formData);
      const { data, error } = await supabase.from('platforms').insert([formData]).select();

      if (error) {
        console.error('Error inserting platform:', error);
      } else if (data) {
        setPlatforms(prev => [...prev, data[0]]);
      }
    }
    setShowAddForm(false);
    setEditingPlatform(null);
  };

  if (!hydrated || isLoading) {
    return (
      <Layout title="Gestão de Plataformas" subtitle="Configure e gerencie suas plataformas de marketing">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Gestão de Plataformas" subtitle="Configure e gerencie suas plataformas de marketing">
      <div className="space-y-6">
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Plataforma
          </button>
        </div>

        {/* Grid de plataformas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.length === 0 ? (
            <div className="col-span-3 p-8 bg-white rounded-lg shadow-sm text-center">
              <p className="text-gray-600 mb-4">Nenhuma plataforma configurada. Adicione sua primeira plataforma para começar.</p>
            </div>
          ) : (
            platforms.map((platform) => {
              const IconComponent = getPlatformIcon(platform.name);
              
              return (
                <Card key={platform.id} className="hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <IconComponent className="w-7 h-7 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{platform.name}</h3>
                        <p className="text-sm text-gray-700 mt-1">{platform.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.is_active ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${platform.is_active ? 'text-green-600' : 'text-red-600'}`}>
                        {platform.is_active ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Última sincronização:</span>
                      <span className="text-gray-900">
                        {platform.last_sync_at ? new Date(platform.last_sync_at).toLocaleDateString('pt-BR') : 'Nunca sincronizado'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                    {/* Botão de autenticação direta */}
                    {!platform.is_active && (
                      <button
                        onClick={() => window.location.href = `/auth/${platform.type.toLowerCase()}?platform_id=${platform.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Conectar
                      </button>
                    )}

                    <div className="flex justify-between gap-2 mt-2">
                      <button
                        onClick={() => setEditingPlatform(platform)}
                        className="flex items-center justify-center gap-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </button>
                      
                      <button
                        onClick={() => handleToggleStatus(platform.id)}
                        className={`flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors flex-1 ${
                          platform.is_active 
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {platform.is_active ? 'Desativar' : 'Ativar'}
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDeletePlatform(platform.id)}
                      className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors w-full mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        <PlatformModal 
          isOpen={showAddForm || !!editingPlatform}
          onClose={() => {
            setShowAddForm(false);
            setEditingPlatform(null);
          }}
          platform={editingPlatform}
          onSubmit={handleSubmit}
        />

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{platforms.length}</div>
              <div className="text-sm text-gray-600">Total de Plataformas</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {platforms.filter(p => p.is_active).length}
              </div>
              <div className="text-sm text-gray-600">Plataformas Ativas</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {platforms.filter(p => !p.is_active).length}
              </div>
              <div className="text-sm text-gray-600">Plataformas Inativas</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(platforms.map(p => p.type)).size}
              </div>
              <div className="text-sm text-gray-600">Tipos Diferentes</div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
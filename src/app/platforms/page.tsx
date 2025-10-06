'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui';
import { mockPlatforms } from '@/data/mockData';
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
  const [platforms, setPlatforms] = useState<Platform[]>(mockPlatforms);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  const getPlatformIcon = (platformName: string) => {
    const IconComponent = platformIcons[platformName as keyof typeof platformIcons] || platformIcons.default;
    return IconComponent;
  };

  const handleToggleStatus = (platformId: string) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, isActive: !platform.isActive }
          : platform
      )
    );
  };

  const handleDeletePlatform = (platformId: string) => {
    setPlatforms(prev => prev.filter(platform => platform.id !== platformId));
  };

  if (!hydrated) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const IconComponent = getPlatformIcon(platform.name);
            
            return (
              <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                      <p className="text-sm text-gray-500">{platform.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {platform.isActive ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${platform.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {platform.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última sincronização:</span>
                    <span className="text-gray-900">
                      {new Date(platform.lastSync).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {platform.apiKey && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">API Key:</span>
                      <span className="text-gray-900 font-mono">
                        {platform.apiKey.substring(0, 8)}...
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setEditingPlatform(platform)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleStatus(platform.id)}
                    className={`flex items-center gap-1 text-sm font-medium ${
                      platform.isActive 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    {platform.isActive ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => handleDeletePlatform(platform.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

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
                {platforms.filter(p => p.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Plataformas Ativas</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {platforms.filter(p => !p.isActive).length}
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
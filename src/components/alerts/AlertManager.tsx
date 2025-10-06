'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Modal, ModalHeader, ModalFooter } from '@/components/ui/Modal';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Target,
  DollarSign,
  Users,
  Activity,
  Settings
} from 'lucide-react';

/**
 * Interface para configuração de alertas personalizados
 */
export interface AlertConfig {
  id: string;
  name: string;
  description: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'percentage_change';
  threshold: number;
  frequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  channels: ('email' | 'sms' | 'push' | 'dashboard')[];
  isActive: boolean;
  createdAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
}

/**
 * Interface para histórico de alertas
 */
export interface AlertHistory {
  id: string;
  alertId: string;
  alertName: string;
  triggeredAt: Date;
  value: number;
  threshold: number;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface AlertManagerProps {
  alerts: AlertConfig[];
  history: AlertHistory[];
  onCreateAlert: (alert: Omit<AlertConfig, 'id' | 'createdAt' | 'triggerCount'>) => void;
  onUpdateAlert: (id: string, alert: Partial<AlertConfig>) => void;
  onDeleteAlert: (id: string) => void;
  onTestAlert: (id: string) => void;
}

const METRICS_OPTIONS = [
  { value: 'revenue', label: 'Receita', icon: DollarSign },
  { value: 'conversions', label: 'Conversões', icon: Target },
  { value: 'traffic', label: 'Tráfego', icon: Users },
  { value: 'roas', label: 'ROAS', icon: TrendingUp },
  { value: 'cac', label: 'CAC', icon: TrendingDown },
  { value: 'engagement', label: 'Engajamento', icon: Activity }
];

const CONDITION_OPTIONS = [
  { value: 'greater_than', label: 'Maior que' },
  { value: 'less_than', label: 'Menor que' },
  { value: 'equals', label: 'Igual a' },
  { value: 'percentage_change', label: 'Variação percentual' }
];

const FREQUENCY_OPTIONS = [
  { value: 'real_time', label: 'Tempo Real' },
  { value: 'hourly', label: 'A cada hora' },
  { value: 'daily', label: 'Diariamente' },
  { value: 'weekly', label: 'Semanalmente' }
];

const CHANNEL_OPTIONS = [
  { value: 'email', label: 'E-mail' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push Notification' },
  { value: 'dashboard', label: 'Dashboard' }
];

/**
 * Componente para gerenciar alertas personalizados configuráveis
 */
export const AlertManager: React.FC<AlertManagerProps> = ({
  alerts,
  history,
  onCreateAlert,
  onUpdateAlert,
  onDeleteAlert,
  onTestAlert
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<AlertConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'alerts' | 'history'>('alerts');
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metric: '',
    condition: 'greater_than' as AlertConfig['condition'],
    threshold: 0,
    frequency: 'daily' as AlertConfig['frequency'],
    channels: ['dashboard'] as AlertConfig['channels'],
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      metric: '',
      condition: 'greater_than',
      threshold: 0,
      frequency: 'daily',
      channels: ['dashboard'],
      isActive: true
    });
    setEditingAlert(null);
  };

  const handleOpenModal = (alert?: AlertConfig) => {
    if (alert) {
      setEditingAlert(alert);
      setFormData({
        name: alert.name,
        description: alert.description,
        metric: alert.metric,
        condition: alert.condition,
        threshold: alert.threshold,
        frequency: alert.frequency,
        channels: alert.channels,
        isActive: alert.isActive
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (editingAlert) {
      onUpdateAlert(editingAlert.id, formData);
    } else {
      onCreateAlert(formData);
    }
    handleCloseModal();
  };

  const handleChannelToggle = (channel: AlertConfig['channels'][0]) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const getSeverityColor = (severity: AlertHistory['severity']) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricIcon = (metric: string) => {
    const option = METRICS_OPTIONS.find(m => m.value === metric);
    return option ? option.icon : Activity;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">Alertas Personalizados</h2>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Alerta
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'alerts'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Alertas Configurados ({alerts.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Histórico ({history.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'alerts' ? (
        <div className="grid gap-4">
          {alerts.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum alerta configurado</h3>
              <p className="text-gray-600 mb-4">
                Crie seu primeiro alerta personalizado para monitorar métricas importantes.
              </p>
              <Button onClick={() => handleOpenModal()}>
                Criar Primeiro Alerta
              </Button>
            </Card>
          ) : (
            alerts.map((alert) => {
              const MetricIcon = getMetricIcon(alert.metric);
              return (
                <Card key={alert.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <MetricIcon className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{alert.name}</h3>
                          <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                            {alert.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Métrica: {METRICS_OPTIONS.find(m => m.value === alert.metric)?.label}</span>
                          <span>Condição: {CONDITION_OPTIONS.find(c => c.value === alert.condition)?.label} {alert.threshold}</span>
                          <span>Frequência: {FREQUENCY_OPTIONS.find(f => f.value === alert.frequency)?.label}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-500">Canais:</span>
                          {alert.channels.map(channel => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {CHANNEL_OPTIONS.find(c => c.value === channel)?.label}
                            </Badge>
                          ))}
                        </div>
                        {alert.lastTriggered && (
                          <p className="text-xs text-gray-500 mt-1">
                            Último disparo: {alert.lastTriggered.toLocaleDateString('pt-BR')} 
                            ({alert.triggerCount} vezes)
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onTestAlert(alert.id)}
                      >
                        Testar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(alert)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteAlert(alert.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {history.length === 0 ? (
            <Card className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum histórico disponível</h3>
              <p className="text-gray-600">
                O histórico de alertas aparecerá aqui quando os alertas forem disparados.
              </p>
            </Card>
          ) : (
            history.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.alertName}</h4>
                      <p className="text-sm text-gray-600">{item.message}</p>
                      <p className="text-xs text-gray-500">
                        {item.triggeredAt.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {item.value} / {item.threshold}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Modal de Criação/Edição */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalHeader>
          <h3 className="text-lg font-semibold">
            {editingAlert ? 'Editar Alerta' : 'Novo Alerta'}
          </h3>
        </ModalHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Nome do Alerta</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Queda na receita"
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva quando este alerta deve ser disparado"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="metric">Métrica</Label>
              <Select value={formData.metric} onValueChange={(value) => setFormData(prev => ({ ...prev, metric: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma métrica" />
                </SelectTrigger>
                <SelectContent>
                  {METRICS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condição</Label>
              <Select value={formData.condition} onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value as AlertConfig['condition'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONDITION_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="threshold">Valor Limite</Label>
              <Input
                id="threshold"
                type="number"
                value={formData.threshold}
                onChange={(e) => setFormData(prev => ({ ...prev, threshold: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="frequency">Frequência</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value as AlertConfig['frequency'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Canais de Notificação</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {CHANNEL_OPTIONS.map(channel => (
                <div key={channel.value} className="flex items-center space-x-2">
                  <Switch
                    id={channel.value}
                    checked={formData.channels.includes(channel.value as any)}
                    onCheckedChange={() => handleChannelToggle(channel.value as any)}
                  />
                  <Label htmlFor={channel.value} className="text-sm">
                    {channel.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">Alerta ativo</Label>
          </div>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name || !formData.metric}>
            {editingAlert ? 'Atualizar' : 'Criar'} Alerta
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
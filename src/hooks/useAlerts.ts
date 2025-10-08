'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertConfig, AlertHistory } from '@/components/alerts/AlertManager';

/**
 * Interface para dados de métricas em tempo real
 */
interface MetricData {
  revenue: number;
  conversions: number;
  traffic: number;
  roas: number;
  cac: number;
  engagement: number;
}

/**
 * Hook para gerenciar alertas personalizados configuráveis
 */
export const useAlerts = () => {
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);
  const [history, setHistory] = useState<AlertHistory[]>([]);
  const [isLoading] = useState(false);

  // Dados mockados de métricas para simulação
  const [currentMetrics, setCurrentMetrics] = useState<MetricData>({
    revenue: 125000,
    conversions: 450,
    traffic: 12500,
    roas: 4.2,
    cac: 85,
    engagement: 68
  });

  /**
   * Carrega alertas salvos do localStorage
   */
  useEffect(() => {
    const savedAlerts = localStorage.getItem('dashboard-alerts');
    const savedHistory = localStorage.getItem('dashboard-alerts-history');
    
    if (savedAlerts) {
      try {
        const parsedAlerts = JSON.parse(savedAlerts).map((alert: Partial<AlertConfig>) => ({
          ...alert,
          createdAt: new Date(alert.createdAt!),
          lastTriggered: alert.lastTriggered ? new Date(alert.lastTriggered) : undefined
        }));
        setAlerts(parsedAlerts as AlertConfig[]);
      } catch (error) {
        console.error('Erro ao carregar alertas:', error);
      }
    }

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: Partial<AlertHistory>) => ({
          ...item,
          triggeredAt: new Date(item.triggeredAt!)
        }));
        setHistory(parsedHistory as AlertHistory[]);
      } catch (error) {
        console.error('Erro ao carregar histórico de alertas:', error);
      }
    }
  }, []);

  /**
   * Salva alertas no localStorage
   */
  const saveAlerts = useCallback((alertsToSave: AlertConfig[]) => {
    localStorage.setItem('dashboard-alerts', JSON.stringify(alertsToSave));
  }, []);

  /**
   * Salva histórico no localStorage
   */
  const saveHistory = useCallback((historyToSave: AlertHistory[]) => {
    localStorage.setItem('dashboard-alerts-history', JSON.stringify(historyToSave));
  }, []);

  /**
   * Cria um novo alerta
   */
  const createAlert = useCallback((alertData: Omit<AlertConfig, 'id' | 'createdAt' | 'triggerCount'>) => {
    const newAlert: AlertConfig = {
      ...alertData,
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      triggerCount: 0
    };

    const updatedAlerts = [...alerts, newAlert];
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);
  }, [alerts, saveAlerts]);

  /**
   * Atualiza um alerta existente
   */
  const updateAlert = useCallback((id: string, updates: Partial<AlertConfig>) => {
    const updatedAlerts = alerts.map(alert =>
      alert.id === id ? { ...alert, ...updates } : alert
    );
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);
  }, [alerts, saveAlerts]);

  /**
   * Remove um alerta
   */
  const deleteAlert = useCallback((id: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);
  }, [alerts, saveAlerts]);

  /**
   * Verifica se uma condição de alerta foi atendida
   */
  const checkCondition = useCallback((alert: AlertConfig, currentValue: number): boolean => {
    switch (alert.condition) {
      case 'greater_than':
        return currentValue > alert.threshold;
      case 'less_than':
        return currentValue < alert.threshold;
      case 'equals':
        return Math.abs(currentValue - alert.threshold) < 0.01;
      case 'percentage_change':
        // Simula uma variação percentual (seria calculada com dados históricos)
        const mockPreviousValue = currentValue * 0.95; // 5% menor que o atual
        const percentageChange = ((currentValue - mockPreviousValue) / mockPreviousValue) * 100;
        return Math.abs(percentageChange) >= alert.threshold;
      default:
        return false;
    }
  }, []);

  /**
   * Determina a severidade do alerta baseada na métrica e valor
   */
  const getSeverity = useCallback((alert: AlertConfig, value: number): AlertHistory['severity'] => {
    const deviation = Math.abs(value - alert.threshold) / alert.threshold;
    
    if (deviation >= 0.5) return 'critical';
    if (deviation >= 0.3) return 'high';
    if (deviation >= 0.1) return 'medium';
    return 'low';
  }, []);

  /**
   * Dispara um alerta e adiciona ao histórico
   */
  const triggerAlert = useCallback((alert: AlertConfig, value: number) => {
    const severity = getSeverity(alert, value);
    const message = `${alert.metric} ${alert.condition.replace('_', ' ')} ${alert.threshold}. Valor atual: ${value}`;

    const historyItem: AlertHistory = {
      id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      alertId: alert.id,
      alertName: alert.name,
      triggeredAt: new Date(),
      value,
      threshold: alert.threshold,
      message,
      severity
    };

    const updatedHistory = [historyItem, ...history].slice(0, 100); // Mantém apenas os últimos 100
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    // Atualiza o contador de disparos do alerta
    const updatedAlerts = alerts.map(a =>
      a.id === alert.id
        ? { ...a, lastTriggered: new Date(), triggerCount: a.triggerCount + 1 }
        : a
    );
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);

    // Simula notificação (em produção, enviaria para os canais configurados)
    if (alert.channels.includes('dashboard')) {
      console.log(`🚨 Alerta disparado: ${alert.name} - ${message}`);
    }
  }, [alerts, history, getSeverity, saveAlerts, saveHistory]);

  /**
   * Verifica todos os alertas ativos
   */
  const checkAlerts = useCallback(() => {
    alerts
      .filter(alert => alert.isActive)
      .forEach(alert => {
        const currentValue = currentMetrics[alert.metric as keyof MetricData];
        if (currentValue !== undefined && checkCondition(alert, currentValue)) {
          triggerAlert(alert, currentValue);
        }
      });
  }, [alerts, currentMetrics, checkCondition, triggerAlert]);

  /**
   * Testa um alerta específico
   */
  const testAlert = useCallback((id: string) => {
    const alert = alerts.find(a => a.id === id);
    if (!alert) return;

    const currentValue = currentMetrics[alert.metric as keyof MetricData];
    if (currentValue !== undefined) {
      triggerAlert(alert, currentValue);
    }
  }, [alerts, currentMetrics, triggerAlert]);

  /**
   * Simula mudanças nas métricas (para demonstração)
   */
  const simulateMetricChanges = useCallback(() => {
    setCurrentMetrics(prev => ({
      revenue: prev.revenue + (Math.random() - 0.5) * 10000,
      conversions: prev.conversions + Math.floor((Math.random() - 0.5) * 50),
      traffic: prev.traffic + Math.floor((Math.random() - 0.5) * 1000),
      roas: Math.max(0, prev.roas + (Math.random() - 0.5) * 0.5),
      cac: Math.max(0, prev.cac + (Math.random() - 0.5) * 10),
      engagement: Math.max(0, Math.min(100, prev.engagement + (Math.random() - 0.5) * 5))
    }));
  }, []);

  /**
   * Limpa o histórico de alertas
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('dashboard-alerts-history');
  }, []);

  /**
   * Obtém estatísticas dos alertas
   */
  const getAlertStats = useCallback(() => {
    const activeAlerts = alerts.filter(a => a.isActive).length;
    const totalTriggers = alerts.reduce((sum, alert) => sum + alert.triggerCount, 0);
    const recentTriggers = history.filter(h => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return h.triggeredAt > dayAgo;
    }).length;

    return {
      totalAlerts: alerts.length,
      activeAlerts,
      totalTriggers,
      recentTriggers
    };
  }, [alerts, history]);

  // Simula verificação periódica de alertas (em produção seria baseada na frequência configurada)
  useEffect(() => {
    const interval = setInterval(() => {
      simulateMetricChanges();
      checkAlerts();
    }, 30000); // Verifica a cada 30 segundos

    return () => clearInterval(interval);
  }, [simulateMetricChanges, checkAlerts]);

  return {
    alerts,
    history,
    currentMetrics,
    isLoading,
    createAlert,
    updateAlert,
    deleteAlert,
    testAlert,
    checkAlerts,
    clearHistory,
    getAlertStats
  };
};
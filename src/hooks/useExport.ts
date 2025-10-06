'use client';

import { useState, useCallback } from 'react';
import { ExportConfig, ExportStatus } from '@/components/export/ExportManager';

/**
 * Interface para dados de exportação
 */
export interface ExportData {
  title: string;
  subtitle?: string;
  data: any[];
  charts?: {
    type: 'bar' | 'line' | 'pie' | 'area';
    data: any[];
    title: string;
  }[];
  tables?: {
    title: string;
    headers: string[];
    rows: any[][];
  }[];
  summary?: {
    label: string;
    value: string | number;
    unit?: string;
  }[];
}

/**
 * Hook para gerenciar exportações
 */
export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  /**
   * Gera dados para exportação baseado no tipo de relatório
   */
  const generateExportData = useCallback((config: ExportConfig): ExportData => {
    const baseData: ExportData = {
      title: '',
      data: [],
      charts: [],
      tables: [],
      summary: []
    };

    switch (config.reportType) {
      case 'dashboard':
        return {
          ...baseData,
          title: 'Dashboard Executivo',
          subtitle: `Período: ${config.dateRange.start} a ${config.dateRange.end}`,
          summary: [
            { label: 'Receita Total', value: 'R$ 450.000', unit: '' },
            { label: 'Investimento', value: 'R$ 125.000', unit: '' },
            { label: 'ROAS', value: '3.6', unit: 'x' },
            { label: 'Conversões', value: '1.250', unit: '' },
            { label: 'CAC Médio', value: 'R$ 100', unit: '' }
          ],
          charts: config.includeCharts ? [
            {
              type: 'line',
              title: 'Evolução da Receita',
              data: [
                { name: 'Jan', value: 45000 },
                { name: 'Fev', value: 52000 },
                { name: 'Mar', value: 48000 },
                { name: 'Abr', value: 61000 },
                { name: 'Mai', value: 55000 }
              ]
            },
            {
              type: 'bar',
              title: 'Performance por Canal',
              data: [
                { name: 'Meta Ads', value: 125000 },
                { name: 'Google Ads', value: 98000 },
                { name: 'LinkedIn', value: 45000 },
                { name: 'TikTok', value: 32000 }
              ]
            },
            {
              type: 'pie',
              title: 'Distribuição por Região',
              data: [
                { name: 'Sudeste', value: 180000 },
                { name: 'Sul', value: 95000 },
                { name: 'Nordeste', value: 65000 },
                { name: 'Centro-Oeste', value: 35000 },
                { name: 'Norte', value: 25000 }
              ]
            }
          ] : [],
          tables: config.includeData ? [
            {
              title: 'Top 10 Campanhas',
              headers: ['Campanha', 'Canal', 'Investimento', 'Receita', 'ROAS', 'Conversões'],
              rows: [
                ['Black Friday 2024', 'Meta Ads', 'R$ 15.000', 'R$ 75.000', '5.0x', '150'],
                ['Promoção Verão', 'Google Ads', 'R$ 12.000', 'R$ 48.000', '4.0x', '120'],
                ['Lançamento Produto X', 'LinkedIn', 'R$ 8.000', 'R$ 32.000', '4.0x', '80'],
                ['Remarketing Q1', 'Meta Ads', 'R$ 10.000', 'R$ 35.000', '3.5x', '95'],
                ['Brand Awareness', 'TikTok', 'R$ 6.000', 'R$ 18.000', '3.0x', '60']
              ]
            }
          ] : []
        };

      case 'campaigns':
        return {
          ...baseData,
          title: 'Relatório de Campanhas',
          subtitle: `Análise detalhada - ${config.dateRange.start} a ${config.dateRange.end}`,
          summary: [
            { label: 'Campanhas Ativas', value: '24', unit: '' },
            { label: 'Investimento Total', value: 'R$ 125.000', unit: '' },
            { label: 'CTR Médio', value: '2.8', unit: '%' },
            { label: 'CPC Médio', value: 'R$ 1.25', unit: '' }
          ],
          charts: config.includeCharts ? [
            {
              type: 'bar',
              title: 'Performance por Campanha',
              data: [
                { name: 'Black Friday', value: 75000 },
                { name: 'Verão 2024', value: 48000 },
                { name: 'Produto X', value: 32000 },
                { name: 'Remarketing', value: 35000 }
              ]
            }
          ] : [],
          tables: config.includeData ? [
            {
              title: 'Detalhamento de Campanhas',
              headers: ['Nome', 'Status', 'Orçamento', 'Gasto', 'Impressões', 'Cliques', 'CTR', 'CPC'],
              rows: [
                ['Black Friday 2024', 'Ativa', 'R$ 20.000', 'R$ 15.000', '500.000', '14.000', '2.8%', 'R$ 1.07'],
                ['Promoção Verão', 'Pausada', 'R$ 15.000', 'R$ 12.000', '400.000', '10.000', '2.5%', 'R$ 1.20'],
                ['Lançamento X', 'Ativa', 'R$ 10.000', 'R$ 8.000', '250.000', '7.500', '3.0%', 'R$ 1.07']
              ]
            }
          ] : []
        };

      case 'analytics':
        return {
          ...baseData,
          title: 'Analytics Detalhado',
          subtitle: `Análise comportamental - ${config.dateRange.start} a ${config.dateRange.end}`,
          summary: [
            { label: 'Sessões', value: '125.000', unit: '' },
            { label: 'Usuários Únicos', value: '85.000', unit: '' },
            { label: 'Taxa de Rejeição', value: '35', unit: '%' },
            { label: 'Tempo Médio', value: '3:45', unit: 'min' }
          ],
          charts: config.includeCharts ? [
            {
              type: 'area',
              title: 'Tráfego por Dia',
              data: [
                { name: 'Seg', value: 12000 },
                { name: 'Ter', value: 15000 },
                { name: 'Qua', value: 18000 },
                { name: 'Qui', value: 22000 },
                { name: 'Sex', value: 25000 },
                { name: 'Sáb', value: 20000 },
                { name: 'Dom', value: 16000 }
              ]
            }
          ] : [],
          tables: config.includeData ? [
            {
              title: 'Páginas Mais Visitadas',
              headers: ['Página', 'Visualizações', 'Usuários Únicos', 'Tempo Médio', 'Taxa de Saída'],
              rows: [
                ['/home', '45.000', '32.000', '2:30', '25%'],
                ['/produtos', '38.000', '28.000', '4:15', '30%'],
                ['/sobre', '15.000', '12.000', '1:45', '45%']
              ]
            }
          ] : []
        };

      default:
        return baseData;
    }
  }, []);

  /**
   * Simula a geração de PDF
   */
  const generatePDF = useCallback(async (data: ExportData, config: ExportConfig): Promise<string> => {
    // Simula processo de geração
    setExportProgress(25);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setExportProgress(50);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setExportProgress(75);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setExportProgress(100);
    
    // Em uma implementação real, aqui seria usado uma biblioteca como jsPDF ou Puppeteer
    console.log('Gerando PDF com dados:', data);
    
    // Retorna URL simulada
    return `data:application/pdf;base64,${btoa('PDF_CONTENT_PLACEHOLDER')}`;
  }, []);

  /**
   * Simula a geração de Excel
   */
  const generateExcel = useCallback(async (data: ExportData, config: ExportConfig): Promise<string> => {
    // Simula processo de geração
    setExportProgress(30);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setExportProgress(60);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setExportProgress(90);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setExportProgress(100);
    
    // Em uma implementação real, aqui seria usado uma biblioteca como SheetJS ou ExcelJS
    console.log('Gerando Excel com dados:', data);
    
    // Retorna URL simulada
    return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa('EXCEL_CONTENT_PLACEHOLDER')}`;
  }, []);

  /**
   * Função principal de exportação
   */
  const exportReport = useCallback(async (config: ExportConfig): Promise<string> => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Gera os dados
      const data = generateExportData(config);
      
      // Gera o arquivo baseado no formato
      let downloadUrl: string;
      if (config.format === 'pdf') {
        downloadUrl = await generatePDF(data, config);
      } else {
        downloadUrl = await generateExcel(data, config);
      }

      return downloadUrl;
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
      throw error;
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [generateExportData, generatePDF, generateExcel]);

  /**
   * Função para download rápido de dados específicos
   */
  const quickExport = useCallback(async (
    data: any[], 
    filename: string, 
    format: 'csv' | 'json' = 'csv'
  ): Promise<void> => {
    let content: string;
    let mimeType: string;

    if (format === 'csv') {
      // Converte para CSV
      if (data.length === 0) return;
      
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
      ].join('\n');
      
      content = csvContent;
      mimeType = 'text/csv';
    } else {
      // Converte para JSON
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
    }

    // Cria e baixa o arquivo
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return {
    isExporting,
    exportProgress,
    exportReport,
    quickExport,
    generateExportData
  };
};

export default useExport;
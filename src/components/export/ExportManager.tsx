'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

/**
 * Tipos de relatório para exportação
 */
export type ReportType = 'dashboard' | 'campaigns' | 'analytics' | 'custom';

/**
 * Interface para configuração de exportação
 */
export interface ExportConfig {
  format: 'pdf' | 'excel';
  reportType: ReportType;
  dateRange: {
    start: string;
    end: string;
  };
  includeCharts: boolean;
  includeData: boolean;
  filters?: {
    channels?: string[];
    regions?: string[];
    metrics?: string[];
  };
  customSections?: string[];
}

/**
 * Interface para status de exportação
 */
export interface ExportStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  fileName: string;
  downloadUrl?: string;
  error?: string;
  createdAt: Date;
}

/**
 * Props do componente ExportManager
 */
export interface ExportManagerProps {
  onExport?: (config: ExportConfig) => Promise<string>;
  className?: string;
}

/**
 * Componente para gerenciar exportação de relatórios
 */
export const ExportManager: React.FC<ExportManagerProps> = ({
  onExport,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: 'pdf',
    reportType: 'dashboard',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    includeCharts: true,
    includeData: true
  });

  const [exportHistory, setExportHistory] = useState<ExportStatus[]>([
    {
      id: '1',
      status: 'completed',
      progress: 100,
      fileName: 'dashboard-report-2024-01.pdf',
      downloadUrl: '#',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      status: 'completed',
      progress: 100,
      fileName: 'campaigns-analytics-2024-01.xlsx',
      downloadUrl: '#',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      status: 'processing',
      progress: 65,
      fileName: 'custom-report-2024-01.pdf',
      createdAt: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]);

  /**
   * Simula o processo de exportação
   */
  const handleExport = async () => {
    const newExport: ExportStatus = {
      id: Date.now().toString(),
      status: 'pending',
      progress: 0,
      fileName: `${exportConfig.reportType}-${exportConfig.format}-${new Date().toISOString().split('T')[0]}.${exportConfig.format === 'pdf' ? 'pdf' : 'xlsx'}`,
      createdAt: new Date()
    };

    setExportHistory(prev => [newExport, ...prev]);
    setIsModalOpen(false);

    // Simula progresso de exportação
    const updateProgress = (progress: number) => {
      setExportHistory(prev => 
        prev.map(exp => 
          exp.id === newExport.id 
            ? { ...exp, status: 'processing' as const, progress }
            : exp
        )
      );
    };

    // Simula processo de exportação
    setTimeout(() => updateProgress(25), 500);
    setTimeout(() => updateProgress(50), 1000);
    setTimeout(() => updateProgress(75), 1500);
    setTimeout(() => {
      setExportHistory(prev => 
        prev.map(exp => 
          exp.id === newExport.id 
            ? { 
                ...exp, 
                status: 'completed' as const, 
                progress: 100,
                downloadUrl: '#'
              }
            : exp
        )
      );
    }, 2000);

    if (onExport) {
      try {
        await onExport(exportConfig);
      } catch {
        setExportHistory(prev => 
          prev.map(exp => 
            exp.id === newExport.id 
              ? { 
                  ...exp, 
                  status: 'error' as const,
                  error: 'Erro ao gerar relatório'
                }
              : exp
          )
        );
      }
    }
  };

  /**
   * Renderiza o status de uma exportação
   */
  const renderExportStatus = (status: ExportStatus['status'], progress: number) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pendente</Badge>;
      case 'processing':
        return (
          <div className="flex items-center gap-2">
            <Badge variant="warning" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Processando
            </Badge>
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{progress}%</span>
          </div>
        );
      case 'completed':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Concluído</Badge>;
      case 'error':
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" />Erro</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {/* Botão principal de exportação */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Download className="h-4 w-4" />
        Exportar Relatório
      </Button>

      {/* Modal de configuração de exportação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Download className="h-6 w-6 text-blue-600" />
                Configurar Exportação
              </h2>

              <div className="space-y-6">
                {/* Formato */}
                <div>
                  <label className="block text-sm font-medium mb-2">Formato</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="pdf"
                        checked={exportConfig.format === 'pdf'}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, format: e.target.value as 'pdf' }))}
                        className="text-blue-600"
                      />
                      <FileText className="h-4 w-4 text-red-600" />
                      PDF
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="excel"
                        checked={exportConfig.format === 'excel'}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, format: e.target.value as 'excel' }))}
                        className="text-blue-600"
                      />
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      Excel
                    </label>
                  </div>
                </div>

                {/* Tipo de relatório */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Relatório</label>
                  <select
                    value={exportConfig.reportType}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, reportType: e.target.value as ReportType }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="dashboard">Dashboard Executivo</option>
                    <option value="campaigns">Relatório de Campanhas</option>
                    <option value="analytics">Analytics Detalhado</option>
                    <option value="custom">Relatório Personalizado</option>
                  </select>
                </div>

                {/* Período */}
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Período
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Data Inicial</label>
                      <input
                        type="date"
                        value={exportConfig.dateRange.start}
                        onChange={(e) => setExportConfig(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: e.target.value }
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Data Final</label>
                      <input
                        type="date"
                        value={exportConfig.dateRange.end}
                        onChange={(e) => setExportConfig(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: e.target.value }
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Opções de conteúdo */}
                <div>
                  <label className="block text-sm font-medium mb-2">Conteúdo</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportConfig.includeCharts}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                        className="text-blue-600"
                      />
                      Incluir gráficos e visualizações
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportConfig.includeData}
                        onChange={(e) => setExportConfig(prev => ({ ...prev, includeData: e.target.checked }))}
                        className="text-blue-600"
                      />
                      Incluir tabelas de dados
                    </label>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleExport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Histórico de exportações */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-600" />
          Histórico de Exportações
        </h3>
        
        <div className="space-y-3">
          {exportHistory.map((exportItem) => (
            <div
              key={exportItem.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                {exportItem.fileName.endsWith('.pdf') ? (
                  <FileText className="h-5 w-5 text-red-600" />
                ) : (
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <p className="font-medium text-sm">{exportItem.fileName}</p>
                  <p className="text-xs text-gray-500">
                    {exportItem.createdAt.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {renderExportStatus(exportItem.status, exportItem.progress)}
                {exportItem.status === 'completed' && exportItem.downloadUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(exportItem.downloadUrl, '_blank')}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportManager;
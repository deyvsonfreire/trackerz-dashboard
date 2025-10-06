/**
 * Componentes de Gráficos - Trackerz
 * 
 * Este módulo exporta todos os componentes de gráficos básicos e avançados
 * para análise de dados e visualização de métricas.
 */

// ===== GRÁFICOS BÁSICOS =====
// Gráfico de linha para tendências temporais
export { LineChart } from './LineChart';

// Gráfico de barras para comparações
export { BarChart } from './BarChart';

// ===== GRÁFICOS AVANÇADOS =====
// Gráfico de dispersão para análise de correlação
export { ScatterPlot } from './ScatterPlot';
export type { default as ScatterPlotProps } from './ScatterPlot';

// Gráfico de funil para análise de conversão
export { FunnelChart } from './FunnelChart';
export type { default as FunnelChartProps } from './FunnelChart';

// Gráfico gauge (velocímetro) para KPIs
export { GaugeChart } from './GaugeChart';
export type { default as GaugeChartProps } from './GaugeChart';

// Heatmap para análise de padrões em matriz
export { Heatmap } from './Heatmap';
export type { default as HeatmapProps } from './Heatmap';

// Diagrama Sankey para fluxos de dados
export { SankeyChart } from './SankeyChart';
export type { default as SankeyChartProps } from './SankeyChart';

// Box Plot para análise estatística
export { BoxPlot } from './BoxPlot';
export type { default as BoxPlotProps } from './BoxPlot';

// Mapa para visualização de dados geográficos
export { MapChart, InteractiveMapChart } from './MapChart';
export type { MapChartProps, MapDataPoint } from './MapChart';

// Heatmap demográfico para análise de audiência
export { DemographicHeatmap } from './DemographicHeatmap';

// Distribuição geográfica para análise regional
export { GeographicDistribution } from './GeographicDistribution';
export { CustomerJourney } from './CustomerJourney';
export { EngagementHeatmap } from './EngagementHeatmap';
export { CustomSegments } from './CustomSegments';
export { DevicePerformance } from './DevicePerformance';
export { CohortAnalysis } from './CohortAnalysis';

/**
 * Casos de uso recomendados:
 * 
 * ScatterPlot:
 * - Análise de correlação entre métricas (ex: investimento vs ROI)
 * - Identificação de padrões e outliers
 * - Comparação de performance entre campanhas
 * 
 * FunnelChart:
 * - Análise de funis de conversão
 * - Jornada do cliente
 * - Processos de vendas
 * 
 * GaugeChart:
 * - KPIs e metas
 * - Indicadores de performance
 * - Status de objetivos
 * 
 * Heatmap:
 * - Análise temporal (dias da semana vs horários)
 * - Correlação entre múltiplas variáveis
 * - Padrões de comportamento
 * 
 * SankeyChart:
 * - Fluxo de usuários entre páginas
 * - Origem e destino de leads
 * - Distribuição de receita
 * 
 * BoxPlot:
 * - Análise estatística de distribuições
 * - Identificação de outliers
 * - Comparação de variabilidade entre grupos
 * 
 * MapChart:
 * - Visualização de dados por região geográfica
 * - Análise de performance por estado/país
 * - Distribuição de leads e vendas por localização
 * - Heatmap de engajamento por região
 */
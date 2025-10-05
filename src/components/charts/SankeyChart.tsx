'use client';

import React from 'react';
import { Card } from '@/components/ui';

/**
 * Props para o componente SankeyChart
 */
interface SankeyChartProps {
  /** Dados dos nós */
  nodes: Array<{
    id: string;
    name: string;
    color?: string;
    category?: string;
  }>;
  /** Dados dos links/fluxos */
  links: Array<{
    source: string;
    target: string;
    value: number;
    color?: string;
  }>;
  /** Título do gráfico */
  title: string;
  /** Largura do gráfico */
  width?: number;
  /** Altura do gráfico */
  height?: number;
  /** Formato dos valores */
  valueFormatter?: (value: number) => string;
  /** Classe CSS adicional */
  className?: string;
  /** Callback ao clicar em um nó */
  onNodeClick?: (node: { id: string; name: string; color?: string; category?: string }) => void;
  /** Callback ao clicar em um link */
  onLinkClick?: (link: { source: string; target: string; value: number; color?: string }) => void;
}

/**
 * Componente SankeyChart para visualização de fluxos de dados
 * Ideal para análise de jornadas de usuários, fluxos de receita e transferências
 */
export const SankeyChart: React.FC<SankeyChartProps> = ({
  nodes,
  links,
  title,
  width = 800,
  height = 400,
  valueFormatter = (value) => value.toLocaleString(),
  className = '',
  onNodeClick,
  onLinkClick
}) => {
  // Cores padrão
  const defaultColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  // Calcula posições dos nós
  const nodePositions = React.useMemo(() => {
    const positions = new Map();
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    // Identifica níveis (colunas) baseado nas conexões
    const levels = new Map<string, number>();
    const visited = new Set<string>();
    
    // Função para calcular nível de um nó
    const calculateLevel = (nodeId: string, currentLevel = 0): number => {
      if (levels.has(nodeId)) {
        return Math.max(levels.get(nodeId)!, currentLevel);
      }
      
      levels.set(nodeId, currentLevel);
      
      // Encontra nós que este nó alimenta
      const outgoingLinks = links.filter(link => link.source === nodeId);
      let maxChildLevel = currentLevel;
      
      outgoingLinks.forEach(link => {
        if (!visited.has(link.target)) {
          visited.add(link.target);
          const childLevel = calculateLevel(link.target, currentLevel + 1);
          maxChildLevel = Math.max(maxChildLevel, childLevel);
        }
      });
      
      return maxChildLevel;
    };
    
    // Calcula níveis para todos os nós
    nodes.forEach(node => {
      if (!visited.has(node.id)) {
        visited.add(node.id);
        calculateLevel(node.id);
      }
    });
    
    // Agrupa nós por nível
    const nodesByLevel = new Map<number, string[]>();
    levels.forEach((level, nodeId) => {
      if (!nodesByLevel.has(level)) {
        nodesByLevel.set(level, []);
      }
      nodesByLevel.get(level)!.push(nodeId);
    });
    
    // Calcula posições
    const maxLevel = Math.max(...levels.values());
    const levelWidth = width / (maxLevel + 1);
    const nodeHeight = 40;
    const nodeSpacing = 20;
    
    nodesByLevel.forEach((nodeIds, level) => {
      const totalHeight = nodeIds.length * nodeHeight + (nodeIds.length - 1) * nodeSpacing;
      const startY = (height - totalHeight) / 2;
      
      nodeIds.forEach((nodeId, index) => {
        const x = level * levelWidth + levelWidth / 2;
        const y = startY + index * (nodeHeight + nodeSpacing);
        
        // Calcula valor total do nó (soma dos links de entrada ou saída)
        const incomingValue = links
          .filter(link => link.target === nodeId)
          .reduce((sum, link) => sum + link.value, 0);
        const outgoingValue = links
          .filter(link => link.source === nodeId)
          .reduce((sum, link) => sum + link.value, 0);
        const nodeValue = Math.max(incomingValue, outgoingValue);
        
        positions.set(nodeId, {
          x,
          y,
          width: 120,
          height: Math.max(nodeHeight, nodeValue / 1000), // Altura proporcional ao valor
          value: nodeValue,
          level
        });
      });
    });
    
    return positions;
  }, [nodes, links, width, height]);

  // Gera paths dos links
  const linkPaths = React.useMemo(() => {
    return links.map((link, index) => {
      const sourcePos = nodePositions.get(link.source);
      const targetPos = nodePositions.get(link.target);
      
      if (!sourcePos || !targetPos) return null;
      
      const sourceX = sourcePos.x + sourcePos.width;
      const sourceY = sourcePos.y + sourcePos.height / 2;
      const targetX = targetPos.x;
      const targetY = targetPos.y + targetPos.height / 2;
      
      // Controle de curvatura
      const controlX1 = sourceX + (targetX - sourceX) * 0.5;
      const controlX2 = targetX - (targetX - sourceX) * 0.5;
      
      // Espessura proporcional ao valor
      const maxValue = Math.max(...links.map(l => l.value));
      const strokeWidth = Math.max(2, (link.value / maxValue) * 30);
      
      const path = `M ${sourceX} ${sourceY} C ${controlX1} ${sourceY} ${controlX2} ${targetY} ${targetX} ${targetY}`;
      
      return {
        path,
        strokeWidth,
        color: link.color || defaultColors[index % defaultColors.length],
        link,
        opacity: 0.6
      };
    }).filter(Boolean);
  }, [links, nodePositions, defaultColors]);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Fluxo de dados entre diferentes categorias
        </p>
      </div>

      <div className="overflow-auto">
        <svg width={width} height={height} className="border border-gray-200 rounded-lg">
          {/* Links */}
          <g>
            {linkPaths.map((linkPath, index) => (
              <g key={index}>
                <path
                  d={linkPath!.path}
                  fill="none"
                  stroke={linkPath!.color}
                  strokeWidth={linkPath!.strokeWidth}
                  opacity={linkPath!.opacity}
                  className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                  onClick={() => onLinkClick && onLinkClick(linkPath!.link)}
                />
              </g>
            ))}
          </g>

          {/* Nós */}
          <g>
            {Array.from(nodePositions.entries()).map(([nodeId, position]) => {
              const node = nodes.find(n => n.id === nodeId)!;
              const nodeColor = node.color || defaultColors[nodes.indexOf(node) % defaultColors.length];
              
              return (
                <g key={nodeId}>
                  {/* Retângulo do nó */}
                  <rect
                    x={position.x}
                    y={position.y}
                    width={position.width}
                    height={position.height}
                    fill={nodeColor}
                    rx="4"
                    className="transition-all duration-200 hover:opacity-80 cursor-pointer"
                    onClick={() => onNodeClick && onNodeClick(node)}
                  />
                  
                  {/* Texto do nó */}
                  <text
                    x={position.x + position.width / 2}
                    y={position.y + position.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-white pointer-events-none"
                  >
                    {node.name}
                  </text>
                  
                  {/* Valor do nó */}
                  <text
                    x={position.x + position.width / 2}
                    y={position.y + position.height + 15}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 pointer-events-none"
                  >
                    {valueFormatter(position.value)}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Estatísticas */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{nodes.length}</div>
          <div className="text-sm text-gray-500">Nós</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{links.length}</div>
          <div className="text-sm text-gray-500">Conexões</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {valueFormatter(links.reduce((sum, link) => sum + link.value, 0))}
          </div>
          <div className="text-sm text-gray-500">Fluxo Total</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.max(...Array.from(nodePositions.values()).map(p => p.level)) + 1}
          </div>
          <div className="text-sm text-gray-500">Níveis</div>
        </div>
      </div>

      {/* Insights */}
      {links.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">🔍 Análise de Fluxo</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {(() => {
              const maxLink = links.reduce((max, current) => 
                current.value > max.value ? current : max
              );
              const sourceNode = nodes.find(n => n.id === maxLink.source);
              const targetNode = nodes.find(n => n.id === maxLink.target);
              
              const totalFlow = links.reduce((sum, link) => sum + link.value, 0);
              const avgFlow = totalFlow / links.length;
              
              return (
                <>
                  <p>• Maior fluxo: {sourceNode?.name} → {targetNode?.name} ({valueFormatter(maxLink.value)})</p>
                  <p>• Fluxo médio: {valueFormatter(avgFlow)}</p>
                  <p>• Eficiência: {((maxLink.value / totalFlow) * 100).toFixed(1)}% concentrado no maior fluxo</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SankeyChart;
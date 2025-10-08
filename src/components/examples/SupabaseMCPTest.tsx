'use client';

import { useState } from 'react';
import { mcp_supabase_list_projects, mcp_supabase_get_project, mcp_supabase_list_tables } from '@/lib/mcp/supabase';

/**
 * @component SupabaseMCPTest
 * @description Componente para testar a conexão com o Supabase via MCP
 */
const SupabaseMCPTest = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função para listar projetos
  const handleListProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/supabase/list-projects');
      if (!response.ok) {
        throw new Error(`Erro ao listar projetos: ${response.statusText}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      console.error('Erro ao listar projetos:', err);
      setError(err.message || 'Erro ao listar projetos');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter detalhes do projeto
  const handleGetProject = async () => {
    if (!selectedProject) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/supabase/get-project?id=${selectedProject}`);
      if (!response.ok) {
        throw new Error(`Erro ao obter detalhes do projeto: ${response.statusText}`);
      }
      const data = await response.json();
      setProjectDetails(data);
    } catch (err: any) {
      console.error('Erro ao obter detalhes do projeto:', err);
      setError(err.message || 'Erro ao obter detalhes do projeto');
    } finally {
      setLoading(false);
    }
  };

  // Função para listar tabelas
  const handleListTables = async () => {
    if (!selectedProject) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/supabase/list-tables?projectId=${selectedProject}`);
      if (!response.ok) {
        throw new Error(`Erro ao listar tabelas: ${response.statusText}`);
      }
      const data = await response.json();
      setTables(data);
    } catch (err: any) {
      console.error('Erro ao listar tabelas:', err);
      setError(err.message || 'Erro ao listar tabelas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Teste de Conexão com Supabase via MCP</h2>
      
      {/* Botão para listar projetos */}
      <div className="mb-6">
        <button
          onClick={handleListProjects}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Listar Projetos Supabase'}
        </button>
      </div>

      {/* Lista de projetos */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Projetos Disponíveis:</h3>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um projeto</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Botões para ações no projeto selecionado */}
      {selectedProject && (
        <div className="mb-6 flex gap-4">
          <button
            onClick={handleGetProject}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Carregando...' : 'Obter Detalhes do Projeto'}
          </button>
          <button
            onClick={handleListTables}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Carregando...' : 'Listar Tabelas'}
          </button>
        </div>
      )}

      {/* Exibição de erro */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          <div className="font-medium">Erro:</div>
          <div>{error}</div>
        </div>
      )}

      {/* Exibição dos detalhes do projeto */}
      {projectDetails && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Detalhes do Projeto:</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="whitespace-pre-wrap">{JSON.stringify(projectDetails, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Exibição das tabelas */}
      {tables.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tabelas Disponíveis:</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <ul className="list-disc pl-5 space-y-1">
              {tables.map((table, index) => (
                <li key={index}>{table.name || table}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseMCPTest;
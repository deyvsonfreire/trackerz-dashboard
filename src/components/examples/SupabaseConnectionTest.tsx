'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * @component SupabaseConnectionTest
 * @description Componente para testar a conexão com o Supabase e exibir dados de tabelas disponíveis
 */
const SupabaseConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [tableData, setTableData] = useState<any[] | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // Testar a conexão com o Supabase ao carregar o componente
  useEffect(() => {
    const testConnection = async () => {
      try {
        // Tenta fazer uma consulta simples para verificar a conexão
        const { data, error } = await supabase.rpc('get_schema_tables');
        
        if (error) throw error;
        
        // Se chegou aqui, a conexão foi bem-sucedida
        setConnectionStatus('success');
        
        // Definir tabelas disponíveis
        const availableTables = [
          'meta_ad_insights',
          'rd_crm_deals',
          'rd_crm_contacts',
          'rd_marketing_contatos',
          '3cx_call_records',
          '3cx_contacts'
        ];
        
        setTables(availableTables);
      } catch (error: any) {
        console.error('Erro ao conectar com Supabase:', error);
        setConnectionStatus('error');
        setErrorMessage(error.message || 'Erro desconhecido ao conectar com Supabase');
      }
    };

    testConnection();
  }, []);

  // Função para buscar dados da tabela selecionada
  const fetchTableData = async () => {
    if (!selectedTable) return;
    
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from(selectedTable)
        .select('*')
        .limit(10);
      
      if (error) throw error;
      
      setTableData(data);
    } catch (error: any) {
      console.error(`Erro ao buscar dados da tabela ${selectedTable}:`, error);
      setErrorMessage(error.message || `Erro ao buscar dados da tabela ${selectedTable}`);
      setTableData(null);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Teste de Conexão com Supabase</h2>
      
      {/* Status da conexão */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Status da Conexão:</h3>
        {connectionStatus === 'loading' && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            <span>Testando conexão...</span>
          </div>
        )}
        {connectionStatus === 'success' && (
          <div className="text-green-600 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Conectado com sucesso ao Supabase!
          </div>
        )}
        {connectionStatus === 'error' && (
          <div className="text-red-600 font-medium">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Erro ao conectar com Supabase
            </div>
            {errorMessage && <div className="text-sm bg-red-50 p-2 rounded">{errorMessage}</div>}
          </div>
        )}
      </div>

      {/* Seleção de tabela e exibição de dados */}
      {connectionStatus === 'success' && (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tabelas Disponíveis:</h3>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione uma tabela</option>
                  {tables.map((table) => (
                    <option key={table} value={table}>
                      {table}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={fetchTableData}
                disabled={!selectedTable || isLoadingData}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoadingData ? 'Carregando...' : 'Buscar Dados'}
              </button>
            </div>
          </div>

          {/* Exibição dos dados da tabela */}
          {tableData && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Dados da Tabela ({selectedTable}):</h3>
              {tableData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(tableData[0]).map((key) => (
                          <th
                            key={key}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((value: any, valueIndex) => (
                            <td
                              key={valueIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">Nenhum dado encontrado na tabela.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SupabaseConnectionTest;
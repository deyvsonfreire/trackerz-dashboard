'use client';

import { useState } from 'react';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { ProductsParams } from '@/lib/api/products';

export default function ProductsExample() {
  const [params, setParams] = useState<ProductsParams>({
    page: 1,
    pageSize: 10,
    sortBy: 'created_at',
    sortDirection: 'desc'
  });

  const { data, isLoading, error, refetch } = useFetchProducts(params);

  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('searchTerm') as string;
    setParams(prev => ({ ...prev, searchTerm, page: 1 }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value || undefined;
    setParams(prev => ({ ...prev, categoryId, page: 1 }));
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <h2 className="text-lg font-bold">Erro ao carregar produtos</h2>
        <p>{error.message}</p>
        <button 
          onClick={() => refetch()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lista de Produtos</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex gap-2">
            <input
              type="text"
              name="searchTerm"
              placeholder="Buscar produtos..."
              className="flex-1 px-4 py-2 border rounded-md"
              defaultValue={params.searchTerm || ''}
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        </form>
        
        <div className="w-full md:w-64">
          <select
            onChange={handleCategoryChange}
            value={params.categoryId || ''}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Todas as categorias</option>
            <option value="1">Eletrônicos</option>
            <option value="2">Roupas</option>
            <option value="3">Acessórios</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {data?.data.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estoque
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.data.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.image_url && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.image_url}
                                alt={product.name}
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            {product.sku && (
                              <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(product.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category_name || 'Sem categoria'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock_quantity ?? 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(data.page - 1) * data.pageSize + 1}</span> a{' '}
                <span className="font-medium">
                  {Math.min(data.page * data.pageSize, data.count)}
                </span>{' '}
                de <span className="font-medium">{data.count}</span> resultados
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(data.page - 1)}
                  disabled={data.page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => handlePageChange(data.page + 1)}
                  disabled={data.page === data.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
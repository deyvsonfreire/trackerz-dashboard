import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchProducts, ProductsParams } from '@/lib/api/products';
import { Product } from '@/types/product';

/**
 * Hook personalizado para buscar produtos usando TanStack Query
 * 
 * @param params - Parâmetros para filtrar, paginar e ordenar produtos
 * @param options - Opções adicionais para o hook useQuery
 * @returns Resultado da query com dados dos produtos, status de carregamento e erro
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchProducts({ 
 *   categoryId: '123', 
 *   page: 1, 
 *   pageSize: 10 
 * });
 * ```
 */
export function useFetchProducts(
  params: ProductsParams = {},
  options?: Omit<UseQueryOptions<{
    data: Product[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
}
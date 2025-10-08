import { supabase } from '@/lib/supabase';

/**
 * Interface que define os parâmetros para busca de produtos
 */
export interface ProductsParams {
  /** ID da categoria para filtrar produtos */
  categoryId?: string;
  /** Termo de busca para filtrar produtos por nome */
  searchTerm?: string;
  /** Página atual para paginação */
  page?: number;
  /** Quantidade de itens por página */
  pageSize?: number;
  /** Campo para ordenação */
  sortBy?: string;
  /** Direção da ordenação (asc ou desc) */
  sortDirection?: 'asc' | 'desc';
}

/**
 * Busca produtos no Supabase com base nos parâmetros fornecidos
 * @param params Parâmetros para filtrar, paginar e ordenar produtos
 * @returns Promise com array de produtos e contagem total
 */
export async function fetchProducts(params: ProductsParams = {}) {
  const {
    categoryId,
    searchTerm,
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortDirection = 'desc'
  } = params;

  // Calcular o range para paginação
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Iniciar a query
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  // Aplicar filtros se fornecidos
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  if (searchTerm) {
    query = query.ilike('name', `%${searchTerm}%`);
  }

  // Aplicar ordenação e paginação
  const { data, error, count } = await query
    .order(sortBy, { ascending: sortDirection === 'asc' })
    .range(from, to);

  if (error) {
    throw new Error(`Erro ao buscar produtos: ${error.message}`);
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    totalPages: count ? Math.ceil(count / pageSize) : 0
  };
}
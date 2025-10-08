import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchUsers, UsersParams } from '@/lib/api/users';

/**
 * Tipo para um usuário
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

/**
 * Hook para buscar usuários da API
 * 
 * Este hook utiliza TanStack Query para buscar usuários com suporte a paginação,
 * filtragem, ordenação e cache inteligente. Os dados são automaticamente revalidados
 * quando a janela recebe foco novamente.
 * 
 * @param params - Parâmetros para a busca de usuários
 * @param options - Opções adicionais para o useQuery
 * @returns Objeto contendo dados dos usuários, status de carregamento e erro
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchUsers({ 
 *   page: 1, 
 *   limit: 20,
 *   role: 'admin',
 *   sortBy: 'name',
 *   sortOrder: 'asc'
 * });
 * 
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 * 
 * return (
 *   <UserList users={data || []} />
 * );
 * ```
 */
export function useFetchUsers(
  params: UsersParams = {}, 
  options?: Omit<UseQueryOptions<User[], Error>, 'queryKey' | 'queryFn'>
) {
  const { 
    page = 1, 
    limit = 20, 
    search, 
    status, 
    role,
    sortBy = 'name',
    sortOrder = 'asc'
  } = params;

  return useQuery<User[], Error>({
    queryKey: ['users', page, limit, search, status, role, sortBy, sortOrder],
    queryFn: () => fetchUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    refetchOnWindowFocus: true,
    ...options
  });
}
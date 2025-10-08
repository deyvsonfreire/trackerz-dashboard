import { User } from '@/hooks/useFetchUsers';

export interface UsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  role?: 'admin' | 'user' | 'editor' | 'all';
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Busca usuários da API com base nos parâmetros fornecidos
 * @param params Parâmetros para filtrar os usuários
 * @returns Promise com array de usuários
 */
export async function fetchUsers(params: UsersParams = {}): Promise<User[]> {
  // Simulação de chamada à API
  // Em um ambiente real, isso seria substituído por uma chamada fetch ou axios
  const { 
    page = 1, 
    limit = 20, 
    search, 
    status, 
    role,
    sortBy = 'name',
    sortOrder = 'asc'
  } = params;
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Dados simulados
  const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `Usuário ${i + 1}`,
    email: `usuario${i + 1}@exemplo.com`,
    role: i % 3 === 0 ? 'admin' : i % 3 === 1 ? 'editor' : 'user',
    status: i % 5 === 0 ? 'inactive' : 'active',
    createdAt: new Date(Date.now() - i * 86400000 * 30).toISOString(),
    lastLogin: i % 7 === 0 ? undefined : new Date(Date.now() - i * 86400000).toISOString()
  }));
  
  // Aplicar filtragem por status se fornecido
  let filteredUsers = mockUsers;
  if (status && status !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.status === status);
  }
  
  // Aplicar filtragem por função se fornecida
  if (role && role !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  // Aplicar filtragem por termo de busca se fornecido
  if (search) {
    const searchLower = search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      user => user.name.toLowerCase().includes(searchLower) || 
              user.email.toLowerCase().includes(searchLower)
    );
  }
  
  // Aplicar ordenação
  filteredUsers.sort((a, b) => {
    let valueA, valueB;
    
    // Determinar os valores a serem comparados com base no campo de ordenação
    switch (sortBy) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'email':
        valueA = a.email;
        valueB = b.email;
        break;
      case 'createdAt':
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      case 'lastLogin':
        valueA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        valueB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
        break;
      default:
        valueA = a.name;
        valueB = b.name;
    }
    
    // Aplicar a direção da ordenação
    const compareResult = typeof valueA === 'string' 
      ? valueA.localeCompare(valueB as string)
      : (valueA as number) - (valueB as number);
      
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });
  
  // Aplicar paginação
  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
  
  return paginatedUsers;
}
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchEvents, EventsParams } from '@/lib/api/events';
import { Event } from '@/types/event';

/**
 * Hook para buscar eventos da API
 * 
 * Este hook utiliza TanStack Query para buscar eventos com suporte a paginação,
 * filtragem e cache inteligente. Os dados são automaticamente revalidados
 * quando a janela recebe foco novamente.
 * 
 * @param params - Parâmetros para a busca de eventos
 * @param options - Opções adicionais para o useQuery
 * @returns Objeto contendo dados dos eventos, status de carregamento e erro
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchEvents({ 
 *   page: 1, 
 *   limit: 10,
 *   categoryId: 'tech-events'
 * });
 * 
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 * 
 * return (
 *   <EventList events={data || []} />
 * );
 * ```
 */
export function useFetchEvents(
  params: EventsParams = {}, 
  options?: Omit<UseQueryOptions<Event[], Error>, 'queryKey' | 'queryFn'>
) {
  const { 
    page = 1, 
    limit = 10, 
    filter, 
    categoryId, 
    startDate, 
    endDate 
  } = params;

  return useQuery<Event[], Error>({
    queryKey: ['events', page, limit, filter, categoryId, startDate, endDate],
    queryFn: () => fetchEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    refetchOnWindowFocus: true,
    ...options
  });
}
import { Event } from '@/types/event';

export interface EventsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

/**
 * Busca eventos da API com base nos parâmetros fornecidos
 * @param params Parâmetros para filtrar os eventos
 * @returns Promise com array de eventos
 */
export async function fetchEvents(params: EventsParams = {}): Promise<Event[]> {
  // Simulação de chamada à API
  // Em um ambiente real, isso seria substituído por uma chamada fetch ou axios
  const { page = 1, limit = 10 } = params;
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Dados simulados
  const mockEvents: Event[] = Array.from({ length: 20 }, (_, i) => ({
    id: `event-${i + 1}`,
    title: `Evento ${i + 1}`,
    description: `Descrição do evento ${i + 1}`,
    date: new Date(Date.now() + i * 86400000).toISOString(),
    location: `Local ${i + 1}`,
    categoryId: i % 3 === 0 ? 'tech' : i % 3 === 1 ? 'business' : 'social',
    attendees: Math.floor(Math.random() * 100)
  }));
  
  // Aplicar filtragem por categoria se fornecida
  let filteredEvents = mockEvents;
  if (params.categoryId) {
    filteredEvents = filteredEvents.filter(event => event.categoryId === params.categoryId);
  }
  
  // Aplicar filtragem por data se fornecida
  if (params.startDate) {
    const startDate = new Date(params.startDate);
    filteredEvents = filteredEvents.filter(event => new Date(event.date) >= startDate);
  }
  
  if (params.endDate) {
    const endDate = new Date(params.endDate);
    filteredEvents = filteredEvents.filter(event => new Date(event.date) <= endDate);
  }
  
  // Aplicar filtragem por termo de busca se fornecido
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredEvents = filteredEvents.filter(
      event => event.title.toLowerCase().includes(searchLower) || 
               event.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Aplicar paginação
  const startIndex = (page - 1) * limit;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + limit);
  
  return paginatedEvents;
}
'use client';

import { useState } from 'react';
import { useFetchEvents } from '@/hooks/useFetchEvents';
import { Event } from '@/types/event';

export default function EventsExample() {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  
  const { 
    data: events, 
    isLoading, 
    error, 
    refetch 
  } = useFetchEvents({ 
    page: 1, 
    limit: 5,
    categoryId 
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryId(value === 'all' ? undefined : value);
  };

  if (isLoading) return <div className="p-4">Carregando eventos...</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Eventos</h2>
      
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">Filtrar por categoria:</label>
        <select 
          id="category"
          className="border p-2 rounded w-full max-w-xs"
          onChange={handleCategoryChange}
          value={categoryId || 'all'}
        >
          <option value="all">Todas as categorias</option>
          <option value="tech">Tecnologia</option>
          <option value="business">Negócios</option>
          <option value="social">Social</option>
        </select>
      </div>
      
      <button 
        onClick={() => refetch()} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Atualizar
      </button>
      
      {events && events.length > 0 ? (
        <div className="grid gap-4">
          {events.map((event: Event) => (
            <div key={event.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <div className="mt-2 text-sm">
                <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                <p>Local: {event.location}</p>
                <p>Categoria: {event.categoryId}</p>
                <p>Participantes: {event.attendees}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}
    </div>
  );
}
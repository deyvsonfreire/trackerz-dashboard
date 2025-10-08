/**
 * Interface que representa um evento
 */
export interface Event {
  /** Identificador único do evento */
  id: string;
  /** Título do evento */
  title: string;
  /** Descrição detalhada do evento */
  description: string;
  /** Data e hora do evento em formato ISO */
  date: string;
  /** Local onde o evento ocorrerá */
  location: string;
  /** Identificador da categoria do evento */
  categoryId: string;
  /** Número de participantes confirmados */
  attendees: number;
}
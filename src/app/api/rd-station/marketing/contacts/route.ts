import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const rdMarketingContactsSchema = z.array(
  z.object({
    id: z.number(),
    rd_contact_id: z.string(),
    email: z.string(),
    nome: z.string().optional(),
    sobrenome: z.string().optional(),
    telefone: z.string().optional(),
    empresa: z.string().optional(),
    cargo: z.string().optional(),
    lead_score: z.number().default(0),
    estagio_funil: z.string().optional(),
    origem_lead: z.string().optional(),
    canal_origem: z.string().optional(),
    data_criacao: z.string().optional(),
    data_ultima_atualizacao: z.string().optional(),
    data_ultima_interacao: z.string().optional(),
    status_lead: z.string().default('lead'),
    tags: z.any().optional(),
    campos_personalizados: z.any().optional(),
    created_at: z.string(),
    updated_at: z.string(),
  })
);

export async function GET() {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return handleError(new Error('Unauthorized'), 401);
    }

    const { data, error } = await supabase
      .from('rd_marketing_contacts')
      .select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = rdMarketingContactsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
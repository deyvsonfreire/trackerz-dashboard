import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const rdMarketingEventsSchema = z.array(
  z.object({
    id: z.number(),
    rd_conversion_id: z.string(),
    rd_contact_id: z.string(),
    rd_campaign_id: z.string().optional(),
    tipo_conversao: z.string(),
    fonte_conversao: z.string().optional(),
    canal_conversao: z.string().optional(),
    landing_page_origem: z.string().optional(),
    valor_conversao: z.number().default(0),
    data_conversao: z.string(),
    detalhes_conversao: z.any().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    created_at: z.string(),
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
      .from('rd_marketing_events')
      .select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = rdMarketingEventsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const metaPageInsightsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    page_id: z.string(),
    date: z.string(),
    page_impressions: z.number().default(0),
    page_reach: z.number().default(0),
    page_engaged_users: z.number().default(0),
    page_views_total: z.number().default(0),
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

    const { data, error } = await supabase.from('meta_page_insights').select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = metaPageInsightsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
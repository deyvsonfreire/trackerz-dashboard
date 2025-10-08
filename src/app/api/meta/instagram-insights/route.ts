import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const metaInstagramInsightsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    account_id: z.string().uuid(),
    date: z.string(),
    impressions: z.number().default(0),
    reach: z.number().default(0),
    profile_views: z.number().default(0),
    website_clicks: z.number().default(0),
    follower_count: z.number().default(0),
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
      .from('meta_instagram_insights')
      .select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = metaInstagramInsightsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
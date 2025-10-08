import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { handleError } from '@/utils/error/handler';

const googleBusinessProfileMetricsSchema = z.array(
  z.object({
    id: z.number(),
    location_id: z.string(),
    date: z.string(),
    impressions_desktop_maps: z.number().default(0),
    impressions_desktop_search: z.number().default(0),
    impressions_mobile_maps: z.number().default(0),
    impressions_mobile_search: z.number().default(0),
    conversations: z.number().default(0),
    direction_requests: z.number().default(0),
    call_clicks: z.number().default(0),
    website_clicks: z.number().default(0),
    bookings: z.number().default(0),
    food_orders: z.number().default(0),
    food_menu_clicks: z.number().default(0),
    total_impressions: z.number(),
    total_actions: z.number(),
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
      .from('business_profile_metrics')
      .select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = googleBusinessProfileMetricsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const googleAnalyticsMetricsSchema = z.array(
  z.object({
    id: z.number(),
    property_id: z.string(),
    date: z.string(),
    active_users: z.number().optional(),
    new_users: z.number().optional(),
    returning_users: z.number().optional(),
    sessions: z.number().optional(),
    bounce_rate: z.number().optional(),
    average_session_duration: z.number().optional(),
    screen_page_views: z.number().optional(),
    unique_page_views: z.number().optional(),
    event_count: z.number().optional(),
    key_events: z.number().optional(),
    purchase_revenue: z.number().optional(),
    total_revenue: z.number().optional(),
    transactions: z.number().optional(),
    items_purchased: z.number().optional(),
    add_to_carts: z.number().optional(),
    checkouts: z.number().optional(),
    device_category: z.string().optional(),
    browser: z.string().optional(),
    country: z.string().optional(),
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign_name: z.string().optional(),
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
      .from('google_analytics_metrics')
      .select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = googleAnalyticsMetricsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
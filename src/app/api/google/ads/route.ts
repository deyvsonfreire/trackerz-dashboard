import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const googleAdsMetricsSchema = z.array(
  z.object({
    id: z.number(),
    customer_id: z.string(),
    date: z.string(),
    campaign_id: z.string().optional(),
    ad_group_id: z.string().optional(),
    ad_id: z.string().optional(),
    keyword_id: z.string().optional(),
    impressions: z.number().default(0),
    clicks: z.number().default(0),
    cost: z.number(),
    ctr: z.number(),
    average_cpc: z.number(),
    average_cpm: z.number(),
    conversions: z.number().default(0),
    conversions_value: z.number().default(0),
    all_conversions: z.number().default(0),
    all_conversions_value: z.number().default(0),
    cost_per_conversion: z.number(),
    cost_per_all_conversion: z.number(),
    campaign_name: z.string().optional(),
    ad_group_name: z.string().optional(),
    keyword_text: z.string().optional(),
    ad_network_type: z.string().optional(),
    device: z.string().optional(),
    geo_target: z.string().optional(),
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
      .from('google_ads_metrics')
      .select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = googleAdsMetricsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
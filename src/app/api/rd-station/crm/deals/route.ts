import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const rdCrmDealsSchema = z.array(
  z.object({
    id: z.number(),
    rd_deal_id: z.string(),
    name: z.string(),
    amount: z.number().optional(),
    currency: z.string().default('BRL'),
    stage_id: z.string().optional(),
    stage_name: z.string().optional(),
    pipeline_id: z.string().optional(),
    pipeline_name: z.string().optional(),
    organization_id: z.string().optional(),
    contact_id: z.string().optional(),
    user_id: z.string().optional(),
    source_id: z.string().optional(),
    source_name: z.string().optional(),
    probability: z.number().optional(),
    expected_close_date: z.string().optional(),
    actual_close_date: z.string().optional(),
    status: z.string().optional(),
    lost_reason_id: z.string().optional(),
    lost_reason_name: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    won_at: z.string().optional(),
    lost_at: z.string().optional(),
    custom_fields: z.any().optional(),
    trackerz_customer_id: z.number().optional(),
    sync_status: z.string().default('pending'),
    last_sync_at: z.string(),
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

    const { data, error } = await supabase.from('rd_crm_deals').select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = rdCrmDealsSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
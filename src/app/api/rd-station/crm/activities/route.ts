import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { handleError } from '@/utils/error/handler';
import { z } from 'zod';

const rdCrmActivitiesSchema = z.array(
  z.object({
    id: z.number(),
    rd_activity_id: z.string(),
    type: z.string().optional(),
    subject: z.string().optional(),
    description: z.string().optional(),
    deal_id: z.string().optional(),
    contact_id: z.string().optional(),
    organization_id: z.string().optional(),
    user_id: z.string().optional(),
    duration_minutes: z.number().optional(),
    scheduled_at: z.string().optional(),
    completed_at: z.string().optional(),
    status: z.string().optional(),
    outcome: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    custom_fields: z.any().optional(),
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

    const { data, error } = await supabase.from('rd_crm_activities').select('*');

    if (error) {
      return handleError(error, 500);
    }

    const parsedData = rdCrmActivitiesSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError(parsedData.error, 500);
    }

    return NextResponse.json(parsedData.data);
  } catch (error) {
    return handleError(error, 500);
  }
}
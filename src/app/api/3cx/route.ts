import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { handleError } from '@/utils/error/handler'

export async function GET() {
  try {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return handleError(new Error('Unauthorized'), 401)
    }

    const { data, error } = await supabase.from('3cx_call_records').select('*')

    if (error) {
      return handleError(error, 500)
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error, 500)
  }
}
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  // Redireciona usuários autenticados para o dashboard
  redirect('/dashboard')
}
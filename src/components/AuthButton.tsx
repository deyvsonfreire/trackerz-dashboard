'use client';

import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function AuthButton({ user }: { user: User | null }) {
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <button onClick={handleSignOut} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
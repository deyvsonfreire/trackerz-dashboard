'use client';

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

type AuthView = 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password' | 'update_password'

export default function AuthForm() {
  const supabase = createClient()
  const [view, setView] = useState<AuthView>('sign_in')

  const handleSetView = (newView: AuthView) => {
    setView(newView)
  }

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'azure']}
        view={view}
        showLinks={false}
        redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
      />
      <div className="mt-4 text-center text-sm">
        {view === 'sign_in' && (
          <>
            <p>
              Não tem uma conta?{' '}
              <button onClick={() => handleSetView('sign_up')} className="font-medium text-blue-600 hover:underline">
                Registre-se
              </button>
            </p>
            <p className="mt-2">
              <button onClick={() => handleSetView('forgotten_password')} className="font-medium text-blue-600 hover:underline">
                Esqueceu a senha?
              </button>
            </p>
          </>
        )}
        {view === 'sign_up' && (
          <p>
            Já tem uma conta?{' '}
            <button onClick={() => handleSetView('sign_in')} className="font-medium text-blue-600 hover:underline">
              Faça login
            </button>
          </p>
        )}
        {(view === 'forgotten_password' || view === 'magic_link') && (
          <p>
            Lembrou da senha?{' '}
            <button onClick={() => handleSetView('sign_in')} className="font-medium text-blue-600 hover:underline">
              Faça login
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
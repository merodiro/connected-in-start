import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { GalleryVerticalEnd } from 'lucide-react'
import { useState } from 'react'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { LoginForm } from '@/components/auth/login-form'
import { SignupForm } from '@/components/auth/signup-form'

type AuthView = 'login' | 'signup' | 'forgot-password'

function AuthComponent() {
  const [currentView, setCurrentView] = useState<AuthView>('login')
  const navigate = useNavigate({ from: '/auth' })

  const handleSuccess = async () => {
    // Redirect to home page using TanStack Router
    await navigate({ to: '/' })
  }

  const renderCurrentForm = () => {
    switch (currentView) {
      case 'login': {
        return (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignup={() => setCurrentView('signup')}
            onForgotPassword={() => setCurrentView('forgot-password')}
          />
        )
      }
      case 'signup': {
        return (
          <SignupForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )
      }
      case 'forgot-password': {
        return (
          <ForgotPasswordForm
            onSuccess={handleSuccess}
            onBackToLogin={() => setCurrentView('login')}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        {renderCurrentForm()}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/auth')({
  component: AuthComponent,
})

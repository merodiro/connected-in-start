import { useState } from 'react'
import { AlertCircleIcon } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const loginSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToSignup?: () => void
  onForgotPassword?: () => void
}

export function LoginForm({
  onSuccess,
  onSwitchToSignup,
  onForgotPassword,
}: LoginFormProps) {
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null)
        const result = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: '/',
        })

        if (result.error) {
          setError(result.error.message || 'Login failed')
        } else {
          onSuccess?.()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    },
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          id="login-form"
        >
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircleIcon />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      {onForgotPassword && (
                        <button
                          type="button"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                          onClick={onForgotPassword}
                        >
                          Forgot your password?
                        </button>
                      )}
                    </div>
                    <Input
                      id={field.name}
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Field orientation="vertical">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="flex-1"
                disabled={!canSubmit}
                form="login-form"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            )}
          </form.Subscribe>
          {onSwitchToSignup && (
            <FieldDescription className="text-center">
              Don't have an account?
              <Button
                type="button"
                variant="link"
                className="underline underline-offset-4 text-muted-foreground px-0 ml-1 hover:text-primary"
                onClick={onSwitchToSignup}
              >
                Sign up
              </Button>
            </FieldDescription>
          )}
        </Field>
      </CardFooter>
    </Card>
  )
}

import { revalidateLogic, useForm } from '@tanstack/react-form'
import { AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import * as z from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'

const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .nonempty({ message: 'Email or username is required' })
    .min(3, { message: 'Email or username must be at least 3 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

type LoginFormProps = {
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
      emailOrUsername: '',
      password: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null)
        const isEmail = value.emailOrUsername.includes('@')
        const result = isEmail
          ? await authClient.signIn.email({
              email: value.emailOrUsername,
              password: value.password,
              callbackURL: '/',
            })
          : await authClient.signIn.username({
              username: value.emailOrUsername,
              password: value.password,
              callbackURL: '/',
            })

        if (result.error) {
          setError(result.error.message ?? 'Login failed')
        } else {
          onSuccess?.()
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        )
      }
    },
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your email or username and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            await form.handleSubmit()
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
              name="emailOrUsername"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Email or Username
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your email or username"
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

import { revalidateLogic, useForm } from '@tanstack/react-form'
import { MailIcon } from 'lucide-react'
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'

const forgotPasswordSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
})

type ForgotPasswordFormProps = {
  onSuccess?: () => void
  onBackToLogin?: () => void
}

export function ForgotPasswordForm({
  onSuccess,
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null)
      setSuccess(false)

      try {
        const result = await authClient.forgetPassword({
          email: value.email,
          redirectTo: '/reset-password',
        })

        if (result.error) {
          setError(result.error.message ?? 'Failed to send reset email')
        } else {
          setSuccess(true)
          setTimeout(() => {
            onSuccess?.()
          }, 2000)
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

  if (success) {
    return (
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <MailIcon className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to your email address.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBackToLogin}
            >
              Back to login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              await form.handleSubmit()
            }}
            id="forgot-password-form"
          >
            {error && (
              <Alert variant="destructive" className="mb-4">
                <MailIcon />
                <AlertTitle>Reset Failed</AlertTitle>
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
                        name={field.name}
                        type="email"
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
                  form="forgot-password-form"
                >
                  {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
                </Button>
              )}
            </form.Subscribe>
            {onBackToLogin && (
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={onBackToLogin}
              >
                Back to login
              </Button>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

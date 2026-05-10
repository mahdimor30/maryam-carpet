import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/otp-check')({
  component: OtpCheckPage,
  validateSearch: z.object({
    phone_number: z.string(),
  }),
})

import { useState, useRef, useEffect, useCallback } from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, RefreshCw } from 'lucide-react'
import z from 'zod'
import { verifyOtpAction } from '#/feature/auth/serverFn/verfy-otp'

function OtpCheckPage() {
  const router = useRouter()
  const search = Route.useSearch()
  const phoneNumber = search.phone_number
  const [countdown, setCountdown] = useState(120)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const form = useForm({
    defaultValues: {
      otp: ['', '', '', '', ''] as string[],
    },
    onSubmit: async ({ value }) => {
      const code = value.otp.join('')
      try {
        const user = await verifyOtpAction({
          data: {
            code,
            phone: phoneNumber,
          },
        })

        console.log(user)
      } catch (error) {
        console.log(error)
      }

      // if (code.length === 5) {
      //   // Clear phone from storage and redirect to home/dashboard
      //   sessionStorage.removeItem('auth_phone')
      //   router.navigate({ to: '/' })
      // }
    },
  })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const formatPhoneDisplay = (phone: string) => {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleResend = async () => {
    setCanResend(false)
    setCountdown(120)
    form.setFieldValue('otp', ['', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  const handleAutoSubmit = useCallback(() => {
    const otpValue = form.getFieldValue('otp')
    if (
      otpValue.every((digit: string) => digit !== '') &&
      otpValue.join('').length === 5
    ) {
      form.handleSubmit()
    }
  }, [form])

  const handleBack = () => {
    router.navigate({ to: '/login' })
  }

  // Don't render until we have the phone number
  // if (!phoneNumber) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-8">
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">فرش نگار</h1>
        <p className="text-muted-foreground mt-1">فروشگاه آنلاین فرش ایرانی</p>
      </div>

      <Button
        variant="ghost"
        onClick={handleBack}
        className="gap-2 -mr-2 text-muted-foreground hover:text-foreground"
        type="button"
      >
        <ArrowRight className="h-4 w-4" />
        بازگشت
      </Button>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          تأیید شماره موبایل
        </h2>
        <p className="text-muted-foreground">
          کد ۵ رقمی ارسال شده به شماره{' '}
          <span className="text-foreground font-medium" dir="ltr">
            {formatPhoneDisplay(phoneNumber)}
          </span>{' '}
          را وارد کنید
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.Field
          name="otp"
          validators={{
            onSubmit: ({ value }) => {
              const code = value.join('')
              if (code.length !== 5) return 'لطفاً کد ۵ رقمی را کامل وارد کنید'
              return undefined
            },
          }}
        >
          {(field) => (
            <div className="space-y-4">
              <div className="flex gap-3 justify-center" dir="ltr">
                {field.state.value.map((digit: string, index: number) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const value = e.target.value
                      if (!/^\d*$/.test(value)) return

                      const newOtp = [...field.state.value]
                      newOtp[index] = value.slice(-1)
                      field.handleChange(newOtp)

                      if (value && index < 4) {
                        inputRefs.current[index + 1]?.focus()
                      }

                      setTimeout(handleAutoSubmit, 0)
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Backspace' &&
                        !field.state.value[index] &&
                        index > 0
                      ) {
                        inputRefs.current[index - 1]?.focus()
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault()
                      const pastedData = e.clipboardData
                        .getData('text')
                        .replace(/\D/g, '')
                        .slice(0, 5)
                      const newOtp = [...field.state.value]
                      pastedData.split('').forEach((char, i) => {
                        if (i < 5) newOtp[i] = char
                      })
                      field.handleChange(newOtp)

                      const focusIndex = Math.min(pastedData.length, 4)
                      inputRefs.current[focusIndex]?.focus()

                      setTimeout(handleAutoSubmit, 0)
                    }}
                    className="w-14 h-14 text-center text-2xl font-bold"
                    aria-label={`رقم ${index + 1}`}
                  />
                ))}
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive text-sm text-center">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            otpLength: state.values.otp.join('').length,
          })}
        >
          {({ isSubmitting, otpLength }) => (
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={isSubmitting || otpLength !== 5}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>در حال بررسی...</span>
                </div>
              ) : (
                'تأیید و ورود'
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="text-center">
        {canResend ? (
          <Button
            variant="ghost"
            onClick={handleResend}
            className="gap-2 text-primary"
            type="button"
          >
            <RefreshCw className="h-4 w-4" />
            ارسال مجدد کد
          </Button>
        ) : (
          <p className="text-muted-foreground text-sm">
            ارسال مجدد کد تا{' '}
            <span className="text-foreground font-medium">
              {formatTime(countdown)}
            </span>{' '}
            دیگر
          </p>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">راهنما:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>کد تأیید به صورت پیامک ارسال شده است</li>
          <li>در صورت عدم دریافت، پوشه اسپم را بررسی کنید</li>
          <li>برای تست، هر کد ۵ رقمی قبول می‌شود</li>
        </ul>
      </div>
    </div>
  )
}

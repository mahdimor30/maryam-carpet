import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: GetPhonePage,
})

import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Phone, ArrowLeft } from 'lucide-react'
import { sendOtpAction } from '#/feature/auth/serverFn/send-otp'

const validatePhone = (phone: string) => {
  const iranPhoneRegex = /^09[0-9]{9}$/
  return iranPhoneRegex.test(phone)
}

const formatPhoneDisplay = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length <= 4) return cleaned
  if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`
}

function GetPhonePage() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      phoneNumber: '',
    },
    onSubmit: async ({ value }) => {
      await sendOtpAction({
        data: {
          phone: value.phoneNumber,
        },
      })
      // Store phone in sessionStorage and navigate to OTP page
      router.navigate({
        to: '/otp-check',
        search: {
          phone_number: value.phoneNumber,
        },
      })
    },
  })

  return (
    <div className="space-y-8">
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">فرش نگار</h1>
        <p className="text-muted-foreground mt-1">فروشگاه آنلاین فرش ایرانی</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          ورود به حساب کاربری
        </h2>
        <p className="text-muted-foreground">
          برای ورود، شماره موبایل خود را وارد کنید
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
          name="phoneNumber"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'شماره موبایل الزامی است'
              if (value.length < 11) return undefined
              if (!validatePhone(value))
                return 'لطفاً شماره موبایل معتبر وارد کنید'
              return undefined
            },
            onSubmit: ({ value }) => {
              if (!validatePhone(value))
                return 'لطفاً شماره موبایل معتبر وارد کنید'
              return undefined
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                شماره موبایل
              </Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  name={field.name}
                  type="tel"
                  inputMode="numeric"
                  placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                  value={formatPhoneDisplay(field.state.value)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 11)
                    field.handleChange(value)
                  }}
                  onBlur={field.handleBlur}
                  className="pr-11 text-right h-12 text-lg"
                  dir="ltr"
                  style={{ direction: 'ltr', textAlign: 'right' }}
                />
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-destructive text-sm">
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
            phoneLength: state.values.phoneNumber.length,
          })}
        >
          {({ canSubmit, isSubmitting, phoneLength }) => (
            <Button
              type="submit"
              className="w-full h-12 text-base gap-2"
              disabled={!canSubmit || isSubmitting || phoneLength < 11}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>در حال ارسال...</span>
                </div>
              ) : (
                <>
                  <span>دریافت کد تأیید</span>
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">یا</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full h-12 text-base"
        type="button"
        onClick={() => router.navigate({ to: '/' })}
      >
        مشاهده محصولات بدون ورود
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        با ورود به سایت،
        <a href="/terms" className="text-primary hover:underline mx-1">
          شرایط استفاده
        </a>
        و
        <a href="/privacy" className="text-primary hover:underline mx-1">
          حریم خصوصی
        </a>
        را می‌پذیرید.
      </p>
    </div>
  )
}

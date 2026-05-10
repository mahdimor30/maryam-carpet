
import { useState } from "react"
import { LoginForm } from "./login-form"
import { OtpVerification } from "./otp-verfication"


export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone)
    setStep("otp")
  }

  const handleBackToPhone = () => {
    setStep("phone")
  }

  return (
    <main className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/carpet-pattern.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <h1 className="text-3xl font-bold">فرش نگار</h1>
            <p className="text-primary-foreground/80 mt-2">فروشگاه آنلاین فرش ایرانی</p>
          </div>
          
          <div className="space-y-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-balance">
                زیبایی هنر ایرانی را به خانه خود ببرید
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed">
                با مجموعه‌ای از بهترین فرش‌های دستباف و ماشینی ایرانی آشنا شوید
              </p>
            </div>
            
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">۱۰۰۰+</div>
                <div className="text-sm text-primary-foreground/60">محصول</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">۵۰۰۰+</div>
                <div className="text-sm text-primary-foreground/60">مشتری راضی</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">۱۵+</div>
                <div className="text-sm text-primary-foreground/60">سال تجربه</div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-primary-foreground/50">
            تمامی حقوق محفوظ است © فرش نگار ۱۴۰۵
          </div>
        </div>
        
        {/* Decorative carpet illustration */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-8 border-primary-foreground/10" />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-4 border-primary-foreground/5" />
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {step === "phone" ? (
            <LoginForm onSubmit={handlePhoneSubmit} />
          ) : (
            <></>
            // <OtpVerification 
            //   phoneNumber={phoneNumber} 
            //   onBack={handleBackToPhone}
            //   onVerify={() => {
            //     // Handle successful verification
            //     console.log("[v0] OTP verified successfully")
            //   }}
            // />
          )}
        </div>
      </div>
    </main>
  )
}

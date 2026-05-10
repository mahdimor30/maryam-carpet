import { otpCodesTable } from '@/db/schema/otp-codes'

import { generateOtp } from '../utils/generate-otp'
import { sendOtpSchema } from '../validation/auth.validation'
import { db } from '#/db'
import type z from 'zod'

type Input = z.infer<typeof sendOtpSchema>

export async function sendOtp(input: Input) {
  const validated = sendOtpSchema.parse(input)

  const code = generateOtp()

  const expiresAt = new Date(Date.now() + 1000 * 60 * 2)

  await db.insert(otpCodesTable).values({
    phone: validated.phone,
    code,
    expiresAt,
  })

  // TODO:
  // send sms provider

  console.log('OTP:', code)

  return {
    success: true,
  }
}

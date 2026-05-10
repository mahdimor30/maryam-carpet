import { createServerFn } from '@tanstack/react-start'

import { verifyOtp } from '../services/verify-otp'

import { createAccessCookie, createRefreshCookie } from '../utils/cookies'
import { verifyOtpSchema } from '../validation/auth.validation'

export const verifyOtpAction = createServerFn({
  method: 'POST',
})
  .inputValidator(verifyOtpSchema)
  .handler(async ({ data }) => {
    try {
      const result = await verifyOtp(data)

      return new Response(
        JSON.stringify({
          user: result.user,
        }),
        {
          headers: {
            'Set-Cookie': [
              createAccessCookie(result.accessToken),

              createRefreshCookie(result.refreshToken),
            ].join(', '),
          },
        },
      )
    } catch (error) {
      console.log(error,'error');
      
      return Response.json(
        {
          messge: 'Error',
        },
        {
          status: 401,
        },
      )
    }
  })

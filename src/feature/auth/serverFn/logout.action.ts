import { createServerFn } from '@tanstack/react-start'

import { logout } from '../services/logout'

import { serialize } from 'cookie'

import { getRefreshToken } from '../utils/get-refresh-token'
import { getRequest } from '@tanstack/react-start/server'

export const logoutAction = createServerFn({
  method: 'POST',
}).handler(async ({}) => {
  const request = getRequest()
  const cookie = request.headers.get('cookie')

  const refreshToken = getRefreshToken(cookie || undefined)

  if (refreshToken) {
    await logout(refreshToken)
  }

  return new Response(null, {
    headers: {
      'Set-Cookie': [
        serialize('access_token', '', {
          path: '/',
          expires: new Date(0),
        }),

        serialize('refresh_token', '', {
          path: '/',
          expires: new Date(0),
        }),
      ].join(', '),
    },
  })
})

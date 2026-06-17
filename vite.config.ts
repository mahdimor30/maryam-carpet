import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  preview: {
    host: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({
      
      preset: 'cloudflare-module',
      rollupConfig: { external: [/^@sentry\//] },
    }),
    tailwindcss(),
    tanstackStart({
      pages: [
        {
          path: '/login',
          prerender: {
            enabled: true,
            crawlLinks: false,
          },
        },
      ],
    }),
    viteReact(),
  ],
})

export default config

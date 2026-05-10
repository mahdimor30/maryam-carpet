import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

console.log('DB URL:', process.env.DATABASE_URL)

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
})

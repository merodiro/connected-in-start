import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from './schema'
import { env } from '@/env.ts'

config()

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, { schema })

import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import { NextRequest, NextResponse } from 'next/server'
import { Logger } from 'pino'
import { pgDrizzleAdapter } from './auth.adapter'
import { db } from './db'
import { getEnv } from './env'
import { getCorrelationId, getLogger } from './logger'

const env = getEnv()

export const getAuthOptions = (logger: Logger) => {
  const options: AuthOptions = {
    adapter: pgDrizzleAdapter(db()) as Adapter,
    providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    logger: {
      debug: logger.debug.bind(logger),
      error: logger.error.bind(logger),
      fatal: logger.fatal.bind(logger),
      info: logger.info.bind(logger),
      warn: logger.warn.bind(logger),
    },
  }
  return options
}

const handler = async (req: NextRequest, res: NextResponse) => {
  const correlationId = getCorrelationId(req.headers)
  const authOptions = getAuthOptions(getLogger().child({ correlationId }))
  const nextAuthHandler = NextAuth(authOptions)
  return nextAuthHandler(req, res)
}

export { handler as GET, handler as POST }

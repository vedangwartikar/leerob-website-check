import pinoLogger, { Logger as LoggerType } from 'pino'
const X_CORRELATION_ID = 'x-correlation-id'
let logger: LoggerType
const getLogger = () => {
  const deploymentEnv = process.env.DEPLOYMENT_ENV
  if (!logger) {
    logger = pinoLogger({
      level: deploymentEnv === 'local' ? 'debug' : 'info',
    })
  }
  return logger
}

export const generateCorrelationId = () => {
  return crypto.randomUUID()
}

import { createServer } from 'http'
import next from 'next'
import * as path from 'path'
import { parse } from 'url'

// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => process.exit(0))
  process.on('SIGINT', () => process.exit(0))
}

// Next.js server options:
// - The environment variable is set by `@nx/next:server` when running the dev server.
// - The fallback `__dirname` is for production builds.
const dir = process.env.NX_NEXT_DIR || path.join(__dirname)
const dev = process.env.NODE_ENV === 'development'

// HTTP Server options:
const hostname = '0.0.0.0'
const port = 3000

const keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT ?? '', 10)

const requestLogger = getLogger()

async function main() {
  const nextApp = next({ dev, dir, hostname, port })
  const handle = nextApp.getRequestHandler()

  await nextApp.prepare()

  const server = createServer((req, res) => {
    req.headers[X_CORRELATION_ID] = crypto.randomUUID()
    requestLogger.info({
      url: req.url,
      method: req.method,
      correlationId: req.headers[X_CORRELATION_ID],
      msg: 'inbound request',
    })
    const parsedUrl = parse(req.url ?? '', true)
    handle(req, res, parsedUrl)
  })

  if (!Number.isNaN(keepAliveTimeout) && Number.isFinite(keepAliveTimeout) && keepAliveTimeout >= 0) {
    console.log('setting keepAliveTimeout', {
      keepAliveTimeout: `${keepAliveTimeout}ms`,
    })
    server.keepAliveTimeout = keepAliveTimeout
  }

  server.listen(port, hostname)

  requestLogger.info({
    msg: 'next server ready',
    url: `http://${hostname}:${port}`,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

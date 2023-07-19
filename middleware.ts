import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const flyIp = request.headers.get('fly-client-ip')
}

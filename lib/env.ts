import { z } from 'zod'
const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
})

let fetchedEnvs: z.infer<typeof envSchema> | null = null

export const getEnv = () => {
  if (!fetchedEnvs) {
    const { DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env
    const envs = {
      DATABASE_URL,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
    }
    const result = envSchema.safeParse(envs)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    fetchedEnvs = result.data
    return result.data
  }
  return fetchedEnvs
}

import type { Adapter } from '@auth/core/adapters'
import { and, eq } from 'drizzle-orm'
import type { DbClient } from './db'
import { accounts, auth_users, sessions, verificationTokens } from './schema'

export const defaultSchema = { auth_users, accounts, sessions, verificationTokens }
export type DefaultSchema = typeof defaultSchema
export function pgDrizzleAdapter(client: DbClient): Adapter {
  return {
    createUser: async (data) => {
      return client
        .insert(auth_users)
        .values({ ...data })
        .returning({
          id: auth_users.id,
          name: auth_users.name,
          email: auth_users.email,
          emailVerified: auth_users.emailVerified,
        })
        .then((res) => res[0])
    },
    getUser: async (data) => {
      return (
        client
          .select()
          .from(auth_users)
          .where(eq(auth_users.id, data))
          .then((res) => res[0]) ?? null
      )
    },
    getUserByEmail: async (data) => {
      return (
        client
          .select()
          .from(auth_users)
          .where(eq(auth_users.email, data))
          .then((res) => res[0]) ?? null
      )
    },
    createSession: async (data) => {
      return client
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0])
    },
    getSessionAndUser: async (sessionToken) => {
      return (
        client
          .select({
            session: sessions,
            user: auth_users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .innerJoin(auth_users, eq(auth_users.id, sessions.userId))
          .then((res) => res[0]) ?? null
      )
    },
    updateUser: async (data) => {
      if (!data.id) {
        throw new Error('No user id.')
      }

      return client
        .update(auth_users)
        .set(data)
        .where(eq(auth_users.id, data.id))
        .returning()
        .then((res) => res[0])
    },
    updateSession: async (data) => {
      return client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0])
    },
    linkAccount: async (rawAccount) => {
      const updatedAccount = await client
        .insert(accounts)
        .values(rawAccount)
        .returning()
        .then((res) => res[0])

      // Drizzle will return `null` for fields that are not defined.
      // However, the return type is expecting `undefined`.
      const account = {
        ...updatedAccount,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined,
      }

      return account
    },
    getUserByAccount: async (account) => {
      const results = await client
        .select()
        .from(accounts)
        .leftJoin(auth_users, eq(auth_users.id, accounts.userId))
        .where(and(eq(accounts.provider, account.provider), eq(accounts.providerAccountId, account.providerAccountId)))
        .execute()
      if (results.length === 0) {
        return null
      }
      return results[0].auth_users ?? null
    },
    deleteSession: async (sessionToken) => {
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null)

      return session
    },
    createVerificationToken: async (token) => {
      return client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0])
    },
    useVerificationToken: async (token) => {
      try {
        return (
          client
            .delete(verificationTokens)
            .where(and(eq(verificationTokens.identifier, token.identifier), eq(verificationTokens.token, token.token)))
            .returning()
            .then((res) => res[0]) ?? null
        )
      } catch (err) {
        throw new Error('No verification token found.')
      }
    },
    deleteUser: async (id) => {
      await client
        .delete(auth_users)
        .where(eq(auth_users.id, id))
        .returning()
        .then((res) => res[0] ?? null)
    },
    unlinkAccount: async (account) => {
      const { type, provider, providerAccountId, userId } = await client
        .delete(accounts)
        .where(and(eq(accounts.providerAccountId, account.providerAccountId), eq(accounts.provider, account.provider)))
        .returning()
        .then((res) => res[0] ?? null)

      return { provider, type, providerAccountId, userId }
    },
  }
}

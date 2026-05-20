import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

import authConfig from "@/auth.config";
import { prisma } from "@/lib/db/prisma";
import { logSecurityEvent } from "@/lib/security/logger";
import {
  isLockedOut,
  recordFailedAttempt,
  resetLockout,
} from "@/lib/security/account-lockout";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = (credentials.email as string).toLowerCase().trim();

        // ── Account lockout check ─────────────────────────────────────
        const lockoutRemaining = isLockedOut(email);
        if (lockoutRemaining !== null) {
          logSecurityEvent({
            type: "AUTH_LOCKOUT",
            message: `Login attempt on locked account`,
            metadata: { email, remainingSeconds: lockoutRemaining },
          });
          // Return null — don't reveal lockout details to the client
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) {
          // Record failed attempt even for non-existent users
          // to prevent user enumeration via timing attacks
          recordFailedAttempt(email);

          logSecurityEvent({
            type: "AUTH_FAILURE",
            message: "Login failed — user not found or no password set",
            metadata: { email },
          });
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          const result = recordFailedAttempt(email);

          logSecurityEvent({
            type: "AUTH_FAILURE",
            message: "Login failed — invalid password",
            metadata: {
              email,
              attempts: result.attempts,
              locked: result.locked,
            },
          });
          return null;
        }

        // ── Successful login — reset lockout counter ─────────────────
        resetLockout(email);

        logSecurityEvent({
          type: "AUTH_SUCCESS",
          message: "Login successful",
          metadata: { email, userId: user.id },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
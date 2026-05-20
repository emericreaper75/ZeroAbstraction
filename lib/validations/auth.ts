import { z } from "zod";

/**
 * Password strength validation schema.
 *
 * Enforces:
 * - Minimum 10 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 *
 * Never log the password value — only validation results.
 */
export const passwordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters")
  .max(128, "Password must be under 128 characters")
  .refine(
    (val: string) => /[A-Z]/.test(val),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (val: string) => /[a-z]/.test(val),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (val: string) => /[0-9]/.test(val),
    "Password must contain at least one digit"
  )
  .refine(
    (val: string) => /[^A-Za-z0-9]/.test(val),
    "Password must contain at least one special character"
  );

/**
 * Login credentials schema for server-side validation.
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").max(254, "Email too long"),
  password: z.string().min(1, "Password is required").max(128, "Password too long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;

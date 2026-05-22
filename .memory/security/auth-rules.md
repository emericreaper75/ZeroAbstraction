# Auth Rules

* Admin access requires session validation.
* Apply rate limiting (Redis) to authentication endpoints to prevent brute-force attacks.
* Lock out accounts after 5 consecutive failed attempts.
* Use secure HTTP-only cookies for session tokens.
* Enforce strong password complexity policies.
* Ensure comprehensive HTTP security headers are set.

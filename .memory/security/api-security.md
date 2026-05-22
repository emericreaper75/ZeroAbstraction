# API Security

* All API routes must validate incoming payloads.
* Admin API routes must check for an active admin session.
* Do not expose internal server errors or database structures in API responses.
* Set security headers (HSTS, X-Frame-Options, X-Content-Type-Options) in `next.config.js` or via middleware.

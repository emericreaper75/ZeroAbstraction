# Prisma Rules

* Generate client after every schema change.
* Catch Prisma exceptions properly (e.g., `Prisma.PrismaClientKnownRequestError`).
* Avoid N+1 query problems by using `include` correctly.
* Do not expose the Prisma client instance directly to client components.
* Use a singleton Prisma client instance in development to prevent connection exhaustion.

# Admin Architecture Rules

* All admin routes must be under `/app/admin/`.
* Admin UI is a premium, high-fidelity design migrating away from basic skeletons. Includes Media Manager, Messages, and Communications.
* Must ensure complete parity and stability for the public frontend during any admin backend modifications.
* Secure execution context: Admin routes must check for an active and valid admin session before rendering layout or running Server Actions.

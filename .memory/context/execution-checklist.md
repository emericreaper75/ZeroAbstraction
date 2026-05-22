# Execution Checklist

## Pre-Execution Workflow
1. Read relevant `.ai/` memory files (Index -> Architecture/Decisions/Rules/State).
2. Review related `.json` errors to avoid repeating mistakes.
3. Review pending roadmap and blockers.
4. Review current project state.

## Execution Constraints
* Only use App Router (`app/`).
* Maintain High-Fidelity UI and strict design tokens.
* Track errors and fixes actively during implementation.
* Isolate components properly (Client vs Server).

## Post-Execution Workflow
1. Update ONLY affected memory files.
2. Append new issues to error JSON files.
3. Record new learning in `.ai/sessions/YYYY-MM-DD-session.md`.
4. Preserve previous knowledge without generating large summary rewrites.
5. Generate an implementation report if required.

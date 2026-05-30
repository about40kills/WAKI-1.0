# Decision: No Authentication in WAKI

**Date:** 2026-05-25  
**Status:** Decided ✅

## Decision

WAKI does not require user login or account creation.

## Why No-Auth Wins Here

**Zero-friction access is critical for mental health.** An app that asks for a password when someone is in distress loses them. The moment of need cannot have a login gate.

**No account = no breach surface.** If there's no server storing who said what, there's nothing to leak. This is a meaningful security property, not just a convenience.

**Ghana context matters.** Many users may share devices or use prepaid SIMs with no persistent email. Account systems assume infrastructure that isn't always there.

**Consistent with the consent model.** Data stays on the device, which is what the user agreed to at onboarding. Adding a server-side account would require a privacy policy update and undermine that promise.

## When You'd Reconsider

Only add auth if a concrete user need forces one of these:

- User wants to **restore history on a new phone** → needs cloud backup → needs auth
- You add a **web dashboard or therapist-facing view** → needs identity
- You want **server-side personalised push notifications** → needs a user record

None of these are in scope for WAKI's current design.

## What Adding Auth Would Cost (For Nothing Right Now)

- Backend infrastructure
- Privacy policy update
- Increased onboarding friction
- New attack surface

## Short Answer

The no-auth design is correct as-is. Don't add auth unless a concrete user need forces it.

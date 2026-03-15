# Security Model

This public repository documents the security direction only at a high level.

## Security Goals

- reduce unauthorized API usage while a temporary public endpoint is active
- limit exposure of operational metadata and sensitive request payloads
- prevent accidental use from copied or unauthorized spreadsheet contexts
- keep sensitive runtime details out of the public repository

## Security Direction

The system is designed around a few practical rules:
- internal operational routes should only be callable from the local desktop app
- public processing requests should be tied to a valid sheet and working session
- working sessions should be time-bounded
- canceling the public link or shutting down the desktop app should invalidate active access
- temporary files and logs should be kept minimal and cleaned regularly

## What Is Not Published Here

This repository intentionally excludes:
- implementation-level authentication details
- deployment configuration and internal operational wiring
- secrets, tokens, webhook values, and production identifiers
- complete scripting or runtime internals

## Practical Note

No internet-exposed workflow can guarantee absolute secrecy. The goal is to reduce risk, narrow the valid execution path, and keep sensitive implementation details out of the public surface.
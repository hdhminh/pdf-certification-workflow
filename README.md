# PDF Certification Workflow

A public-facing showcase of the `pdf-merge-service` project.

This repository is intentionally limited to product-level documentation. It describes the workflow, system boundaries, and security direction without publishing the private implementation, deployment pipeline, or runtime assets.

## Overview

`pdf-merge-service` was designed for a certification workflow where teams need to process scan-heavy document sets, generate certified PDF copies, and prepare files for digital signing in a controlled operational flow.

The project combines:
- a Windows desktop control app
- a local PDF processing backend
- Google Sheets and Apps Script for operator intake
- temporary public exposure for controlled processing requests

## What The Product Supports

- certification copy generation from scanned original documents
- placement of certification text on the final output page
- preparation of digital signature fields for organization and personal signing
- spreadsheet-based intake and operator workflow
- temporary and controlled public access for processing requests

## Why This Public Repository Exists

This repository exists to:
- present the project in a public-safe format
- document the workflow and architectural intent
- describe the security direction at a high level
- establish ownership and usage restrictions

This repository does **not** include:
- backend source code
- desktop application source code
- internal automation or release pipeline details
- production configuration, webhook values, sessions, or secrets
- customer data or real document payloads

## Documentation

The public documentation set is available in `docs/`:
- [Project Overview](docs/overview.md)
- [Architecture](docs/architecture.md)
- [Security Model](docs/security.md)
- [Public Scope](docs/public-scope.md)
- [Publishing Guide](docs/publish.md)

## Ownership And Usage

- See [LICENSE](LICENSE)
- See [NOTICE](NOTICE)

All rights, ownership, redistribution, commercial use, and derivative usage remain governed by the repository license and notice documents.
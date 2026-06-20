# PDF Certification Workflow

Public blueprint and sample-code surface for a PDF certification and web-signing workflow.

Focus areas:

- desktop-controlled certification and signing orchestration
- local document processing and signing coordination
- Google Apps Script-driven intake and workflow updates
- browser-based signing and export flow

This is a public-safe repository. It contains documentation, sample contracts, and illustrative code, but excludes private implementation, runtime assets, secrets, and production integrations.

## Repository Map

- [`examples/code/`](examples/code/README.md): public-safe code samples
- [`src-public/`](src-public/README.md): public-safe reference skeleton in TypeScript
- [`examples/contracts/`](examples/contracts/certification-job.example.json): sanitized payload shapes
- [`docs/overview.md`](docs/overview.md): product intent and workflow context
- [`docs/workflow.md`](docs/workflow.md): operator flow from intake to signed output
- [`docs/architecture.md`](docs/architecture.md): system boundaries and component roles
- [`docs/security.md`](docs/security.md): trust model and exposure controls
- [`docs/public-scope.md`](docs/public-scope.md): what may and may not be published
- [`docs/repository-structure.md`](docs/repository-structure.md): recommended public blueprint layout
- [`docs/release-surface.md`](docs/release-surface.md): what a public release surface may contain
- [`docs/faq.md`](docs/faq.md): short answers for reviewers and stakeholders
- [`reference/`](reference/README.md): glossary and publishing notes
- [`templates/`](templates/README.md): reusable structure patterns for similar public repos

## Included Capabilities

- certification copy generation for document-heavy operations
- placement of certification content in a standardized output area
- preparation of one or more digital-signature targets
- browser-based signing for prepared documents
- operator-controlled signing sessions with local desktop assistance
- support for single-signature or multi-signature completion
- queue-based intake and output tracking
- controlled return of processed files into the business workflow
- distinct operator flows for certification-copy work and signing work

## Code Samples

The code samples in [`examples/code/`](examples/code/README.md) illustrate:

- how an intake layer can prepare a processing request
- how queue rows can be mapped into workflow jobs
- how browser-side orchestration can manage signing and export
- how a browser signing page can coordinate with a local signing bridge
- how workflow state and session rules can be represented in code

For a larger code-oriented public reference, see [`src-public/`](src-public/README.md).

See [`docs/workflow.md`](docs/workflow.md) for the end-to-end public flow.

## Ownership And Usage

- See [`LICENSE`](LICENSE)
- See [`NOTICE`](NOTICE)
- See [`SECURITY.md`](SECURITY.md)

All rights, ownership, redistribution, and derivative usage remain governed by the repository license and notice documents.

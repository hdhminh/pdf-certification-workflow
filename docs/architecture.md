# Architecture

## System Boundary

This repository describes the system at the role and boundary level only.

The workflow is split into the following public-safe components:

### 1. Operator Console

The operator console is the human control surface for the workflow.

Responsibilities:

- start or stop an active work session
- expose a temporary processing route only when needed
- monitor local runtime state
- coordinate access to the signing step
- provide the local control boundary for certificate-based signing

### 2. Local Processing Runtime

The local processing runtime handles document transformation.

Responsibilities:

- accept a document-processing job
- validate job metadata
- apply certification content and placement rules
- prepare the document for downstream signing
- return the processed output

### 3. Local Signing Bridge

The local signing bridge supports browser-based signing without moving private signing operations into a fully public service.

Responsibilities:

- expose a local-only signing interface to the browser signing surface
- coordinate certificate-based signing actions under operator control
- limit the signing path to the active local session
- keep signing execution tied to the operator workstation

### 4. Intake Workspace

The intake workspace is the business-facing queue or operator sheet.

Responsibilities:

- collect job metadata
- track job state
- trigger processing requests
- store output links or returned artifacts

### 5. Signing Workspace

The signing workspace is the browser-facing environment where prepared documents can be signed in a controlled manner.

Responsibilities:

- load prepared documents
- allow signature placement or use pre-detected signature targets
- perform final signing actions
- export or return the signed result

## High-Level Sequence

1. The operator opens a controlled session.
2. The system enables a temporary route for intake requests.
3. The intake workspace submits a document job.
4. The local runtime generates the certified PDF result.
5. The result enters the signing workspace when a signature is required.
6. The operator signs the required target or targets through the local signing bridge.
7. The final artifact is exported back into the workflow record.

## Architecture Principles

- operator control should remain explicit
- document processing should stay local to the controlled workstation
- signing execution should remain tied to the controlled workstation even when the signing UI is browser-based
- public exposure should be temporary and session-bound
- business metadata and runtime secrets should remain separated
- the public repository should describe boundaries, not private mechanics

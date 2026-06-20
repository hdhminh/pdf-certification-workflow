# Workflow

## End-To-End Operator Flow

### Stage 1: Session Start

The operator opens a controlled work session from a local console.

At this point, the system may enable a temporary route for active job intake. The route exists only to support the current session and should not be treated as a permanent public API.

### Stage 2: Intake Submission

An intake workspace submits:

- a source document
- certification metadata
- routing context needed for the workflow record

The public repository does not publish the real operational sheet layout or the private automation behind this stage.

### Stage 3: Certification Processing

The local runtime processes the incoming document job.

Typical output responsibilities:

- normalize the source PDF into a certification-ready output
- place certification text or marks
- prepare the output for downstream signing
- generate one or more signing targets when the workflow requires signatures

### Stage 4: Signing Preparation

If the workflow requires digital signing, the processed document moves to a signing workspace served through the browser.

The operator can:

- use prepared signature targets
- sign one required signature only
- sign multiple required signatures in sequence

The browser signing step is not intended to be fully standalone. It remains connected to a local operator-controlled signing path.

### Stage 5: Final Export

After signing is complete, the final file is exported.

Depending on the workflow mode, the result may:

- be saved locally
- be attached back to a queue record
- be returned to the intake workspace as the final output artifact

## Two Practical Workflow Modes

### Mode A: Certification Copy Flow

This flow focuses on producing a certified PDF copy and returning it to the operational record.

### Mode B: Signing Flow

This flow focuses on opening a prepared PDF in a signing workspace, completing one or more required signatures, and returning the signed output.

## Workflow Design Principles

- session control should stay with the operator
- document processing should not become an always-open public service
- the signing step should remain explicit, browser-driven, and user-controlled
- output return should be traceable but not overexposed

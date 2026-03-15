# Architecture

## High-Level Flow

1. An operator activates a temporary working link from the desktop application.
2. The desktop application starts the local backend and manages the public tunnel.
3. The active sheet endpoint is updated through an Apps Script webhook.
4. Operators submit source PDFs from the Google Sheet workflow.
5. Apps Script sends processing requests to the PDF backend.
6. The backend stamps the PDF and prepares digital signature fields.
7. The processed PDF is returned to the document handling flow.

## Main Components

### Desktop Application

The desktop application acts as the operational control point. It is responsible for:
- managing the active working link
- starting and stopping the backend
- updating the sheet endpoint
- monitoring tunnel and backend state

### PDF Backend Service

The backend service is responsible for:
- receiving PDF payloads
- validating request inputs
- applying certification text and overlays
- preparing digital signature fields
- returning processed PDFs

### Google Sheets And Apps Script

The spreadsheet layer is responsible for:
- intake and operator interaction
- collecting certification metadata
- triggering processing requests
- writing output links back into the working sheet

## Design Principles

- the desktop app remains the operator control surface
- the PDF backend runs locally
- public exposure is temporary and scoped to active usage
- sensitive operational values should not live in normal spreadsheet cells
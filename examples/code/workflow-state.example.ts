/**
 * Public-safe example: workflow state model.
 *
 * These interfaces describe the shape of a queue-based certification and
 * signing workflow without exposing internal implementation details.
 */

export type WorkflowMode = 'certification-copy' | 'signing';
export type JobStatus =
  | 'queued'
  | 'processing'
  | 'prepared'
  | 'signing'
  | 'completed'
  | 'failed';

export interface CertificationJob {
  jobId: string;
  mode: WorkflowMode;
  sourceDocumentRef: string;
  signingRequired: boolean;
  queueRowRef: string;
}

export interface SigningTarget {
  name: string;
  required: boolean;
  completed: boolean;
}

export interface SigningSession {
  sessionId: string;
  documentRef: string;
  targets: SigningTarget[];
  desktopAssisted: boolean;
  surface: 'web-signing';
}

export interface WorkflowRecord {
  jobId: string;
  status: JobStatus;
  resultArtifactRef?: string;
  session?: SigningSession;
}

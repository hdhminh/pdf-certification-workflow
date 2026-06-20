export type WorkflowMode = 'certification-copy' | 'signing';
export type JobStatus =
  | 'queued'
  | 'accepted'
  | 'preparing'
  | 'prepared'
  | 'signing'
  | 'exporting'
  | 'completed'
  | 'failed';

export interface CertificationMetadata {
  referenceNumber: string;
  bookNumber?: string;
  issuedDate: string;
  operatorNote?: string;
}

export interface QueueContext {
  queueRowRef: string;
  operatorRef: string;
  tenantRef?: string;
  workflowRef?: string;
}

export interface WorkflowJobInput {
  jobId: string;
  mode: WorkflowMode;
  sourceDocumentRef: string;
  certification: CertificationMetadata;
  signingRequired: boolean;
  queue: QueueContext;
}

export interface PreparedDocument {
  preparedDocumentRef: string;
  previewUrl?: string;
  signingSessionId?: string;
  detectedTargets: SigningTarget[];
}

export interface SigningTarget {
  name: string;
  required: boolean;
  label: string;
}

export interface SignedArtifact {
  artifactRef: string;
  fileName: string;
  contentType: 'application/pdf';
  createdAt: string;
}

export interface WorkflowRecord {
  jobId: string;
  status: JobStatus;
  mode: WorkflowMode;
  sourceDocumentRef: string;
  preparedDocumentRef?: string;
  signedArtifactRef?: string;
  queueRowRef: string;
  updatedAt: string;
  errors: string[];
}

export function createInitialWorkflowRecord(
  input: WorkflowJobInput,
): WorkflowRecord {
  return {
    jobId: input.jobId,
    status: 'queued',
    mode: input.mode,
    sourceDocumentRef: input.sourceDocumentRef,
    queueRowRef: input.queue.queueRowRef,
    updatedAt: new Date().toISOString(),
    errors: [],
  };
}

export function updateWorkflowStatus(
  record: WorkflowRecord,
  status: JobStatus,
): WorkflowRecord {
  return {
    ...record,
    status,
    updatedAt: new Date().toISOString(),
  };
}

export function appendWorkflowError(
  record: WorkflowRecord,
  message: string,
): WorkflowRecord {
  return {
    ...record,
    status: 'failed',
    updatedAt: new Date().toISOString(),
    errors: [...record.errors, message],
  };
}

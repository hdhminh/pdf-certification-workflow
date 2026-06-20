/**
 * Public-safe example: map a queue row into a normalized workflow job.
 */

export interface QueueRow {
  rowRef: string;
  sourceDocumentRef: string;
  operatorRef: string;
  certificationRef: string;
  requiresSigning: boolean;
}

export interface WorkflowJob {
  jobId: string;
  queueRowRef: string;
  sourceDocumentRef: string;
  operatorRef: string;
  certificationRef: string;
  mode: 'certification-copy' | 'signing';
}

export function mapQueueRowToWorkflowJob(row: QueueRow): WorkflowJob {
  return {
    jobId: 'job_' + row.rowRef,
    queueRowRef: row.rowRef,
    sourceDocumentRef: row.sourceDocumentRef,
    operatorRef: row.operatorRef,
    certificationRef: row.certificationRef,
    mode: row.requiresSigning ? 'signing' : 'certification-copy',
  };
}

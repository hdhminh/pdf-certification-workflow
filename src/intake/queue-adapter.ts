import type { WorkflowJobInput } from '../models/workflow';

export interface QueueRowSnapshot {
  rowRef: string;
  sourceDocumentRef: string;
  operatorRef: string;
  tenantRef?: string;
  referenceNumber: string;
  bookNumber?: string;
  issuedDate: string;
  requiresSigning: boolean;
}

export class QueueAdapter {
  normalizeRow(row: QueueRowSnapshot): WorkflowJobInput {
    const mode = row.requiresSigning ? 'signing' : 'certification-copy';
    return {
      jobId: `job_${row.rowRef}`,
      mode,
      sourceDocumentRef: row.sourceDocumentRef,
      signingRequired: row.requiresSigning,
      certification: {
        referenceNumber: row.referenceNumber,
        bookNumber: row.bookNumber,
        issuedDate: row.issuedDate,
      },
      queue: {
        queueRowRef: row.rowRef,
        operatorRef: row.operatorRef,
        tenantRef: row.tenantRef,
      },
    };
  }

  validateRow(row: QueueRowSnapshot): string[] {
    const errors: string[] = [];
    if (!row.rowRef.trim()) errors.push('Missing row reference.');
    if (!row.sourceDocumentRef.trim()) errors.push('Missing source document reference.');
    if (!row.operatorRef.trim()) errors.push('Missing operator reference.');
    if (!row.referenceNumber.trim()) errors.push('Missing certification reference number.');
    if (!row.issuedDate.trim()) errors.push('Missing certification date.');
    return errors;
  }

  canProcess(row: QueueRowSnapshot): boolean {
    return this.validateRow(row).length === 0;
  }
}

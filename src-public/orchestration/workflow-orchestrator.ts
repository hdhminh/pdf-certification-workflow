import {
  appendWorkflowError,
  createInitialWorkflowRecord,
  updateWorkflowStatus,
  type PreparedDocument,
  type SignedArtifact,
  type WorkflowJobInput,
  type WorkflowRecord,
} from '../models/workflow';

export interface WorkflowPorts {
  prepare(job: WorkflowJobInput): Promise<PreparedDocument>;
  sign(
    sessionId: string,
    preparedDocumentRef: string,
    targetName: string,
  ): Promise<SignedArtifact>;
  finalize(
    queueRowRef: string,
    artifactRef: string,
    sessionId?: string,
  ): Promise<void>;
}

export class WorkflowOrchestrator {
  constructor(private readonly ports: WorkflowPorts) {}

  async prepare(job: WorkflowJobInput): Promise<WorkflowRecord> {
    let record = createInitialWorkflowRecord(job);
    record = updateWorkflowStatus(record, 'accepted');

    try {
      record = updateWorkflowStatus(record, 'preparing');
      const prepared = await this.ports.prepare(job);
      record = {
        ...updateWorkflowStatus(record, 'prepared'),
        preparedDocumentRef: prepared.preparedDocumentRef,
      };
      return record;
    } catch (error) {
      return appendWorkflowError(record, toErrorMessage(error));
    }
  }

  async completeSigning(
    record: WorkflowRecord,
    sessionId: string,
    targetName: string,
  ): Promise<WorkflowRecord> {
    if (!record.preparedDocumentRef) {
      return appendWorkflowError(record, 'Missing prepared document reference.');
    }

    try {
      let next = updateWorkflowStatus(record, 'signing');
      const artifact = await this.ports.sign(
        sessionId,
        record.preparedDocumentRef,
        targetName,
      );
      next = {
        ...updateWorkflowStatus(next, 'exporting'),
        signedArtifactRef: artifact.artifactRef,
      };
      await this.ports.finalize(record.queueRowRef, artifact.artifactRef, sessionId);
      return updateWorkflowStatus(next, 'completed');
    } catch (error) {
      return appendWorkflowError(record, toErrorMessage(error));
    }
  }
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Public-safe example: workflow orchestrator.
 *
 * This module models a simplified application-layer orchestration for:
 * - queue intake
 * - document preparation
 * - signing session creation
 * - final export
 */

export interface QueueJobInput {
  jobId: string;
  sourceDocumentRef: string;
  signingRequired: boolean;
  queueRowRef: string;
}

export interface PreparedDocument {
  preparedDocumentRef: string;
  signingSessionId?: string;
}

export interface WorkflowOrchestratorDeps {
  prepareDocument(job: QueueJobInput): Promise<PreparedDocument>;
  finalizeQueueResult(jobId: string, artifactRef: string): Promise<void>;
}

export class WorkflowOrchestrator {
  constructor(private readonly deps: WorkflowOrchestratorDeps) {}

  async run(job: QueueJobInput): Promise<{
    mode: 'certification-copy' | 'signing';
    preparedDocumentRef: string;
    signingSessionId?: string;
  }> {
    const prepared = await this.deps.prepareDocument(job);

    return {
      mode: job.signingRequired ? 'signing' : 'certification-copy',
      preparedDocumentRef: prepared.preparedDocumentRef,
      signingSessionId: prepared.signingSessionId,
    };
  }

  async complete(jobId: string, artifactRef: string): Promise<void> {
    await this.deps.finalizeQueueResult(jobId, artifactRef);
  }
}

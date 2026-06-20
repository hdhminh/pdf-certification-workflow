import { WorkflowOrchestrator } from './orchestration/workflow-orchestrator';
import { WorkflowSessionStore } from './sessions/session-store';
import { QueueAdapter, type QueueRowSnapshot } from './intake/queue-adapter';

/**
 * Public-safe app skeleton.
 *
 * This file ties together the reference modules so the repository contains a
 * coherent TypeScript surface rather than isolated examples only.
 */

export class PublicWorkflowApplication {
  private readonly sessions = new WorkflowSessionStore();
  private readonly queue = new QueueAdapter();

  constructor(private readonly orchestrator: WorkflowOrchestrator) {}

  async submitQueueRow(row: QueueRowSnapshot) {
    const errors = this.queue.validateRow(row);
    if (errors.length) {
      return {
        accepted: false,
        errors,
      };
    }

    const job = this.queue.normalizeRow(row);
    const session = this.sessions.createDraft(job.mode, job.queue.queueRowRef);
    this.sessions.set(session);

    const record = await this.orchestrator.prepare(job);

    return {
      accepted: record.status !== 'failed',
      sessionId: session.sessionId,
      record,
    };
  }

  cancelSession(sessionId: string): void {
    this.sessions.cancel(sessionId);
  }

  pruneSessions(): number {
    return this.sessions.prune();
  }
}

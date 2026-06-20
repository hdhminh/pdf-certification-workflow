/**
 * Public-safe example: in-memory session store.
 *
 * This illustrates the shape of a temporary session registry for a controlled
 * certification/signing workflow. The private implementation can be more
 * complex; this file remains deliberately simple.
 */

export interface WorkflowSession {
  sessionId: string;
  queueContext: string;
  mode: 'certification-copy' | 'signing';
  createdAt: string;
  expiresAt: string;
  cancelled: boolean;
}

export class WorkflowSessionStore {
  private sessions = new Map<string, WorkflowSession>();

  upsert(session: WorkflowSession): void {
    this.sessions.set(session.sessionId, session);
  }

  get(sessionId: string): WorkflowSession | null {
    return this.sessions.get(sessionId) || null;
  }

  cancel(sessionId: string): void {
    const current = this.sessions.get(sessionId);
    if (!current) return;

    this.sessions.set(sessionId, {
      ...current,
      cancelled: true,
    });
  }

  pruneExpired(now = new Date()): number {
    let removed = 0;
    for (const [sessionId, session] of this.sessions.entries()) {
      const expiresAt = new Date(session.expiresAt);
      if (Number.isNaN(expiresAt.getTime()) || expiresAt <= now || session.cancelled) {
        this.sessions.delete(sessionId);
        removed += 1;
      }
    }
    return removed;
  }

  listActive(now = new Date()): WorkflowSession[] {
    return Array.from(this.sessions.values()).filter((session) => {
      const expiresAt = new Date(session.expiresAt);
      return !session.cancelled && !Number.isNaN(expiresAt.getTime()) && expiresAt > now;
    });
  }
}

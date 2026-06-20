export interface WorkflowSession {
  sessionId: string;
  mode: 'certification-copy' | 'signing';
  queueContext: string;
  preparedDocumentRef?: string;
  createdAt: string;
  expiresAt: string;
  cancelled: boolean;
}

export interface SessionStoreQuery {
  activeOnly?: boolean;
  mode?: 'certification-copy' | 'signing';
}

export class WorkflowSessionStore {
  private readonly items = new Map<string, WorkflowSession>();

  set(session: WorkflowSession): void {
    this.items.set(session.sessionId, session);
  }

  get(sessionId: string): WorkflowSession | null {
    return this.items.get(sessionId) || null;
  }

  has(sessionId: string): boolean {
    return this.items.has(sessionId);
  }

  cancel(sessionId: string): void {
    const existing = this.items.get(sessionId);
    if (!existing) return;
    this.items.set(sessionId, { ...existing, cancelled: true });
  }

  remove(sessionId: string): void {
    this.items.delete(sessionId);
  }

  prune(now = new Date()): number {
    let removed = 0;
    for (const [sessionId, session] of this.items.entries()) {
      const expiresAt = new Date(session.expiresAt);
      const expired =
        Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= now.getTime();
      if (expired || session.cancelled) {
        this.items.delete(sessionId);
        removed += 1;
      }
    }
    return removed;
  }

  list(query: SessionStoreQuery = {}, now = new Date()): WorkflowSession[] {
    return Array.from(this.items.values()).filter((session) => {
      if (query.mode && session.mode !== query.mode) return false;
      if (!query.activeOnly) return true;

      const expiresAt = new Date(session.expiresAt);
      return (
        !session.cancelled &&
        !Number.isNaN(expiresAt.getTime()) &&
        expiresAt.getTime() > now.getTime()
      );
    });
  }

  createDraft(
    mode: 'certification-copy' | 'signing',
    queueContext: string,
    ttlMinutes = 15,
  ): WorkflowSession {
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + ttlMinutes * 60_000);
    return {
      sessionId: `session_${createdAt.getTime()}`,
      mode,
      queueContext,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      cancelled: false,
    };
  }
}

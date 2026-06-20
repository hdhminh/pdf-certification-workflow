/**
 * Public-safe example: session guard rules for a temporary workflow route.
 */

export interface SessionGuardInput {
  sessionId: string;
  expiresAt: string;
  isCancelled: boolean;
  queueContext: string;
}

export function isSessionActive(input: SessionGuardInput, now = new Date()): boolean {
  if (input.isCancelled) return false;
  if (!input.sessionId.trim()) return false;
  if (!input.queueContext.trim()) return false;

  const expiresAt = new Date(input.expiresAt);
  if (Number.isNaN(expiresAt.getTime())) return false;

  return expiresAt.getTime() > now.getTime();
}

export interface ArtifactFinalizationRequest {
  artifactRef: string;
  queueRowRef: string;
  mode: 'certification-copy' | 'signing';
  sessionId?: string;
}

export interface ArtifactFinalizationResult {
  ok: boolean;
  destination: 'local-download' | 'workflow-record';
  message: string;
}

export class ArtifactFinalizer {
  constructor(private readonly endpoint: string) {}

  async finalize(
    request: ArtifactFinalizationRequest,
  ): Promise<ArtifactFinalizationResult> {
    const response = await fetch(this.endpoint + '/finalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      return {
        ok: false,
        destination: 'workflow-record',
        message: 'Finalization request failed.',
      };
    }

    return response.json() as Promise<ArtifactFinalizationResult>;
  }
}

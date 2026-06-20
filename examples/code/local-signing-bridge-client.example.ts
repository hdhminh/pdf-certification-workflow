/**
 * Public-safe example: client wrapper around a local signing bridge.
 *
 * The real bridge remains private. This file only demonstrates a public-safe
 * contract shape for local signing coordination.
 */

export interface LocalBridgeSignRequest {
  sessionId: string;
  documentRef: string;
  target: string;
}

export interface LocalBridgeSignResponse {
  status: 'ok' | 'error';
  artifactRef?: string;
  message?: string;
}

export class LocalSigningBridgeClient {
  constructor(private readonly baseUrl: string) {}

  async sign(request: LocalBridgeSignRequest): Promise<LocalBridgeSignResponse> {
    const response = await fetch(this.baseUrl + '/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message: 'Local signing bridge rejected the request.',
      };
    }

    return response.json() as Promise<LocalBridgeSignResponse>;
  }
}

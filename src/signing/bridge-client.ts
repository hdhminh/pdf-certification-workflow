export interface SignRequest {
  sessionId: string;
  documentRef: string;
  targetName: string;
}

export interface SignResponse {
  ok: boolean;
  artifactRef?: string;
  targetName?: string;
  message?: string;
}

export class LocalSigningBridgeClient {
  constructor(private readonly baseUrl: string) {}

  async ping(): Promise<boolean> {
    const response = await fetch(this.baseUrl + '/health');
    return response.ok;
  }

  async sign(request: SignRequest): Promise<SignResponse> {
    const response = await fetch(this.baseUrl + '/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      return {
        ok: false,
        message: 'The local signing bridge rejected the request.',
      };
    }

    return response.json() as Promise<SignResponse>;
  }
}

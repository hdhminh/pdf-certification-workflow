/**
 * Public-safe example: API client used by a browser-facing workflow surface.
 */

export interface PrepareDocumentRequest {
  jobId: string;
  sourceDocumentRef: string;
  signingRequired: boolean;
}

export interface PrepareDocumentResponse {
  preparedDocumentRef: string;
  signingSessionId?: string;
}

export class WorkflowApiClient {
  constructor(private readonly baseUrl: string) {}

  async prepareDocument(
    request: PrepareDocumentRequest,
  ): Promise<PrepareDocumentResponse> {
    const response = await fetch(this.baseUrl + '/prepare-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Prepare document request failed.');
    }

    return response.json() as Promise<PrepareDocumentResponse>;
  }
}

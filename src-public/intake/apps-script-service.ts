import type { WorkflowJobInput } from '../models/workflow';

export interface AppsScriptSubmitResult {
  statusCode: number;
  body: string;
  accepted: boolean;
}

export interface AppsScriptPort {
  postJson(url: string, payload: unknown): Promise<{ statusCode: number; body: string }>;
}

export class WorkflowAppsScriptService {
  constructor(
    private readonly endpoint: string,
    private readonly port: AppsScriptPort,
  ) {}

  async submitJob(job: WorkflowJobInput): Promise<AppsScriptSubmitResult> {
    const payload = {
      jobId: job.jobId,
      mode: job.mode,
      sourceDocumentRef: job.sourceDocumentRef,
      signingRequired: job.signingRequired,
      certification: job.certification,
      queue: job.queue,
    };

    const response = await this.port.postJson(this.endpoint, payload);
    return {
      statusCode: response.statusCode,
      body: response.body,
      accepted: response.statusCode >= 200 && response.statusCode < 300,
    };
  }

  async pushCompletion(
    rowRef: string,
    artifactRef: string,
    sessionId?: string,
  ): Promise<AppsScriptSubmitResult> {
    const response = await this.port.postJson(this.endpoint + '/complete', {
      rowRef,
      artifactRef,
      sessionId,
      completedAt: new Date().toISOString(),
    });

    return {
      statusCode: response.statusCode,
      body: response.body,
      accepted: response.statusCode >= 200 && response.statusCode < 300,
    };
  }
}

/**
 * Public-safe example: browser signing controller.
 *
 * This module demonstrates how a browser-facing signing surface might manage:
 * - loading a prepared document
 * - tracking required signing targets
 * - calling a local signing bridge
 * - finalizing export only when the workflow is complete
 */

export type SigningTargetName = 'enterprise_signature' | 'personal_signature';

export interface SigningTargetState {
  name: SigningTargetName;
  required: boolean;
  signed: boolean;
}

export interface SigningControllerDeps {
  loadPreparedDocument(documentRef: string): Promise<void>;
  signTarget(target: SigningTargetName): Promise<{ artifactRef: string }>;
  finalizeExport(artifactRef: string): Promise<void>;
}

export class BrowserSigningController {
  private targets: SigningTargetState[];
  private latestArtifactRef = '';

  constructor(
    private readonly documentRef: string,
    targetConfig: SigningTargetState[],
    private readonly deps: SigningControllerDeps,
  ) {
    this.targets = targetConfig.map((item) => ({ ...item }));
  }

  async initialize(): Promise<void> {
    await this.deps.loadPreparedDocument(this.documentRef);
  }

  getTargetState(): SigningTargetState[] {
    return this.targets.map((item) => ({ ...item }));
  }

  canSign(target: SigningTargetName): boolean {
    const state = this.targets.find((item) => item.name === target);
    return !!state && !state.signed;
  }

  async sign(target: SigningTargetName): Promise<void> {
    if (!this.canSign(target)) {
      throw new Error('Target is unavailable for signing.');
    }

    const result = await this.deps.signTarget(target);
    this.latestArtifactRef = result.artifactRef;

    this.targets = this.targets.map((item) =>
      item.name === target ? { ...item, signed: true } : item,
    );
  }

  hasCompletedRequiredTargets(): boolean {
    return this.targets
      .filter((item) => item.required)
      .every((item) => item.signed);
  }

  getNextSuggestedTarget(): SigningTargetName | null {
    const next = this.targets.find((item) => item.required && !item.signed);
    return next ? next.name : null;
  }

  async exportFinalArtifact(): Promise<void> {
    if (!this.latestArtifactRef) {
      throw new Error('No signed artifact is available for export.');
    }

    if (!this.hasCompletedRequiredTargets()) {
      throw new Error('Required signing targets are not complete.');
    }

    await this.deps.finalizeExport(this.latestArtifactRef);
  }
}

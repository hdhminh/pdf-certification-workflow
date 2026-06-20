import type { SigningTarget } from '../models/workflow';
import type { LocalSigningBridgeClient } from './bridge-client';

export interface BrowserSignerState {
  documentRef: string;
  targets: Array<SigningTarget & { completed: boolean }>;
  latestArtifactRef?: string;
}

export class BrowserSigner {
  private readonly state: BrowserSignerState;

  constructor(
    documentRef: string,
    targets: SigningTarget[],
    private readonly bridge: LocalSigningBridgeClient,
  ) {
    this.state = {
      documentRef,
      targets: targets.map((target) => ({ ...target, completed: false })),
    };
  }

  getState(): BrowserSignerState {
    return {
      documentRef: this.state.documentRef,
      latestArtifactRef: this.state.latestArtifactRef,
      targets: this.state.targets.map((target) => ({ ...target })),
    };
  }

  getPendingTargets(): string[] {
    return this.state.targets
      .filter((target) => target.required && !target.completed)
      .map((target) => target.name);
  }

  async signTarget(sessionId: string, targetName: string): Promise<void> {
    const target = this.state.targets.find((item) => item.name === targetName);
    if (!target) throw new Error('Unknown signing target.');
    if (target.completed) throw new Error('Signing target is already complete.');

    const result = await this.bridge.sign({
      sessionId,
      documentRef: this.state.documentRef,
      targetName,
    });

    if (!result.ok || !result.artifactRef) {
      throw new Error(result.message || 'Signing bridge returned an invalid response.');
    }

    target.completed = true;
    this.state.latestArtifactRef = result.artifactRef;
  }

  canFinalize(): boolean {
    return this.state.targets
      .filter((target) => target.required)
      .every((target) => target.completed);
  }
}

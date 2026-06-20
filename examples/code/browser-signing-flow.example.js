/**
 * Public-safe example: browser-side signing flow.
 *
 * This is a simplified illustration of how a signing page can:
 * - load a prepared document
 * - choose a signing target
 * - call a local signing bridge
 * - export the final file back into the workflow
 */
async function runBrowserSigningExample() {
  const preparedDocumentUrl = '/prepared/document/placeholder.pdf';
  const localBridgeUrl = 'http://localhost:9506';

  const signingSession = {
    sessionId: 'session_demo_2026_001',
    targets: ['enterprise_signature', 'personal_signature'],
    exportMode: 'manual-finalize',
  };

  const preparedDocument = await fetch(preparedDocumentUrl);
  if (!preparedDocument.ok) {
    throw new Error('Prepared document could not be loaded.');
  }

  const bridgeResponse = await fetch(localBridgeUrl + '/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: signingSession.sessionId,
      target: 'enterprise_signature',
      documentRef: 'prepared_document_placeholder',
    }),
  });

  if (!bridgeResponse.ok) {
    throw new Error('Signing bridge rejected the signing request.');
  }

  const signedArtifact = await bridgeResponse.json();

  return {
    status: 'signed',
    artifact: signedArtifact,
  };
}

/**
 * Public-safe example: final export flow after signing.
 *
 * Shows how a browser-side UI could confirm the final artifact and trigger
 * either local download or workflow-record return.
 */
async function finalizeSignedDocumentExample() {
  const artifact = {
    artifactRef: 'signed_artifact_placeholder',
    fileName: 'signed-certified-copy.pdf',
    returnMode: 'workflow-record',
  };

  const exportResponse = await fetch('/workflow/export-placeholder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(artifact),
  });

  if (!exportResponse.ok) {
    throw new Error('Final export request failed.');
  }

  const exportResult = await exportResponse.json();

  return {
    status: 'exported',
    destination: exportResult.destination || 'workflow-record',
    artifactRef: artifact.artifactRef,
  };
}

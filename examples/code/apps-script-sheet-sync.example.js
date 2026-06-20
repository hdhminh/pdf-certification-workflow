/**
 * Public-safe example: write a processed result back into an operational sheet.
 *
 * This mirrors the kind of post-processing update a queue row may receive after
 * a certification or signing workflow completes.
 */
function updateWorkflowRowExample() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('Queue');

  if (!sheet) {
    throw new Error('Queue sheet not found.');
  }

  const rowRef = 2;
  const result = {
    status: 'completed',
    outputLink: 'https://storage-placeholder.example/artifacts/final.pdf',
    completedAt: new Date().toISOString(),
    sessionId: 'session_demo_2026_001',
  };

  const columns = {
    status: 5,
    outputLink: 6,
    completedAt: 7,
    sessionId: 8,
  };

  sheet.getRange(rowRef, columns.status).setValue(result.status);
  sheet.getRange(rowRef, columns.outputLink).setValue(result.outputLink);
  sheet.getRange(rowRef, columns.completedAt).setValue(result.completedAt);
  sheet.getRange(rowRef, columns.sessionId).setValue(result.sessionId);

  return result;
}

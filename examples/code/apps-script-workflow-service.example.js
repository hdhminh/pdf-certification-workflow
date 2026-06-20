/**
 * Public-safe example: Apps Script workflow service.
 *
 * This file shows a larger example of how an Apps Script layer may:
 * - read queue rows
 * - normalize input
 * - submit certification/signing jobs
 * - write results back into the queue
 */

function processQueueRowExample(rowRef) {
  const row = readQueueRowExample_(rowRef);
  const job = buildWorkflowJobExample_(row);
  const response = submitWorkflowJobExample_(job);

  writeWorkflowResultExample_(rowRef, response);
  return response;
}

function readQueueRowExample_(rowRef) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Queue');
  if (!sheet) {
    throw new Error('Queue sheet not found.');
  }

  const values = sheet.getRange(rowRef, 1, 1, 8).getValues()[0];

  return {
    rowRef: String(rowRef),
    sourceDocumentRef: String(values[0] || ''),
    operatorRef: String(values[1] || ''),
    certificationRef: String(values[2] || ''),
    requiresSigning: String(values[3] || '').toLowerCase() === 'yes',
    outputMode: String(values[4] || 'workflow-record'),
    status: String(values[5] || 'queued'),
  };
}

function buildWorkflowJobExample_(row) {
  return {
    jobId: 'job_' + row.rowRef,
    sourceDocumentRef: row.sourceDocumentRef,
    operatorRef: row.operatorRef,
    certificationRef: row.certificationRef,
    signingRequired: row.requiresSigning,
    returnMode: row.outputMode,
    queueRowRef: row.rowRef,
    mode: row.requiresSigning ? 'signing' : 'certification-copy',
  };
}

function submitWorkflowJobExample_(job) {
  const endpoint = 'https://workflow-endpoint-placeholder.example/api/jobs';

  const response = UrlFetchApp.fetch(endpoint, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(job),
    muteHttpExceptions: true,
  });

  return {
    statusCode: response.getResponseCode(),
    body: response.getContentText(),
    submittedJobId: job.jobId,
  };
}

function writeWorkflowResultExample_(rowRef, result) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Queue');
  if (!sheet) {
    throw new Error('Queue sheet not found.');
  }

  sheet.getRange(rowRef, 6).setValue(result.statusCode === 200 ? 'submitted' : 'failed');
  sheet.getRange(rowRef, 7).setValue(result.submittedJobId);
  sheet.getRange(rowRef, 8).setValue(result.body);
}

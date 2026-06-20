/**
 * Public-safe example: Apps Script intake layer for a certification job.
 *
 * This sample shows how a queue row could be transformed into a processing
 * request for a local/private PDF workflow. All identifiers and endpoints are
 * placeholders.
 */
function submitCertificationJobExample() {
  const processingUrl = 'https://processing-endpoint-placeholder.example/api/pdf/prepare';

  const payload = {
    jobId: 'job_demo_2026_001',
    documentName: 'sample-certified-copy.pdf',
    sourceDocumentRef: 'drive_file_placeholder',
    certification: {
      referenceNumber: 'REF-2026-001',
      bookNumber: 'BOOK-01',
      issuedDate: '2026-06-20',
    },
    signingRequired: true,
    returnMode: 'workflow-record',
    metadata: {
      queueRowRef: 'row_placeholder_001',
      operatorRef: 'operator_placeholder',
    },
  };

  const response = UrlFetchApp.fetch(processingUrl, {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  });

  const status = response.getResponseCode();
  const body = response.getContentText();

  Logger.log({
    status: status,
    body: body,
  });

  return {
    status: status,
    body: body,
  };
}

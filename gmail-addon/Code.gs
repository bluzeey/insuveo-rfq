/** Contextual Google Workspace Gmail add-on starter.
 * Reads only the current email; no automatic sending or attachment parsing.
 */
function onGmailMessage(e) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Insuveo RFQ').setSubtitle('Commercial property · current email'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextParagraph().setText('Generate a first-pass RFQ from this email. Always review and complete missing fields before sharing.'))
      .addWidget(CardService.newTextButton().setText('Generate RFQ draft').setOnClickAction(CardService.newAction().setFunctionName('generateRfq'))))
    .build();
}
function generateRfq(e) {
  try {
    var token=e.gmail && e.gmail.accessToken, id=e.gmail && e.gmail.messageId;
    if(!token || !id) throw Error('Open an email first.');
    GmailApp.setCurrentMessageAccessToken(token);
    var msg=GmailApp.getMessageById(id);
    var body=msg.getPlainBody().slice(0,25000);
    var checks=[
      ['Insured',/\b(?:insured|proposer|company)\s*(?:name)?\s*[:\-]\s*([^\n]+)/i],
      ['Risk location',/\b(?:risk location|premises|property address)\s*[:\-]\s*([^\n]+)/i],
      ['Occupancy',/\b(?:occupation|occupancy|nature of business)\s*[:\-]\s*([^\n]+)/i],
      ['Building sum insured',/\b(?:building sum insured|building SI)\s*[:\-]\s*([^\n]+)/i],
      ['Plant & machinery',/\b(?:plant and machinery|plant & machinery)\s*[:\-]\s*([^\n]+)/i],
      ['Stocks',/\b(?:stock sum insured|stock SI)\s*[:\-]\s*([^\n]+)/i],
      ['Claims history',/\b(?:claims history|loss experience)\s*[:\-]\s*([^\n]+)/i]
    ];
    var lines=['Subject: '+msg.getSubject(),'Sender: '+msg.getFrom()];
    checks.forEach(function(row){var m=body.match(row[1]);lines.push(row[0]+': '+(m?m[1].trim().slice(0,180):'[MISSING – confirm with client]'));});
    var s=CardService.newCardSection().setHeader('RFQ draft · review');
    s.addWidget(CardService.newTextParagraph().setText('Rule-based extraction from this message only. Other messages and attachments have NOT been parsed.'));
    s.addWidget(CardService.newTextInput().setFieldName('rfqText').setTitle('Edit or copy RFQ').setMultiline(true).setValue(lines.join('\n')));
    return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().pushCard(CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle('Insuveo | Review RFQ')).addSection(s).build())).build();
  } catch(err) {
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('RFQ draft unavailable: '+err.message)).build();
  }
}
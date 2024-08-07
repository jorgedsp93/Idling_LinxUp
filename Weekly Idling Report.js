function weeklyIdlingSummaryEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("idle"); // Target the specific sheet titled "idle"
  const data = sheet.getDataRange().getValues();
  const emailBody = createIdlingSummary(data);
  const subject = "Weekly Idling Summary";
  const emailAddress = "jserrano@meadowb.com";

  if (emailBody) {
    MailApp.sendEmail(emailAddress, subject, emailBody, {htmlBody: emailBody});
  }
}

function createIdlingSummary(data) {
  let summary = "<b>Idling Summary</b><br><br>";
  const idleData = {};

  // Skip header row and filter data from Monday to Friday
  data.slice(1).forEach(row => {
    const user = row[0].trim();
    const idleTime = parseInt(row[1].trim().split(" ")[0]);
    let date = row[2];

    // Ensure date is treated as a Date object
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
      const dateString = Utilities.formatDate(date, Session.getScriptTimeZone(), "MM/dd/yy");
      if (!idleData[dateString]) {
        idleData[dateString] = {};
      }
      if (!idleData[dateString][user]) {
        idleData[dateString][user] = 0;
      }
      idleData[dateString][user] += idleTime;
    }
  });

  let totalWeekIdle = 0;
  Object.keys(idleData).sort().forEach(date => {
    summary += `<b>Date: ${date}</b><br>`;
    let totalDayIdle = 0;
    Object.keys(idleData[date]).forEach(user => {
      const time = idleData[date][user];
      summary += `${user} idled for a total of ${time} minutes<br>`;
      totalDayIdle += time;
    });
    summary += `<b>Total Idle time for the day: ${totalDayIdle} minutes</b><br><br>`;
    totalWeekIdle += totalDayIdle;
  });

  summary += `<b>Total Idle for the week: ${totalWeekIdle} minutes</b><br>`;
  return summary;
}

function setTriggerForWeeklyEmail() {
  // Set the trigger for every Friday at the end of the day
  ScriptApp.newTrigger('weeklyIdlingSummaryEmail')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(17) // 5 PM
    .create();
}

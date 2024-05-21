# Idling_LinxUp

This Google Apps Script automates weekly email summaries of user idling from a Google Spreadsheet. It calculates and reports daily and weekly idle times by user, sending updates every Friday at 5 PM. Ideal for productivity and usage monitoring.
This code is designed to automatically send a weekly summary email about vehicle idling times recorded in a Google Spreadsheet. The email includes details of how much time each vehicle idled each day from Monday to Friday and the total idle time for the week.

How the Code Works
Key Components
Spreadsheet: A Google Sheet titled "idle" that contains data about vehicle idling.
Functions: Specific blocks of code that perform tasks.
Email: The code sends an email summarizing the idling information.
Code Breakdown
Let's break down each part of the code and explain what it does in simple terms.

1. Main Function: weeklyIdlingSummaryEmail()
This function is the main part of the code. It does the following:

Accesses the Spreadsheet: It gets the Google Spreadsheet that is currently active (open).
Gets the Data: It retrieves all the data from a sheet named "idle".
Creates the Email Body: It calls another function to create the content (body) of the email.
Sends the Email: If there is any content to send, it sends an email to a specified address.

Helper Function: createIdlingSummary(data)
This function processes the data from the spreadsheet and organizes it into a readable summary. It performs the following tasks:

Initializes a Summary: Starts the summary with a title.
Processes Each Row: Looks at each row of data (ignoring the header row) to gather information about idle times.
Filters Days: Only includes data from Monday to Friday.
Calculates Totals: Keeps track of idle times for each user (vehicle) and totals for each day and the entire week.
Formats the Summary: Creates a nicely formatted summary to include in the email.

Trigger Function: setTriggerForWeeklyEmail()
This function sets up a trigger (a scheduled event) to run the weeklyIdlingSummaryEmail function every Friday at 5 PM. This means the code will automatically send the weekly summary email at the end of each workweek.

Summary
In simple terms:

The main function (weeklyIdlingSummaryEmail) gets the data from a Google Sheet, creates a summary of vehicle idling times for the week, and sends an email with that summary.
The helper function (createIdlingSummary) organizes and formats the data into a readable summary.
The trigger function (setTriggerForWeeklyEmail) schedules the main function to run automatically every Friday at 5 PM, so you don’t have to run it manually.
This automated system helps ensure that you receive a weekly email with a summary of vehicle idling times, making it easier to monitor and manage idle times.

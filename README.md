# LASS

## Labour Assistant For Complex Labour Requirements

Lass is an all in one Labour Assistant.
Designed for managing day to day labour allocations, skill management, reports and payroll.

### SETUP

#### STEP ONE - download npm packages

Create a split terminal, in one cd to backend, in the other cd to frontend/vite-project. Once done npm install in both terminals.

#### STEP TWO - DB setup

Go to mySQL workbench and created a new database.<br>
Make sure to keep track of the database user, password, and port.<br>
Create a .env file in the backend folder, and setup with this structure.<br>
DB_NAME=<i>database name</i><br>
DB_USER=<i> database user</i><br>
DB_PASSWORD=<i> database password</i><br>
DB_HOST=<i> database host</i><br>
DB_PORT=<i> database port</i><br>
PORT=8081<br>
TWILIO_ACCOUNT_SID=<i>twilio account sid</i><br>
TWILIO_AUTH_TOKEN=<i>twilio auth token</i><br>
Once done, in the backend terminal, type 'npm start'<br>
Once tables have been synced, copy the content from script_file in the root folder of the project into your workbench with your new database selected.

#### STEP THREE - Open UI

In the vite-project terminal, npm start. Then open the link in the terminal - should be http://localhost:5173/

### NAVIGATING THE PROJECT

#### LOGIN PAGE

For Employee login,<br>
email: jacob.taylor@terminals.com.au<br>
password: test

For Admin login,<br>
email: jack.white@terminals.com.au<br>
password: test

To utilize the forgot password feature, go back into workbench and run this script. note your phone number must be wrapped in quotation marks.

update employees<br>
set contact_number = <"your number in 04\* \_ \_ \_ \_ \_ \_ \_ format"><br>
where employee_id = 1

Then click forgot password, enter jacob.taylor@terminals.com.au as the email and follow the prompts.

#### USING THE ADMIN PAGE (logged in as jack.white@terminals.com.au)

Most prompts are self explanatory, but for a fortnight simulation you can follow the first 2 steps starting from 9th June 2025 until the 22nd June 2025, and then once all 14 days have been completed use step 3. It is not mandatory for step 3 to have a 14 day data set. To test leave approvals and skill revocation, do step four in conjunction with step one.

#### STEP ONE

Open Allocations page and select a date after the 8th of June 2025 for blank allocation pages where you can enter the data yourself, ensuring you add a team first. Or for already input data select any date from the 26th May 2025 til the 8th June 2025.

To utilise the send allocations button located on the ride side of the allocations page within the teams section, head to admin containers located in the vite-project folder, then select AllocationsContainer(top) and scroll down to line 115 and input your own phone number in the same +61 format. Then when you click send allocations you should receive a text message.

#### STEP TWO

Head to the Teams tab at the top and select the same date that you just used for the allocations container, and you should see the teams that you created and be able to change their bonus.

#### STEP THREE

Head to the payroll tab, to utilise payroll, select a date range. Note that the date range you select must be 14 days. For a clear representation of what it would look like with data, select 26th May 2025 as the start date and 8th June 2025 as the end date. Select a payday to be able to confirm payslips when you open an employee's pay summary.

#### STEP FOUR

Head to the Leave Requests tab, not that accepting leave requests within the leave request tab, or revoking employee’s skills within the employees tab will alter their ability to be allocated. Accepting their leave request will remove them from the roster and won’t show up in the allocations tab. Revoking an employee’s skill will remove your ability to allocate them to a specific role.

#### EMPLOYEE PAGE (logged in as jacob.taylor@terminals.com.au)

The only functionality is submitting a leave request. Open the tab and follow the prompts.

#### TESTING

In both the backend terminal and the vite-project terminal, npm test in both to test both the frontend and backend tests.

#### SWAGGER DOCUMENTATION

Make sure the server is running, npm start in the backend terminal if necessary and type http://localhost:8081/lass/ in the browser.

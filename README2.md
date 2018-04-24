
# WYD RN? (What’re you doing right now?)
The goal of this app is to be the Slack of calendars.

## DONE:
- Users should be able to sign up.
- Users should be able to sign in.
- Users should be able to add events that get saved on the calendar.
- Users should have their own events appear on calendar upon sign in.
- Each user has their own calendar and events.
- Each user can delete an event.
- Created a cool favicon for app.

## POSSIBLE TODOS:

 - Issue: Handle duplicate users sent to database upon sign up.  An
   error text saying username already taken.
- Issue: Edit an Event.
- Issue: Delete Event page needs to look better.
- Issue: Delete Event page should delete multiple events.
- Issue: Delete Event page should be able to return to calendar.
- Issue: Page refresh should not restart app.  It should instead refresh page or create alternative.
- Issue: In week mode, going into week with an event causes error.  It blanks out the page.
- Issue: Need a logout button.
- Issue: Upon user sign up, should notify if username already taken.
- Issue: Going back to different views by hitting browser back button.  Maybe use React Router.
- Issue: Have persistent sign in.  Use passport.
- Issue: Add Jest tests.
- Issue: Fully implement Travis CI.

## FUTURE IDEAS:
- Feature for chat.
- Feature for adding stickers/giphy to calendar.
- Feature for changing calendar appearance, changing font, color scheme, size/layout.
- Import events from different calendar apps such as Google Calendar.
- Feature for uploading events from spreadsheet to calendar.
- Feature for downloading events from calendar into spreadsheet.
- Feature for sharing calendars with friends/coworkers.
- Feature for showing different calendars (one for work, one for social).
- Integrating calendar with chat.  Chat notifies user when an event is about to occur.

## To install:
Fork the repo to your local GitHub.
Open your favorite terminal.
Navigate to where you want to clone the repo.
Type `git clone` to clone the repo to your computer.
Navigate into the cloned repo.
Type `npm install` to install dependencies.

## To run:
In your terminal, navigate into your repo, and type `npm run react-dev`.
Open another terminal tab.
Type `mongod` or if that doesn’t work `sudo mongod` and type your password.
Open another terminal tab and navigate into your repo.
Type `npm run server-dev`.
Open your Chrome browser and type `http://localhost:3000`.
The homepage should appear.

## To run tests:
Open another terminal tab and navigate to your repo.
Type `npm run test`.
Jest tests should execute.

## CSS Styling:
Custom styling that we did can be found in client->dist->css in custom.css.
The calendar styling, calendar.css, was copied and pasted from react-big-calendar module.
The datetime styling, datetime.css, was copied and pasted from react-datetime module.
Links to css was added in index.html.

## Bootstrap:
The react-bootstrap module was downloaded which allowed us to use Bootstrap for styling.
Bootstrap was used to help style login and signup.
Useful links:
https://react-bootstrap.github.io/getting-started/introduction
https://react-bootstrap.github.io/components/forms/

## Calendar:
Calendar was created using the react-big-calendar module.
Useful links:
https://www.npmjs.com/package/react-big-calendar
http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro
http://technoetics.in/attendance-trackingevent-planning-system-in-reactjs/
Cannot read property 0 of undefined error solution:
https://github.com/intljusticemission/react-big-calendar/issues/718

## React Router (possible use later):
We wanted to use react router to route and redirect our React components.
https://reacttraining.com/react-router/web/example/basic
https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs

## Jest:
Jest was used to test our app, but more tests need to be written.
General start with Jest:
https://auth0.com/blog/testing-react-applications-with-jest/
Testing requests with Jest:
https://facebook.github.io/jest/docs/en/tutorial-async.html
Unexpected token error when running Jest solution:
https://stackoverflow.com/questions/34683758/running-test-via-jest-i-get-unexpected-token-in-included-jsx-files

# Expert Finder
Find experts in certain fields and contact them for help


Update to app.js
-The app is able to be run with sqlite and hosted locally now
-Pages link together and user can access the site

To Use:
1. Download and install Node.js and all dependencies with npm locally
2. Download and install Sqlite3
3. Run Node to start app.js (Type "node app.js") in the local directory to bring up the app 


FOR MAIN NEW BRANCH:

-Should merge this ASAP to avoid future collisions

-Using handlebars, can now easily inject and render dynamic content in the pages.

-Tested by hosting locally with Node, and the pages are all being hosted and working correctly.

-Merged the CSS into one CSS file.

-When updating individual pages, just update the view file for the page, the layout "main" is all the features that will carry across all pages. 

-To add additional javascript files, put the src in the app.js route for the page you are working on

The file structure changed substantially, any code that references the old file structure needs to be looked at.

-Login and Logout buttons now update on the user being logged in or not

-Session should be working, and is currently sending back :
userName: req.session.username
userID: req.session.ID

The session ID should be based on the row for the user in the DB (so the userID)

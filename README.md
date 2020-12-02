# Expert Finder
Find experts in certain fields and contact them for help


Update to app.js
-The app is able to be run with sqlite and hosted locally now
-Pages link together and user can access the site

To Use:
1. Download and install Node.js and all dependencies with npm locally
2. Download and install Sqlite3
3. Run Node to start app.js (Type "node app.js") in the local directory to bring up the app 


FOR BRANCH:

-Added a branch that is using handlebars. This could be merged into the main branch if we all want it (and it wont break anything)
-Tested by hosting locally with Node, and the pages are all being hosted and working correctly.
-Merged the CSS into one CSS file.

-When updating individual pages, just update the view file for the page, the layout main is the features that carry accross all pages. 
-Can now use handlebars to easily inject and render dynamic content in the pages.
-Just add any new js files to the bottom of the view file iof needed,  
  ie.  <script src="js/register.js"></script>

# Team AI Prompt & Audit Log
 
**Project Name:** ScholarFind
**Team Members:** Sebastian Luis Enrique Aguilar Díaz, Mauricio Figueroa Gaspar, Grace Alejadra Valencia Villanueva
**SDG Goal Target:** 4 Quality education and 10 Reduced inequalities
 
---
 
## Week [1] Log Entry
**Goal:** Setting up a responsive navbar with Bootstrap that collapses on mobile viewports.

**Prompt**:"How do I make the menu button in the navigation bar, the one with the three bars, turn white?"  

**Tool** : ChatGPT 5.6 Luna

**The Human Audit & Modifications**:  AI generated 2 css classes "navbar-toggler  navbar-toggler-icon" where it implemented a filter with brightness 0 and invert 1. Since it was a very little implementation ai didn't commit any mistake so we just tested it and it worked, so we added appropietly to the project. 


**Integration & Learnings**:  It integrates with the rest of the system by improving the look of the navbar, we learned how to switch the color from an icon, from black to white.
 

---
 
## Week [2] Log Entry
**Goal:** Create a level indicator for Rank progress

**Prompt**:"Is there a way to have the btn and btn-success design without it being a button, so it doesn't change with hovering?"  

**Tool** : ChatGPT 5.6 Luna

**The Human Audit & Modifications**:  AI generated a css class which we renamed as "green-squares", also was a small implementation so AI didn't commit big mistakes, we just adjust the margin so that it could look good.


**Integration & Learnings**:  It integrates with the rest of the system by allowing us to see the rank progress in the verify page, how to make css components quicker.


---
 
## Week [3] Log Entry
**Goal:** Make clean routes for every subpage on the project and use ejs files so we can edit them easily

**Prompt**:"Set up clean routes with EJS using res.render (no res.sendFile and no path import): remove the app.get with fs.readFileSync, configure one express.static middleware per required folder (/css, /js, /images), mount the router from src/routes, add a 404 view, migrate public/index.html and public/html/*.html to views/*.ejs, update all internal nav and asset references to the clean routes (/, /explore, /contribute, /verify, /myProfile, /about) and absolute paths (/css/*, /js/*, /images/*), and let the old /html/* URLs return 404 — keep the standard structure with views/ separate from routes/."  

**Tool** : Opencode Muse Spark 1.3

**The Human Audit & Modifications**:  AI was generating code with things that we didn't understood, so we make some corrections so that we know about everything AI was making.


**Integration & Learnings**:  It integrates with the static part of the project by displaying it and with the server by converting the html files to ejs files so that we could easily manage them in the future.

---

## Week [4] Log Entry
**Goal:** Make the contribute form send data with POST and make explore list the opportunities from the database.

**Prompt**:"Make the contribute form send data with POST to /contribute (no JS for the dropdowns, keep the options as they are), put the POST route in a new file, add a middleware to parse the tags, don't pass req.body directly to create, and make explore list the opportunities from the database with cards linking to the detail page."  

**Tool** : Opencode Muse Spark 1.3

**The Human Audit & Modifications**:  AI wanted to use path import and redirects so we told it not to, AI changed the select options and we told it to revert them because it broke the schema, AI put normalization logic in the schema and we told it to remove it because the middleware handles that, AI passed req.body directly to create and we told it to whitelist only the form fields, we also told AI to leave optional fields as undefined so a middleware can catch the errors later and to keep views separate from routes. 


**Integration & Learnings**:  It integrates with the database by saving what the user shares in contribute and showing it in explore and in the opportunity detail page, we learned how a middleware parses data before it reaches the database.
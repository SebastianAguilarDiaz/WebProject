# Team Developer Log
 
**Project Name:** ScholarFind  
**Team Members:** Sebastian Luis Enrique Aguilar Díaz, Mauricio Figueroa Gaspar, Grace Alejandra Valencia Villanueva  
**Active Repository Path:** https://github.com/SebastianAguilarDiaz/WebProject  

---

### Session 1 Log Entry
Session Overview

* **Date:** 2026-09-05
* **Module/Feature Scope:** Home Page
* **Est. Time Invested:** 3 hours
* **Active Developers:** Sebastian Aguilar

Goals:
* [x] Create HTML files
* [x] Create home page navigation menu 
* [x] Copy the navigation menu to the rest of the HTML files
* [x] Connect HTML files using the navigation menu
* [x] Create title, subtitle and buttons in the principal container
* [x] Add featured Opportunities
* [x] Add contact info

Concepts Mastered & Key Learnings
* **Bootstrap grid:** *I learned how Bootstrap grid works so that the page could be responsive.*

Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* Images from featured opportunities card didn't display as expected
  * ⚙️ *Diagnostic Action:* Inspected from the navigator so that the box model was clear to see.
  * ✅ *Root Cause & Resolution:* Styles changed from the index.css file

Documentation & Reference Links
* Bootstrap documentation - [Bootstrap](https://getbootstrap.com/)

Next Horizon Actions
1. Continue with another HTML file from another subpage of the project
 
---

### Session 2 Log Entry
Session Overview
 
* **Date:** 2026-09-07
* **Module/Feature Scope:** About Us Page
* **Est. Time Invested:** 2 hours
* **Active Developers:** Sebastian Aguilar

Goals:
* [x] Create title
* [x] Add purpose card
* [x] Add "How we work" section
* [x] Add our SDS alignments
* [x] Add "Meet the team" section
* [x] Add contact info
* [x] Create title on verification page
* [x] Do the card of pending contribution in the verification page
* [x] Do the queue of pending contributions

Concepts Mastered & Key Learnings
* **Bootstrap grid:** *I learned how auto works on the CSS properties.*

Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* Meet the team cards were all together
  * ⚙️ *Diagnostic Action:* Inspected from the navigator so that the box model was clear to see.
  * ✅ *Root Cause & Resolution:* Styles changed from the aboutUs.css file

  * ❌ *Error Message / Behavior:* Verification page wasn't responsive at all, the phone view was terrible
  * ⚙️ *Diagnostic Action:* Check the HTML file and the Bootstrap grid columns definitions
  * ✅ *Root Cause & Resolution:* Adjusted the number of columns in phone screen size so that the content looks good

Documentation & Reference Links
* Bootstrap documentation - [Bootstrap](https://getbootstrap.com/)

Next Horizon Actions
1. Continue with the verification page.
 
---

### Session 3 Log Entry
 
Session Overview
* **Date:** 2026-09-08
* **Module/Feature Scope:** Verification Page & Explore Page (Title, Search Bar & Filters)
* **Est. Time Invested:** 7.5 hours total (2h Sebastian, 2h Mauricio, 3.5h Grace)
* **Active Developers:** Sebastian Aguilar, Mauricio Figueroa, Grace Valencia
 
Goals:
* [x] Create the cards for contribution verified and flagged
* [x] Create the card for verifier rank
* [x] Create the card for the highest-contributing verifiers
* [x] Add images to the people on the top of contributing verifiers
* [x] Explore and read the project progress report & adapt to methodology
* [x] Research Bootstrap in depth and familiarize with current project resources
* [x] Create the title container and adjust its styles (gray background)
* [x] Add search and navigation bar to title container
* [x] Fully understand Bootstrap grid columns & prepare filter column

Concepts Mastered & Key Learnings
* **Bootstrap icons:** *Learned how to use Bootstrap icons.*
* **Bootstrap and CSS:** *Clear understanding of handling CSS and Bootstrap styles; practical implementation of class concepts.*
* **Bootstrap grid and style:** *Gained deep understanding of how Bootstrap grid system works for layout structuring.*

Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* The rows of the top 5 verifiers didn't have enough space between them, so the images were touching each other
  * ⚙️ *Diagnostic Action:* Inspected from the navigator so that the row's box model and distribution were clear
  * ✅ *Root Cause & Resolution:* Styles changed from the verification.css file

  * ❌ *Error Message / Behavior:* Headers weren't working as expected
  * ⚙️ *Diagnostic Action:* Experimented with native Bootstrap elements and modified via CSS
  * ✅ *Root Cause & Resolution:* Implemented a temporary custom CSS adjustments solution

  * ❌ *Error Message / Behavior:* Filter column set up as a single row couldn't be arranged properly for mobile view
  * ⚙️ *Diagnostic Action:* Used browser Inspect tool to check mobile responsiveness
  * ✅ *Root Cause & Resolution:* Identified grid layout issues to be restructured for multi-device responsiveness in the next session

Documentation & Reference Links
* Bootstrap documentation - [Bootstrap](https://getbootstrap.com/)
 
Next Horizon Actions
1. Resolve responsive interface layout for mobile devices on Explore Page
2. Continue with another HTML file from another subpage of the project

---

### Session 4 Log Entry
 
Session Overview
* **Date:** 2026-09-09
* **Module/Feature Scope:** Contribute and Explore pages & Branch Merging Integration
* **Est. Time Invested:** 18 hours total (5h Sebastian, 7h Mauricio, 6h Grace)
* **Active Developers:** Sebastian Aguilar, Mauricio Figueroa, Grace Valencia
 
Goals:
* [x] Create the cards for contribution verified and flagged
* [x] Create the card for verifier rank
* [x] Create the card for the highest-contributing verifiers
* [x] Add images to the people on the top of contributing verifiers
* [x] Implement search results container and cards
* [x] Add community verifications module to Explore Page
* [x] Resolve merge conflicts between branch `explore` and `main`

Concepts Mastered & Key Learnings
* **Bootstrap icons:** *Learned how to use Bootstrap icons.*
* **Advanced Bootstrap Layouts & CSS:** *Mastered integrating dynamic component cards within responsive grid systems.*
* **Git Conflict Resolution & Workflow:** *Learned the importance of keeping branches updated, pushing local changes before switching tasks, and systematically resolving merge conflicts.*

Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* The rows of the top 5 verifiers didn't have enough space between them, so the images were touching each other
  * ⚙️ *Diagnostic Action:* Inspected from the navigator so that the row's box model and distribution were clear
  * ✅ *Root Cause & Resolution:* Styles changed from the verification.css file

  * ❌ *Error Message / Behavior:* Multiple Git merge conflicts preventing Pull Request from `explore` branch into `main`
  * ⚙️ *Diagnostic Action:* Reviewed repository history and branch status; identified unpushed changes and concurrent edits across multiple active branches without prior syncing
  * ✅ *Root Cause & Resolution:* Manually resolved code conflicts file by file in VS Code/Git, synchronized branch states, and established a team protocol to push changes before working on parallel tasks

Documentation & Reference Links
* Bootstrap documentation - [Bootstrap](https://getbootstrap.com/)
* Bootstrap documentation - [Bootstrap](https://getbootstrap.com/)
* Git documentation on merging - [Git Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
 
Next Horizon Actions
1. Continue with another HTML file from another subpage of the project

---
### Session 5 Log Entry
 
Session Overview
* **Date:** 2026-10-13
* **Module/Feature Scope:** Project restructuration
* **Est. Time Invested:** 2 hours
* **Active Developers:** Sebastian Aguilar
 
Goals:
* [x] Create de folder structure so we can continue working with the server part of the project


Concepts Mastered & Key Learnings
* **Express basic folder structure** *Learned how to make the basic structure for an express project*


Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* Because of the simplicity of the activity there were no errors
  * ⚙️ *Diagnostic Action:* 
  * ✅ *Root Cause & Resolution:*
 
Next Horizon Actions
1. Start with the server implementation

---
### Session 6 Log Entry
Session Overview
* **Date:** 2026-10-14
* **Module/Feature Scope:** Server page rendering
* **Est. Time Invested:** 3 hours
* **Active Developers:** Sebastian Aguilar, 

Goals:
* [x] Implement the principal endpoint for the server

Concepts Mastered & Key Learnings
* **Express endpoints** *Mastered the express endpoints creation*


Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* The weren't styles in the page provided by the server.js file
  * ⚙️ *Diagnostic Action:*  The server wasn't reading the css files
  * ✅ *Root Cause & Resolution:*  It was missing a middleware to manage those files


Documentation & Reference Links
* Express documentation - [Express](https://expressjs.com/en/5x/starter/static-files/)
 
Next Horizon Actions
1. Continue with more complex endpoints

---
### Session 7 Log Entry
Session Overview
* **Date:** 2026-10-16
* **Module/Feature Scope:** Principal endpoints, db implementation
* **Est. Time Invested:** 1.5 hours
* **Active Developers:** Sebastian Aguilar, 

Goals:
* [x] Implement the principal pages endpointst
* [x] Implement the .ejs files for the page
* [x] Create opportunity visualization page
* [x] Create opportunity schema for mongoDB
* [x] Create opportunity services
* [x] Connect with the DB




Concepts Mastered & Key Learnings
* **Express endpoints** *Mastered the express endpoints creation*
* **Ejs files** *How to render an ejs file*
* **Mongoose schema** *How to create a mongoose schema*


Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* There weren't errors
  * ⚙️ *Diagnostic Action:*  
  * ✅ *Root Cause & Resolution:*  


 
Next Horizon Actions
1. Continue with the next endpoints and mongoDB 

---
### Session 8 Log Entry
Session Overview
* **Date:** 2026-10-16
* **Module/Feature Scope:** Contribute form POST & dynamic Explore listing
* **Est. Time Invested:** 2 hours
* **Active Developers:** Sebastian Aguilar, 

Goals:
* [x] Make the contribute form send data with POST
* [x] Create parseOpportunity middleware for the tags
* [x] Create opportunityRoutes file with the POST route
* [x] Change upload image button for an image URL field
* [x] Make explore list the opportunities from the database
* [x] Make the opportunity detail page read from the database

Concepts Mastered & Key Learnings
* **Express middleware** *Learned how a middleware parses the form data before it reaches the database*
* **Ejs loops** *Learned how to render the explore cards from the database*


Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* The type selected in contribute didn't show in the detail page
  * ⚙️ *Diagnostic Action:* Checked the detail route and it wasn't reading from the database, only passing the id
  * ✅ *Root Cause & Resolution:* Changed the route so it reads the opportunity with findOpportunity and passes all the fields to the view


 
Next Horizon Actions
1. Implement the search and filters in explore

---
### Session 9 Log Entry
Session Overview
* **Date:** 2026-10-17
* **Module/Feature Scope:** Explore filters (subject, level and type)
* **Est. Time Invested:** 2 hours
* **Active Developers:** Sebastian Aguilar

Goals:
* [x] Fix the explore form so the filters can be sent
* [x] Create a middleware to normalize the query to arrays
* [x] Create the service to translate the filters into a Mongo filter
* [x] Generate the checkboxes from the schema enums
* [x] Remove the country/location filter and add a type filter
* [x] Keep the selected filters checked after reloading

Concepts Mastered & Key Learnings
* **Query string** *Learned how to read the filters from the URL with req.query*
* **Mongo filters** *Learned how to use $in so a filter matches any value of a list*
* **Ejs with the schema enums** *Learned how to render the checkboxes from the model enums so they never mismatch*

Systematic Bug & Error Tracker 
  * ❌ *Error Message / Behavior:* The filters did nothing, clicking Explore didn't send anything
  * ⚙️ *Diagnostic Action:* Checked the explore form and saw nested forms and an Explore button that was a link
  * ✅ *Root Cause & Resolution:* Wrapped everything in a single GET form and used a submit button

  * ❌ *Error Message / Behavior:* The level filter values (Graduate, K-12) didn't exist in the schema
  * ⚙️ *Diagnostic Action:* Compared the checkbox values with the gradeLevels enum in the model
  * ✅ *Root Cause & Resolution:* Generated the checkboxes from the schema enums

Documentation & Reference Links
* MongoDB $in operator - [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/)

Next Horizon Actions
1. Implement the search bar in explore 

---

### Session 10 Log Entry
Session Overview
* **Date:** 2026-10-19
* **Module/Feature Scope:** Explore search bar, dynamic Verify queue, Draft removal and seed data
* **Est. Time Invested:** 2 hours
* **Active Developers:** Sebastian Aguilar

Goals:
* [x] Implement the Explore search bar by title and description
* [x] Escape special characters before building the regex
* [x] Render the pending opportunities of the Verify queue from the database
* [x] Remove the Draft status from the model, views and CSS
* [x] Remove the decorative icons from the queue cards
* [x] Seed 50 opportunities from the CSV files

Concepts Mastered & Key Learnings
* **Regex search:** *Learned how to search text with a case-insensitive regex and how to escape special characters.*
* **Mongo $or:** *Learned how to match a search term in more than one field.*
* **EJS loops:** *Learned how to render the Verify queue from the pending opportunities passed by the route.*

Systematic Bug & Error Tracker
  * ❌ *Error Message / Behavior:* Searching for text with special characters, like C++, broke the regular expression
  * ⚙️ *Diagnostic Action:* Tested the search with symbols and reviewed how the regex was built
  * ✅ *Root Cause & Resolution:* Escaped the special regex characters before creating the RegExp

Documentation & Reference Links
* MongoDB $or operator - [$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/)
* MDN Regular expressions - [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

Next Horizon Actions
1. Implement the voting system and the trust score

---

### Session 11 Log Entry
Session Overview
* **Date:** 2026-10-19
* **Module/Feature Scope:** Voting system, trust score and post-vote redirects
* **Est. Time Invested:** 1 hours
* **Active Developers:** Sebastian Aguilar

Goals:
* [x] Add validVotes and invalidVotes to the voting flow
* [x] Calculate trustScore as the percentage of valid votes
* [x] Delete the opportunity when it reaches 100 votes with less than 70% trust
* [x] Change the status to Verified when it reaches 100 votes with 70% trust or more
* [x] Apply the rules to opportunities that were already Verified
* [x] Redirect to the detail when the opportunity is not deleted
* [x] Redirect to Explore when a Verified opportunity is deleted
* [x] Redirect to Verify when a Pending opportunity is deleted
* [x] Fix the NaN error caused by missing vote counters

Concepts Mastered & Key Learnings
* **Mongoose updates:** *Learned how to load a document, modify its counters and save it.*
* **Percentage calculation:** *Learned how to compute the trust score with Math.round.*
* **Status-based redirects:** *Learned how to return the previous status from the service so the route can decide where to send the user.*

Systematic Bug & Error Tracker
  * ❌ *Error Message / Behavior:* Voting returned a 500 error on opportunities that did not have validVotes or invalidVotes
  * ⚙️ *Diagnostic Action:* Inspected in MongoDB and saw that both counters were undefined
  * ✅ *Root Cause & Resolution:* Initialized both counters with (value || 0) before adding the vote, avoiding a NaN that Mongoose rejected

  * ❌ *Error Message / Behavior:* Every vote redirected to /verify, even when the user came from an opportunity detail
  * ⚙️ *Diagnostic Action:* Reviewed the vote route and the status of the voted opportunity
  * ✅ *Root Cause & Resolution:* Returned the status before the vote and redirected to the detail, Explore or Verify depending on whether it was deleted

Documentation & Reference Links
* Mongoose findByIdAndDelete - [findByIdAndDelete](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete())
* MDN Math.round - [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

Next Horizon Actions
1. Improve the images and the home page with dynamic data

---

### Session 12 Log Entry
Session Overview
* **Date:** 2026-10-19
* **Module/Feature Scope:** Default avatar, Explore cleanup and dynamic Featured Opportunities
* **Est. Time Invested:** 1 hours
* **Active Developers:** Sebastian Aguilar, Mauricio Figueroa

Goals:
* [x] Generate a ui-avatars image when the opportunity has no image URL
* [x] Encode the program name before adding it to the avatar URL
* [x] Keep the image URL when the user provides one
* [x] Remove the Community Verification Trends section from Explore
* [x] Show the 3 verified opportunities with the most votes in Featured Opportunities
* [x] Remove the hardcoded Featured cards
* [x] Review the code of the previous sessions to understand how it works

Concepts Mastered & Key Learnings
* **encodeURIComponent:** *Learned how to encode spaces and special characters in a URL.*
* **Mongo aggregation:** *Learned how to use $match, $addFields, $sort and $limit to calculate total votes and get the top 3.*


Systematic Bug & Error Tracker
  There were no errors.

Documentation & Reference Links
* UI Avatars API - [UI Avatars](https://ui-avatars.com/)
* MongoDB aggregation pipeline - [Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

Next Horizon Actions
1. Continue with the user profile and leaderboard sections

---
### Session 13 Log Entry
Session Overview
* **Date:** 2026-10-22
* **Module/Feature Scope:** Visual improvements on the navbar and the Explore cards
* **Est. Time Invested:** 1.5 hours
* **Active Developers:** Mauricio Figueroa

Goals:
* [x] Make the navbar keep the same height on Home and Explore as on the other pages
* [x] Make the Explore cards have a standard height
* [x] Give the card image a fixed size so the layout does not change
* [x] Keep the opportunity type badge inside the card
* [x] Increase the space between the card rows

Concepts Mastered & Key Learnings
* **CSS specificity** *Learned why a global .btn rule only made two navbars taller, and how a more specific selector fixes it.*
* **object-fit: cover** *Learned how to put an image inside a fixed box and crop it instead of stretching it.*
* **Line clamp** *Learned how to limit a title or a description to a number of lines with CSS.*

Systematic Bug & Error Tracker
  * ❌ *Error Message / Behavior:* The navbar was taller on Home and Explore than on the other pages
  * ⚙️ *Diagnostic Action:* Compared the navbar code of every page and it was the same, so the difference had to come from the CSS files
  * ✅ *Root Cause & Resolution:* index.css and Explore.css had a global .btn rule that also made the navbar Search button bigger; the rule was moved to the specific buttons so it no longer touches the navbar

  * ❌ *Error Message / Behavior:* The Explore cards had different heights and the type badge went outside the card
  * ⚙️ *Diagnostic Action:* Checked the classes used on the card and the rules in Explore.css
  * ✅ *Root Cause & Resolution:* h-70 is not a Bootstrap class and .card-images was not defined in Explore.css, so the image used its natural size; changed it to h-100, gave the image a fixed height with object-fit: cover and made the badge wrap inside the card

Documentation & Reference Links
* Bootstrap card utilities - [Cards](https://getbootstrap.com/docs/5.3/components/card/)
* MDN object-fit - [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

Next Horizon Actions
1. Continue with the color palette and the shared styles after the authentication part is done
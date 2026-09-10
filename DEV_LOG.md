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
* Git documentation on merging - [Git Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
 
Next Horizon Actions
1. Continue with another HTML file from another subpage of the project
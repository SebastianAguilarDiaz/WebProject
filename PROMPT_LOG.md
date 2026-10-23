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

**Prompt**:"Make the contribute form send data with POST to /contribute, put the POST route in a new file, add a middleware to parse the tags, don't pass req.body directly to create, and make explore list the opportunities from the database with cards linking to the detail page."  

**Tool** : Opencode Muse Spark 1.3

**The Human Audit & Modifications**:  AI wanted to use path import and redirects so we told it not to, AI changed the select options and we told it to revert them because it broke the schema, AI put normalization logic in the schema and we told it to remove it because the middleware handles that, AI passed req.body directly to create and we told it to whitelist only the form fields, we also told AI to leave optional fields as undefined so a middleware can catch the errors later and to keep views separate from routes. 


**Integration & Learnings**:  It integrates with the database by saving what the user shares in contribute and showing it in explore and in the opportunity detail page, we learned how a middleware parses data before it reaches the database.

---

**Goal:** Make the explore filters work (by subject, by level and by type).

**Prompt**:"Create the services for the explore filters (by subject, by level and by type): read the query in a middleware and normalize it to arrays, translate it into a Mongo filter in the service, wrap the filters in a single GET form so they are sent, and generate the checkboxes from the schema enums so the values always match."  

**Tool** : Opencode DeepSeek V4.1 Flash

**The Human Audit & Modifications**:  AI first put the filters inside a broken form, so we told it to fix it with a single GET form and a real submit button. AI kept the country/location filter but the location field is free text, so we told it to remove it and add a type filter instead. AI put the toArray helper inside the service, so we told it to handle it as a middleware like parseOpportunity. The filter function had too many lines, so we told AI to make it simpler. We also told AI not to implement the search bar yet.


**Integration & Learnings**:  It integrates with the database by filtering the opportunities in explore so only the ones that match the checkboxes are shown, and with the schema by reading the enums so the filter values are always valid. We learned how to read the query string and turn it into a Mongo filter.

---

## Week [5] Log Entry
**Goal:** Implement the search bar in Explore so opportunities can be found by text.

**Prompt**: "Add a search bar to Explore that filters opportunities by title and description, escapes special characters so a search like C++ does not break, and keeps a single GET form with the filters."

**Tool** : Opencode DeepSeek V4.1 Flash

**The Human Audit & Modifications**: AI wanted to search in more fields, so we limited it to title and description. We also asked it to escape regex characters and to keep the search inside the same GET form as the filters, without changing the checkbox markup.

**Integration & Learnings**: It integrates with the existing Explore filters by adding a regex $or condition to the same Mongo filter, so text search and checkboxes work together. We learned how to escape user input before building a regular expression.

---

**Goal:** Show the pending contributions of the database in the Verify queue and remove the Draft status.

**Prompt**: "Render the pending opportunities in the Verify queue from the database, remove Draft from the model, buttons and CSS, and remove the calendar and check icons from each queue card."

**Tool** : Opencode DeepSeek V4.1 Flash

**The Human Audit & Modifications**: AI started adding extra logic to the view, so we told it to only render the opportunities passed by the route. We removed Draft from the enum and from the views, and we asked to remove the decorative icons without touching the deadline or location icons.

**Integration & Learnings**: It integrates the Verify page with the same opportunity service used by Explore, filtering by status Pending. We learned how to separate the database query from the EJS rendering and how the status field controls which page shows each opportunity.

---

**Goal:** Implement valid/invalid voting with a community trust score and automatic verification or rejection.

**Prompt**: "Make the Vote: Valid and Vote: Invalid buttons work: valid votes increase validVotes, invalid votes increase invalidVotes, the trust score is the percentage of total votes that are valid, and at 100 votes the opportunity is deleted if trust is below 70% or becomes Verified if it is 70% or higher."

**Tool** : Opencode DeepSeek V4.1 Flash

**The Human Audit & Modifications**: AI first redirected to /verify after every vote, so we defined the redirect rules: stay on the detail when the opportunity is not deleted, go to Explore when a Verified opportunity is deleted, and go to Verify when a Pending one is deleted. AI also ignored votes on opportunities that were no longer Pending, but we told it that those votes must count too because their trust can drop and they must be deleted. AI used a helper to rebuild the detail view, and we removed it because the id is enough to return to the detail. Finally, we fixed the NaN error caused by missing vote counters.

**Integration & Learnings**: It integrates with the Opportunity model and the Verify/Explore pages, updating the trust score and status in the database after each vote. We learned how to compute a percentage with Math.round, why both counters must be initialized, and how the previous status decides where to redirect.

---

**Goal:** Generate a default image for new opportunities, clean the Explore page and show the most voted verified opportunities on the home page.

**Prompt**: "If the opportunity has no image URL, generate one with ui-avatars using the program name; remove the Community Verification Trends section from Explore; and show only the 3 verified opportunities with the most votes in Featured Opportunities."

**Tool** : Opencode DeepSeek V4.1 Flash

**The Human Audit & Modifications**: AI was asked to use the title as the avatar name and to encode it, to keep a provided image URL untouched, and to apply the fallback only when saving. For Featured, we asked for verified opportunities only, ordered by total votes (valid + invalid), limited to 3, and we removed the hardcoded cards.

**Integration & Learnings**: It integrates with the Contribute POST route, the Explore view and the home page. We learned how to build a URL with encodeURIComponent and how to use a Mongo aggregation pipeline to calculate total votes and sort by that calculated field.

---

## Week [6] Log Entry
**Goal:** Add user accounts with server-side sessions and protect the pages that need a logged-in user.

**Prompt**: "Implement register, login and logout with express-session (no JWT), hash the passwords with bcryptjs, add a requireLogin middleware that redirects to /login?redirect=..., and protect /contribute, the vote action and /myProfile."

**Tool** : Opencode Big Pickle

**The Human Audit & Modifications**: The session had to stay on the server, so we rejected JWT, localStorage and client-side checks. We asked for a safe redirect that only accepts internal paths, for the password hash to never reach the view, and for the handlers to tolerate a missing body.

**Integration & Learnings**: The session middleware lives in server.js, the auth routes render the login and register views, and requireLogin protects the pages and actions. We learned how the session cookie keeps the user id on the server and why the hash is never rendered.

---

**Goal:** Let each user vote once per opportunity and apply the 100-vote community rule.

**Prompt**: "Create a Vote model with a unique user and opportunity index, let the user change their vote, recalculate the trust score, and at 100 votes mark the opportunity Verified at 70% or more, or delete it below 70% with a cascade cleanup."

**Tool** : Opencode Big Pickle

**The Human Audit & Modifications**: We defined that the creator can vote their own opportunity, that votes on Verified opportunities still count, and that the vote can change without duplicating the document. We also asked to return to the page that sent the form with returnTo and to render the emitted vote as active and disabled.

**Integration & Learnings**: The vote service updates the Vote document, the counters and the trust score; the detail and Verify views render the selected button. We learned how the unique compound index prevents duplicates and how the previous status decides the redirect after a deletion.

---

**Goal:** Show real statistics on MyProfile and Verify and finish the project cleanup.

**Prompt**: "Show the real shared and verified counts, the average trust score and the verifier rank on MyProfile, show the valid and invalid counts on Verify, clean the database and remove the empty public/js/index.js."

**Tool** : Opencode Big Pickle

**The Human Audit & Modifications**: We asked for the trust average to include only opportunities that already have votes, for the rank formula to be `min(5, 1 + floor(votesCast / 10))`, and for anonymous visitors to see zeros. We kept the legacy opportunities even though they have no creator, and we removed the empty JavaScript file because no page uses it.

**Integration & Learnings**: The user service calculates the statistics with counts and an aggregation; the profile and Verify views render them from the server. We learned how to run several queries in parallel and how to verify the database state after the cleanup.
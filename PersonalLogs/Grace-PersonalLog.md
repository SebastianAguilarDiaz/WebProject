# Personal Log: Explore Page Project

**Developer:** Grace Valencia  
**Date:** September 10, 2026  
**Project / Module:** Explore Page  

---

## 1. Technical Self-Assessment and Learning Process

At the beginning of this project, I did not feel very familiar with **Bootstrap**. Although we had done a previous exercise in class, I felt it wasn't enough practice for me, as I learn best through repetition and working through multiple hands-on exercises.

Through the development of the *Explore Page*, I managed to reinforce the concepts taught in class and gain new technical skills:

* **Grid System and CSS Mastery:** During the first sessions, I thoroughly researched the Bootstrap documentation. I moved from a theoretical understanding to confidently applying rows, columns, and Bootstrap grids to structure title containers, search bars, and filter columns.
* **Responsive Design:** I faced a significant challenge while layouting the filter column. Initially, I set it up as a single row, but when inspecting the interface, I realized it did not adjust well to mobile screens. This taught me the importance of planning code with a *mobile-first* mindset from the very beginning.
* **Formatting and Components:** Toward the end of the page layout, I struggled with applying specific Bootstrap formatting. This required spending considerable time searching the official documentation to tweak styles and customize native elements.

---

## 2. Version Control Management (GitHub)

Managing the repository was one of my biggest technical hurdles. When trying to integrate my changes through a merge, I had trouble with Git workflow and commands, which accidentally caused temporary errors on the `main` branch.

Although stressful at the time, this experience provided a valuable lesson on the importance of team version control, handling parallel branches carefully, and following proper procedures to resolve conflicts before merging code into production.

---

## 3. Teamwork Reflection and Collaboration

My experience collaborating with my teammates was extremely rewarding and positive:

* **Patience and Support:** When the GitHub issues arose, my teammates remained remarkably patient and understanding. They guided me step-by-step to fix the errors on the `main` branch without any frustration.
* **Knowledge Sharing:** They were very organized and took the time to explain not only how to solve Git conflicts, but also layout concepts I hadn't fully grasped yet. Thanks to their help, I now fully understand how Bootstrap grids and responsive layouts work.

---

## 4. Conclusion and Takeaways

This project marked a key turning point in my learning journey. I am leaving with the satisfaction of having overcome the Bootstrap learning curve through direct practice and research. I learned that making mistakes in code layouts or repository management is a natural part of development, and that working with a patient, organized, and supportive team turns challenges into great learning opportunities.

I now feel much more confident tackling responsive web design and collaborative development in future projects.

# Personal Log: Transici�n de JWT a sesiones con express-session y resoluci�n de variables de entorno en equipo

**Developer:** Grace Valencia  
**Date:** 2026-10-24  
**Project / Module:** Authentication / Session Management

---

## 1. Technical Self-Assessment and Learning Process

My main goal for this session was to understand whether it was necessary to implement JWT_SECRET and localStorage for this project. 

I questioned the use of JWT and localStorage since these topics hadn't been covered in class yet. After analyzing the AI's proposal, I evaluated and approved switching back to the traditional approach using express-session with httpOnly cookies, HTML forms and server-side rendering with EJS. 

I approved the creation of SESSION_SECRET in the .env file, verified the routes loaded correctly, checked the /login view and confirmed that the connect.sid cookie was being generated properly in the Application tab of Chrome DevTools. I also helped diagnose an issue one of my teammates had after cloning the repository.

---

## 2. Challenges and Problem Solving

- **Unnecessary complexity:** I was confused about why the AI was proposing JWT and localStorage when the professor hadn't asked for it, and it felt way too complex for a 3rd semester project.
- **DevTools navigation:** At first, I couldn't find the cookies for localhost. I learned that I had to expand the arrow next to "Cookies" under the Application tab and select http://localhost:3000 to actually view them.
- **Team environment issue:** One of my teammates got the error secret option required for sessions after pulling the latest changes. 

To solve this, I adjusted the plan with the AI to align it with what we've learned in class, using express-session instead. For the teammate's issue, I identified that they were missing their local .env file, since it's excluded by .gitignore. I guided them on how to create it and define the SESSION_SECRET variable correctly to get the project running again.

---

## 3. Teamwork Reflection and Collaboration

This session showed me how important it is to communicate with the team when debugging environment related issues. Instead of jumping straight into changing code, we took a moment to diagnose the root cause and realized it was just a missing local configuration file. 

By keeping the team aligned with the course material and voicing my concerns about the approach, we were able to keep the project simple, consistent and working for everyone.

---

## 4. Concepts Mastered & Key Learnings

* **Sessions vs JWT:** I learned that with JWT, the token has to be stored on the client side (like localStorage) and sent manually through the Authorization header. With express-session, the server creates a signed session and the browser automatically sends the connect.sid cookie on every request. 
* **Environment variables:** I learned that the .env file holds sensitive information, should never be committed to Git, and if it's missing from a collaborator's local machine, the server will crash. 
* **Cookie inspection:** I learned how to properly inspect active cookies in Chrome DevTools, including their flags such as httpOnly. 
* **Knowing when to simplify:** I learned the importance of sticking to what was taught in class instead of overcomplicating the project with tools we haven't seen yet.

---

## 5. Conclusion and Takeaways

I feel a lot more confident with session based authentication now. I learned to question the AI when its proposed solution doesn't match the requirements, to verify what I'm actually seeing in DevTools, and to help my teammates debug their local environments. 

The biggest takeaway for me is to always keep the architecture as simple as possible for the level we're at. Also, making sure every member of the team has their .env configured correctly is just as important as writing the code itself.

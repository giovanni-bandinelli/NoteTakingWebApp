## Note-Taking Web App

This is my attempt to convert [this Frontend Mentor's challenge](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG) into a fully functional full-stack application.

I'm building it with as few libraries as possible using the **PERN stack** (PostgreSQL, Express, React, Node.js). So far, I've completed:

- [x] Auth features: Register, Login, Google OAuth, Email reset links  
- [x] User settings: Theme and font customization  
- [x] Desktop layout
- [x] Notes CRUD operations (create, retrieve with various filters, modify/archivie and delete them)

I'm planning to host the client on **Vercel** and the server (plus PostgreSQL DB) on **Railway**.

---

### Features Still in Progress
- [ ] Toasts, modals, and a proper error display system (e.g. "user already registered")

### Stuff that I'll leave out in order to complete and deploy at least a MVP :(
- [ ] Responsive layout for mobile/tablet <-- Since it's a majorly different layout compared to Desktop I had set up a react-responsive hook to render either one or the other, but aside from that it wouldn't be that big of a challenge.

- [ ] Markdown + image support (maybe — still deciding) <-- I would have used some library for the Markdown 100%, Idk how it would have visually clashed with the rest of the app tho tbh.
- [ ] Full keyboard accessibility <-- This is something I'm actually really interested in, will try to implement it in some smaller project :)


---

### Some Screenshots (since app isn't really an usable mvp yet without setting up some stuff)
Login Page
  
  ![Login Page](./images/loginPage.png)
  <br><br>Light mode
  
  ![Light Theme](./images/lightTheme.png)
  
  <br><br>Dark mode + mono font 
  
  ![Dark Theme](./images/darkTheme.png)


## License

[Apache-2.0](./LICENSE)


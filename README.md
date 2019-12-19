# Learnify
This branch holds all of Learnify's development files. This branch is for development and testing prior to integrating branches with `staging`.

## Application Structure

### Frontend 
The frontend is built with React, which is hosted inside the `client/` folder. The `components/` are organized by their model, and supporting components are grouped together in these subcomponent folders. Components that serve purposes for more than one data model or view, are placed in the `/components/global` folder.

Redux is implemented into the frontend as a state manager, and is factored in `store.js`, and the `/actions` and `/reducers`.

The `public/` folder holds all the static files that are accessible to the public prior to user authentication and the application. These pages are on the root domain, `learnify.ca`.

### Backend
The backend is built with Node. The MVC architecture is generally used to organize the backend, with the `models/`, `controllers/`, and `routes/` containing the main files.

***Note***: `public/` is a substitute to the standard `views/` folder that is typically used in backend MVC systems to generate the views. In production, the frontend and backend are connected, and the views are controlled by the React frontend.

## Scripts

From `/`

`npm run dev` - runs the react app and node server concurrently, using a proxy between ports 3000 and 3001, respectively.

## Website Structure
The top-level folders contain each domain, which is segregated by service.

### learnify.ca
The root domain contains the home page and contact page, which have a beta invite form and contact form, respectively.

### app.learnify.ca
This subdomain hosts the application, and is only accessible to registered/authenticated users.

### beta.learnify.ca
This subdomain is the beta version of the application. This service is to always be one step ahead of `app.learnify.ca` and will test new features with the users within the beta grop. This service is only accessible to users who are registerd beta testers.

### blog.learnify.ca
This subdomain is accessed through `blog.html` on the root domain. This subdomain is accessible to everyone, and holds all of Learnify's blog posts.

### docs.learnify.ca
This subdomain hosts all supporting documents for Learnify, including but not limited to Terms of Service, What is Learnify, and the Changelog.

### team.learnify.ca
This subdomain is a future application specifically for the Learnify team. Certain modules within the service will have limited access, exclusive to execs and team leads. This subdomain will host the interface for team planning, KPIs, logs, and general communication.


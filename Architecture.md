# Architecture

## Wireframes
You can find the general idea for the layout in the `_wireframes/` dir.

## Architecture of the ssebs reactjs site is as follows:
- Routes:
  - / && /home
  - /about
  - /contact
  - /portfolio
  - /project/:id
- Components:
  - Home (Home page, will have some subcomponents)
    - Banner
    - Top Projects
    - About (Same as below)
    - Contact (Same as below)
  - Contact (Contact information, with picture of me)
  - About (About what ssebs is, and what "we" provide)
  - Portfolio (List of all projects, if you click on a project, it will take you to the project page)
  - ProjectDetail (Specific project details)
- File structure
  - `src/`
    - `assets/` <= dir for images/etc
    - `index.js` <= root component w/ react-router
    - `index.scss` <= base SCSS styles
    - `components/` dir for other components
      - `Home.js` <= home page
      - `Contact.js` <= contact page
      - `About.js` <= about page
      - `ProjectDetail.js` <= specific project detail page
      - `Portfolio/`
        - `index.js` <= page that gets rendered at /portfolio
        - `assets/` <= dir for images/etc
// react/deps imports
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

// component imports
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import ProjectDetail from "./components/ProjectDetail";

import { Container, Nav, Navbar } from "react-bootstrap";

import "./index.scss";

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark" collapseOnSelect expand="sm">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ssebs</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/home#about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/home#contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/portfolio">
                            <Nav.Link>Portfolio</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const Footer = () => {
    return (
        <>
            <footer className="text-center">
                <div className="footer-item">
                    <h4>LOCATION</h4>
                    <p>Silicon Valley, CA</p>
                </div>
                <div className="footer-item">
                    <h4>AROUND THE WEB</h4>
                    <ul>
                        <li>LinkedIn</li>
                        <li>GitHub</li>
                    </ul>
                </div>
                <div className="footer-item">
                    <h4>ABOUT ME</h4>
                    <p>I like cars and coding</p>
                </div>
            </footer>
            <div className="text-center sub-footer">
                Copyright &copy; 2019 Sebastian Safari
            </div>
        </>
    );
};

const projects = [
    {
        id: 1,
        title: "PeopleDB Py React",
        summary: "Person database using flask and react",
        techs: ["python", "flask", "js", "react"],
        githublink: "https://github.com/ssebs/Peopledb-py-react",
        demolink: "http://ppldb-py-react.ssebs.com",
        content:
            "This is a react frontend web application to control / modify users in a database.\n\n Check out http://ppldb-py-react.ssebs.com/ and http://ppldb-py-react.ssebs.com.\n"
    },
    {
        id: 2,
        title: "React ToDo Cookies",
        summary:
            'This is a basic todo app that saves your todos in localStorage ("cookie"), so you can "save" it.',
        techs: ["js", "react"],
        githublink: "https://github.com/ssebs/react-todo-cookies",
        demolink: "https://ssebs.github.io/react-todo-cookies/",
        content:
            'This is a basic todo app that saves your todos in localStorage ("cookie"), so you can "save" it. \n'
    },
    {
        id: 3,
        title: "jwt-example",
        summary: "React / Flask JWT example project",
        techs: ["python", "flask", "js", "react"],
        githublink: "https://github.com/ssebs/jwt-example",
        demolink: null,
        content:
            "### jwt-example\n\nReact / Flask JWT example project\n\nThis repo contains sample code to get basic JWT working with React and Flask.\n\nThe frontend code is in the root dir, and the backend code is in the _backend dir."
    },
    {
        id: 4,
        title: "CSV Editor",
        summary: "A simple GUI csv editor",
        techs: ["python"],
        githublink: "https://github.com/ssebs/csveditor",
        demolink: null,
        content: "### csveditor\n\nA lightweight GUI csv editor."
    },
    {
        id: 5,
        title: "Galeri",
        summary: "Web app that helps raise awarness to internal projects",
        techs: ["js", "react"],
        githublink: "https://github.com/galericms/galeri",
        demolink: "https://galericms.github.io/galeri/",
        content:
            "### Galeri\n\n#### Goal\n\nRaising awareness of existing projects within an organization.\nWe accomplish this by creating a content management system (CMS) that allows creating a web page for each project.\nThe system has to be usable such that non-technical people will have no diffulties.\n\n## Roadmap\n\n- [x] Create functional and non-functional requirements for minimal viable product (MVP).\n- [ ] Document architecture.\n- [ ] Implement back-end.\n- [ ] Implement front-end.\n\n## Functional Requirements\n\n- [ ] As a user, I want to create a web page for my project so that other people can learn about the project.\n- [ ] As a user, I want to discover other projects so that I can find projects that I might be interested in working on.\n- [ ] As a user, I want to view the change history of a project page so that I can rollback or find malicious users.\n- [ ] As a user, I want to specify people that can modify the project page so that I can trust the information that is being added.\n- [ ] As a user, I want to modify a page as easy as I can write an email so that I don't have to waste time on technical difficulties.\n- [ ] As a user, I want to view all projects without logging in so that I don't have to log in.\n- [ ] As a user, I want to search by tags or topics so that I can filter.\n- [ ] As an administrator, I want to customize the look and feel of the site so that we can have company branding.\n\n## Non-Functional Requirements\n\n- [ ] As a user, I want to use any modern browser, including mobile.\n- [ ] As a compliance officer, I want to export all projects so that we can meet compliance.\n\"\n"
    },
    {
        id: 6,
        title: "New Hire Form",
        summary: "php/python form to send emails for IT team for onboarding",
        techs: ["php", "python"],
        githublink: "https://github.com/ssebs/newhire-form",
        demolink: null,
        content:
            "### newhire-request\n\nForm to start the IT processes for creating an account, configuring a machine, setting up a phone, etc.\n\nCurrent project is in Docker, with files in src/, templates/, & bin/ directory.\n\nWhen submitting the form, a YAML file gets output in the usr-yml/ directory.\n\nEmails are sent out to helpdesk, one for each item needed"
    },
    {
        id: 7,
        title: "timecard",
        summary: "Simple timecard app with basic authentication",
        techs: ["php"],
        githublink: "https://github.com/ssebs/timecard",
        demolink: null,
        content: "Simple timecard app with basic authentication"
    },
    {
        id: 8,
        title: "Clean MAC Address",
        summary:
            "GUI program to clean a mac address (F01898b4EA08 -> f0:18:98:b4:ea:08)",
        techs: ["python"],
        githublink: "https://github.com/ssebs/clean-mac-address",
        demolink: null,
        content:
            "GUI program to clean a mac address (F01898b4EA08 -> f0:18:98:b4:ea:08)\n\nProgram to \"clean\" MAC address for registrar input."
    },
    {
        id: 9,
        title: "PeopleDB",
        summary: "Manage Users in AD/NIS/Web GUI using PeopleDB.",
        techs: ["php"],
        githublink: "https://github.com/ssebs/PeopleDB",
        demolink: null,
        content:
            "### PeopleDB\nAD/NIS/Web user management. Web UI running on LAMP server will create/modify/disable Active Directory and NIS accounts. \n>AD & NIS Account creation/modification/disable works.\n\nPlans for future:\n1) Clean UI/Fix UX\n"
    },
    {
        id: 10,
        title: "ssebsEngine",
        summary: "Java/LWJGL2 2D Game Engine",
        techs: ["java"],
        githublink: "https://github.com/ssebs/ssebsEngine",
        demolink: null,
        content:
            "###ssebsEngine\nJava/LWJGL2 2D Game Engine\n\nssebsEngine is a simple java 2D game engine that I've been working on since I've been working on games. After I made my games for my CS class, I made the engine so that I could stop copy/pasting the code.\n\nIt is free to use and modify."
    },
    {
        id: 11,
        title: "PerishablePunchers",
        summary: "Mortal Kombat like Game",
        techs: ["java", "OpenGL"],
        githublink: "https://github.com/ssebs/PerishablePunchers",
        demolink: null,
        content:
            "### PerishablePunchers\nMortal Kombat like Game written in Java\n\nPerishable Punchers Game Information\n\n*Game developed by ssebs and Charlse\n*Produced by ssebs\n*Website: http://ssebs.github.io\n*Time to develop: 1 Month\n*Release date: 4/23/15\n*Written in Java 1.6 Using LWJGL 2\n*Custom artwork\n*Custom sounds"
    },
    {
        id: 12,
        title: "GDXPerishablePunchers",
        summary: "Mobile version of PerishablePunchers",
        techs: ["java", "libgdx"],
        githublink: "https://github.com/ssebs/GDXPerishablePunchers",
        demolink: null,
        content:
            "### GDXPerishablePunchers\n\nPerishable Punchers remade with LibGDX Library. A Version of Perishable Punchers made in LibGDX, mostly so that it works on android."
    },
    {
        id: 13,
        title: "APlatformerOfSomeSort",
        summary: "A simple platformer game",
        techs: ["java", "OpenGL"],
        githublink: "https://github.com/ssebs/Platformer",
        demolink: null,
        content: "A simple platformer game"
    }
];

// Main app
const App = () => {
    useEffect(() => {
        window.location.hash = window.decodeURIComponent(window.location.hash);
        const scrollToAnchor = () => {
            const hashParts = window.location.hash.split("#");
            if (hashParts.length > 2) {
                const hash = hashParts.slice(-1)[0];
                document.querySelector(`#${hash}`).scrollIntoView();
            }
        };
        scrollToAnchor();
        window.onhashchange = scrollToAnchor;
    }, []);

    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Route
                exact
                path="/"
                component={() => <Home projects={projects} />}
            />
            <Route
                path="/home"
                component={() => <Home projects={projects} />}
            />
            <Route
                path="/portfolio"
                component={() => <Portfolio projects={projects} />}
            />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route
                path="/project/:id"
                component={props => (
                    <ProjectDetail {...props} projects={projects} />
                )}
            />
            <Footer />
        </HashRouter>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

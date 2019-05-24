// react/deps imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

// component imports
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import ProjectDetail from "./components/ProjectDetail";

import { Container, Nav, Navbar } from "react-bootstrap";

import "./index.scss"

const Header = () => {
    return (
        <Navbar bg="primary" variant="light" collapseOnSelect expand="sm">
            <LinkContainer to="/">
                <Navbar.Brand>ssebs</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/portfolio">
                        <Nav.Link>Portfolio</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const Footer = () => {
    return (
        <footer className="text-center">
            Footer
            <br/>
        </footer>
    );
};

const projects = [
    {
        id: 1,
        title: "PeopleDB-py-react",
        summary: "Person database using flask and react",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 2,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 3,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 4,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 5,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    }
];

// Main app
const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Container>
                <Route
                    exact
                    path="/"
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
            </Container>
            <Footer />
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

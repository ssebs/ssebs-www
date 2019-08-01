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
const projects = require("./assets/projects.json")

const Header = () => {
    return (
        <Navbar
            bg="primary"
            variant="dark"
            collapseOnSelect
            expand="sm"
            sticky="top"
        >
            <Container>
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
            </Container>
        </Navbar>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
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
                        <li>
                            <a href="https://linkedin.com/in/ssebs">
                                <i className="fab fa-linkedin fa-2x" />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/ssebs">
                                <i className="fab fa-github-square fa-2x" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-item">
                    <h4>ABOUT ME</h4>
                    <p>I like cars and coding</p>
                </div>
            </footer>
            <div className="text-center sub-footer">
                Copyright &copy; 2017-{currentYear} |{" "}
                <span className="text-tertiary">Sebastian Safari</span>
            </div>
        </>
    );
};

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
            <Route
                path="/about"
                component={() => (
                    <Container>
                        <About />
                    </Container>
                )}
            />
            <Route
                path="/contact"
                component={() => (
                    <Container>
                        <Contact />
                    </Container>
                )}
            />
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

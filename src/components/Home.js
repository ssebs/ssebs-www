import React from "react";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Parallax } from "react-parallax";

import About from "./About";
import Contact from "./Contact";
import ProjectCard from "./ProjectCard";

const Banner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column banner">
            <div>
                <img
                    src={require("../assets/256ssebsCircleLogo.png")}
                    alt="Logo"
                />
            </div>
            <h1>SSEBS SOFTWARE</h1>
            <div
                style={{
                    color: "rgba(255,255,255,0.65)",
                    border: "1px solid",
                    height: "0px",
                    width: "60%",
                    margin: "0.25rem auto"
                }}
            />
            <h2 className="text-center">Systems and Software Engineer</h2>
        </div>
    );
};

let TopProjects = props => {
    // console.log(props.projects)
    const projs = props.projects.map((project, i) => {
        if (i >= 3) {
            return <div key={i + 1} />;
            // only want first 3 for top projects
        }

        return (
            <Col
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                className="mb-2 text-center"
                key={project.id}
            >
                <ProjectCard project={project} />
            </Col>
        );
    });

    return (
        <div className="py-2">
            <h3 className="text-center header text-secondary">TOP PROJECTS</h3>
            <Row>{projs}</Row>
            <div className="text-center mt-3">
                <LinkContainer to="/portfolio">
                    <Button size="lg" variant="secondary">
                        All Projects
                    </Button>
                </LinkContainer>
            </div>
        </div>
    );
};
TopProjects = withRouter(TopProjects);

const Home = props => {
    return (
        <>
            <div id="top" />
            <Parallax
                blur={5}
                bgImage={require("../assets/banner.jpg")}
                strength={400}
            >
                <Banner />
            </Parallax>
            <Container className="py-3">
                <TopProjects projects={props.projects} />
            </Container>
            <Parallax
                blur={10}
                bgImage={require("../assets/ssebsFeatureLogo.png")}
                strength={400}
            >
                <Container id="about" className="py-3">
                    <About />
                </Container>
            </Parallax>
            <Container id="contact" className="py-3">
                <Contact />
            </Container>
        </>
    );
};

export default Home;

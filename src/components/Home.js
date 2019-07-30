import React from "react";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Parallax } from "react-parallax";

import { truncateString } from "../util";

import About from "./About";
import Contact from "./Contact";

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
                    margin: "0.25rem 0px"
                }}
            />
            <h2>Systems and Software Engineer</h2>
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
                <Card
                    onClick={() => {
                        props.history.push(`/project/${project.id}`);
                    }}
                    className="cards"
                >
                    <Card.Header>{project.title}</Card.Header>
                    <Card.Subtitle className="mt-1 text-muted">
                        {truncateString(project.summary, 40)}
                    </Card.Subtitle>
                    <Card.Body>
                        {/* make this md */}
                        <p>{truncateString(project.content, 150)}</p>
                    </Card.Body>
                </Card>
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

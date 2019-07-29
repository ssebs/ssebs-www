import React from "react";
import { withRouter } from "react-router";

import { Container, Row, Col, Card } from "react-bootstrap";
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
                    width: "80%"
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
                    className="p-3"
                >
                    <Card.Header>{project.title}</Card.Header>
                    <Card.Subtitle className="mt-1 text-muted">
                        {project.summary}
                    </Card.Subtitle>
                    <Card.Body>
                        {/* make this md */}
                        <p>{truncateString(project.content, 150)}</p>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return <Row className="p-5">{projs}</Row>;
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
            <Container>
                <TopProjects projects={props.projects} />
                <About />
                <Contact />
            </Container>
        </>
    );
};

export default Home;

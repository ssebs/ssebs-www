import React from "react";
import { withRouter } from "react-router";

import { Row, Col, Card } from "react-bootstrap";
import { Parallax } from "react-parallax";

import { truncateString } from "../util";

import About from "./About";
import Contact from "./Contact";

const Banner = () => {
    return (
        <div style={{ height: "400px" }}>
            <h1 style={{ color: "#fff" }}>Big banner</h1>
        </div>
    );
};

let TopProjects = props => {
    // console.log(props.projects)
    const projs = props.projects.map((project, i) => {
        if (i >= 3) {
            return <div/>;
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
                    hoverable={true}
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
        <div>
            <h1>Home</h1>
            <Parallax
                blur={5}
                bgImage={require("../assets/banner.jpg")}
                strength={400}
            >
                <Banner />
            </Parallax>
            <TopProjects projects={props.projects} />
            <About />
            <Contact />
        </div>
    );
};

export default Home;

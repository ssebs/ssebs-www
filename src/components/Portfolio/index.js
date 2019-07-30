import React from "react";
import { withRouter } from "react-router";

import { Container, Row, Col } from "react-bootstrap";

import ProjectCard from "../ProjectCard";

const Portfolio = props => {
    const projs = props.projects.map((project, i) => {
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
        <Container>
            <h1 className="text-center header">Portfolio</h1>
            <Row className="py-2">{projs}</Row>
        </Container>
    );
};

export default withRouter(Portfolio);

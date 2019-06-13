import React from "react";
import { withRouter } from "react-router";

import { Row, Col, Card } from "react-bootstrap";

import { truncateString } from "../../util";

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
                <Card
                    onClick={() => {
                        props.history.push(`/project/${project.id}`);
                    }}
                >
                    <Card.Header>{project.title}</Card.Header>
                    <Card.Subtitle className="mt-1 text-muted">
                        <p>{project.summary}</p>
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
        <div>
            <h1 className="text-center">Portfolio</h1>
            <Row className="pt-2">{projs}</Row>
        </div>
    );
};

export default withRouter(Portfolio);

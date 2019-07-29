import React from "react";

import { Container, Card } from "react-bootstrap";

const ProjectDetail = props => {
    let project = {};
    props.projects.forEach(proj => {
        if (proj.id === +props.match.params.id) {
            // console.log(proj)
            project = proj;
        }
    });

    return (
        <Container>
            <Card className="text-center">
                <Card.Header>{project.title}</Card.Header>
                <Card.Title className="mt-1 text-muted">
                    <p>{project.summary}</p>
                </Card.Title>
                <Card.Body>
                    {/* make this md */}
                    <p>{project.content}</p>
                </Card.Body>
            </Card>
        </Container>
    );
};
export default ProjectDetail;

import React from "react";

import { Card } from "react-bootstrap";

const ProjectDetail = props => {
    let project = {};
    props.projects.forEach(proj => {
        if (proj.id === +props.match.params.id) {
            // console.log(proj)
            project = proj;
        }
    });

    return (
        <div>
            <Card className="text-center">
                <Card.Header>{project.title}</Card.Header>
                <Card.Title className="mt-1 text-muted">
                    <p>{project.summary}</p>
                </Card.Title>
                <Card.Body>
                    <p>{project.content}</p>
                    <img
                        src={require(`./Portfolio/assets/${project.pics[0]}`)}
                        alt="project screenshot"
                        width="256px"
                    />
                </Card.Body>
            </Card>
        </div>
    );
};
export default ProjectDetail;

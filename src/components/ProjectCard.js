import React from "react";
import { withRouter } from "react-router-dom";

import { Card } from "react-bootstrap";
import { truncateString, renderMD } from "../util";

const ProjectCard = ({ project, history }) => {
    const bodyContents = renderMD(truncateString(project.content, 150));
    console.log(bodyContents);
    return (
        <Card
            onClick={() => {
                history.push(`/project/${project.id}`);
            }}
            className="cards"
        >
            <Card.Header>{project.title}</Card.Header>
            <Card.Subtitle className="mt-1 text-muted">
                {truncateString(project.summary, 40)}
            </Card.Subtitle>
            <Card.Body dangerouslySetInnerHTML={{ __html: bodyContents }}>

            </Card.Body>
        </Card>
    );
};

export default withRouter(ProjectCard);

import React from "react";
import { withRouter } from "react-router";
import { Row, Col, Card } from "antd";

const Portfolio = props => {
    const projs = props.projects.map((project, i) => {
        return (
            <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={8}
                style={{ marginBottom: "16px" }}
                key={project.id}
                style={{ textAlign: "center" }}
            >
                <Card
                    title={project.title}
                    hoverable={true}
                    onClick={() => {
                        //
                        // TODO: Make this route properly
                        //
                        props.history.push(`/project/${project.id}`);
                        // window.location = `/project/${project.id}`;
                    }}
                >
                    <h4>{project.summary}</h4>
                    <p>{project.content}</p>
                    <img
                        src={require(`./assets/${project.pics[0]}`)}
                        alt='image'
                        width='200px'
                    />
                </Card>
            </Col>
        );
    });

    return (
        <div>
            <h1>Portfolio</h1>
            <Row
                gutter={16}
                align='top'
                justify='space-around'
                type='flex'
                style={{ paddingTop: "24px" }}
            >
                {projs}
            </Row>
        </div>
    );
};

export default withRouter(Portfolio);

import React from 'react'
import { Card } from 'antd';

const ProjectDetail = (props) => {

    let project = {};
    props.projects.forEach(proj => {
        if (proj.id === +props.match.params.id) {
            console.log(proj)
            project = proj;
        }
    });

    return (
        <div>
            <Card title={project.title} hoverable={false}>
                <h4>{project.summary}</h4>
                <p>{project.content}</p>
                <img src={require(`./Portfolio/assets/${project.pics[0]}`)} alt="image" width="256px" />
            </Card>
        </div>
    );
};
export default ProjectDetail;
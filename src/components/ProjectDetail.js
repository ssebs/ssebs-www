import React from 'react'

const ProjectDetail = ({match}) => {
    return (
        <div>
            <h1>ID is: {match.params.id}</h1>
        </div>
    );
};
export default ProjectDetail;
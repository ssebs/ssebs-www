import React from 'react'
import { Row, Col, Card } from "antd";
import About from "./About"
import Contact from "./Contact"
import bannerImg from '../assets/banner.jpg'

const Banner = () => {
    return (
        <div style={{
            backgroundImage: `url(${bannerImg})`,
            height: "500px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <h1>Big banner</h1>
        </div>
    )
}

const TopProjects = (props) => {
    // console.log(props.projects)
    const projs = props.projects.map((project, i) => {
        if (i >= 3) {
            return;
            // only want first 3 for top projects
        }

        return (
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{ marginBottom: "16px" }} key={project.id} style={{textAlign: "center"}}>
                <Card title={project.title} hoverable={true} >
                    <h4>{project.summary}</h4>
                    <p>{project.content}</p>
                    <img src={require(`./Portfolio/assets/${project.pics[0]}`)} alt="image" width="200px"/>
                </Card>
            </Col>
        )
    });

    return (
        <Row gutter={16} align="top" justify="space-around" type="flex" style={{paddingTop: "24px"}}>
            {projs}
        </Row>
    )
}


const Home = (props) => {
    return (
        <div>
            <h1>Home</h1>
            <Banner />
            <TopProjects projects={props.projects} />
            <About />
            <Contact />
        </div>
    )
}

export default Home;

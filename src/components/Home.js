import React from "react";
import { Row, Col, Card } from "antd";
import { Parallax } from "react-parallax";
import About from "./About";
import Contact from "./Contact";
import bannerImg from "../assets/banner.jpg";

const Banner = () => {
    return (
        <div
            style={{height: "400px"}}
        >
            <h1 style={{ color: "#fff" }}>Big banner</h1>
        </div>
    );
};

const TopProjects = props => {
    // console.log(props.projects)
    const projs = props.projects.map((project, i) => {
        if (i >= 3) {
            return;
            // only want first 3 for top projects
        }

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
                        window.location = `/project/${project.id}`;
                    }}
                >
                    <h4>{project.summary}</h4>
                    <p>{project.content}</p>
                    <img
                        src={require(`./Portfolio/assets/${project.pics[0]}`)}
                        alt='image'
                        width='200px'
                    />
                </Card>
            </Col>
        );
    });

    return (
        <Row
            gutter={16}
            align='top'
            justify='space-around'
            type='flex'
            style={{ paddingTop: "24px" }}
        >
            {projs}
        </Row>
    );
};

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

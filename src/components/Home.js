import React from 'react'

import { Row, Col, Card } from "antd";

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

const TopProjects = () => {
    return (
        <Row gutter={16} justify="space-around" type="flex">
            <Col xs={24} sm={12} md={8} lg={6} xl={6} style={{ marginBottom: "16px" }}>
                <Card title="Test" hoverable={true} >
                    Content
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6} style={{ marginBottom: "16px" }}>
                <Card title="Test" hoverable={true} >
                    Content
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6} style={{ marginBottom: "16px" }}>
                <Card title="Test" hoverable={true} >
                    Content
              </Card>
            </Col>
            
        </Row>
    )
}


function Home() {
    return (
        <div>
            <h1>Home</h1>
            <hr />
            <Banner />
            <hr />
            <TopProjects />
            <hr />
        </div>
    )
}

export default Home;

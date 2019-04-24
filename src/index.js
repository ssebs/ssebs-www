// react/deps imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

// image/style imports
import "antd/dist/antd.css";
import './index.scss';
import logo from "./assets/256ssebsSquareLogo.png";

// component imports
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import ProjectDetail from "./components/ProjectDetail";

// antd imports
import { Layout, Menu } from "antd";
const { Header: AntHdr, Content, Footer: AntFtr } = Layout;


const Header = () => {
    return (
        <AntHdr>
            <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}
                style={{ lineHeight: "64px" }}
            >
                <Menu.Item key="home">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            width="48px"
                            style={{ borderRadius: "50px", margin: "5px" }}
                        />
                        <span style={{ fontWeight: "bold", fontSize: "1.25em" }}>
                            ssebs
                       </span>
                    </Link>
                </Menu.Item>


                <Menu.Item key="about" style={{ float: "right" }}>
                    <Link to="/about">About</Link>
                </Menu.Item>

                <Menu.Item key="contact" style={{ float: "right" }}>
                    <Link to="/contact">Contact</Link>
                </Menu.Item>

                <Menu.Item key="portfolio" style={{ float: "right" }}>
                    <Link to="/portfolio">Portfolio</Link>
                </Menu.Item>
            </Menu>
        </AntHdr>
    )
}

const Footer = () => {
    return (
        <AntFtr>
            <p>Footer</p>
        </AntFtr>
    )
}

const projects = [
    {
        id: 1,
        title: "PeopleDB-py-react",
        summary: "Person database using flask and react",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 2,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 3,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 4,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
    {
        id: 5,
        title: "Something else",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        pics: ["img1.png"]
    },
];

// Main app
const App = () => {
    return (
        <BrowserRouter>
            <Layout>

                <Header />
                <Content style={{ padding: "0px 50px" }}>
                    <Route path="/" exact component={() => <Home projects={projects} />} />
                    <Route path="/portfolio" component={() => <Portfolio projects={projects} />} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/project/:id" component={(props) => <ProjectDetail {...props} projects={projects} />} />
                </Content>
                <Footer />
            </Layout>
        </BrowserRouter>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

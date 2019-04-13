// react/deps imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

// component imports
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import ProjectDetail from "./components/ProjectDetail";

// image/style imports
import './index.scss';
import logo from "./assets/256ssebsSquareLogo.png";

const Header = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <img src={logo} alt="logo" width="64px" />Home
                    </Link>
                </li>

                <li>
                    <Link to="/portfolio">Portfolio</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>

                <li>
                    <Link to="/contact">Contact</Link>
                </li>

            </ul>
        </nav>
    )
}

const Footer = () => {
    return (
        <div>
            FOOTER
    </div>
    )
}



// Main app
const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/project/:id" component={ProjectDetail} />

            <Footer />
        </BrowserRouter>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

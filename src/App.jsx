import React from "react";

import { HashRouter, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from './components/WebComponents/Header'
import Project from './components/Project'
import Contact from "./components/Contact";

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <Route path="/projects" component={Project} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/" component={Home} />
      </HashRouter>
    </>
  );
};

export default App;

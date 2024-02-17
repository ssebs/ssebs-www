import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from './components/WebComponents/Header'
import Project from './components/Project'
import Contact from "./components/Contact";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Header />
        <Route path="/projects" component={Project} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/" component={Home} />
      </Routes>
    </HashRouter>
  );
};

export default App;


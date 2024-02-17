import React from "react";

import { Outlet } from "react-router-dom";

import Header from './components/WebComponents/Header'
import Section from "./components/WebComponents/Section";
import Footer from "./components/WebComponents/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Section bgColor="dark">
        <Footer />
      </Section>
    </>
  );
};

export default App;


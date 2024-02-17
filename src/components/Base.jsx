import React from "react";

import { Outlet } from "react-router-dom";

import Header from './WebComponents/Header'
import Footer from "./WebComponents/Footer";

const Base = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Base;


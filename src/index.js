import React from "react";
import "./index.scss";
import App from "./Base";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Project from "./components/pages/Project";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Error from "./components/pages/Error";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error message={"test"} />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/projects",
                element: <Project />,
            },
            {
                path: "/contact",
                element: <Contact />,
            }
        ]
    },
])

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

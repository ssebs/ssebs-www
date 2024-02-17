import React from 'react'
import { useRouteError } from 'react-router'
import Header from '../WebComponents/Header';
import Footer from '../WebComponents/Footer';

const Error = () => {
    const err = useRouteError();
    console.error(err);

    return (
        <div>
            <Header />
            <h1>{err.data}</h1>
            <p>
                <i>{err.statusText || err.message}</i>
            </p>
            <Footer />
        </div>
    )
}

export default Error